import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../redux/index'
import stylesheet from './Chat.pcss'
import {bindActionCreators} from 'redux'
import {loadRoomHistory, subscribeRoomMessages, unsubscribeRoomMessages} from '../../redux/chats/actions'
import {sendMessage, deleteSentMessage} from '../../redux/message/sendMessages/actions'
import {ChatsStates} from '../../redux/chats/reducer'
import {OpeningRoomState} from '../../redux/room/openingRoom/reducer'
import {RoomState} from '../../redux/room/rooms/reducer'
import {AuthState} from '../../redux/auth/reducer'
import {Message} from '../message/Message'
import {v1 as uuid} from 'uuid'
import * as _ from 'lodash'
import {SubscriptionState} from '../../redux/room/subscriptions/reducer'
//Interface for Component's props
interface OwnProps {
}

//Interface for Component's state
interface OwnState {
  newMessage: string
}

//Interface for Redux's state to component's props
interface MapStateToProps {
  auth: AuthState,
  chats: ChatsStates,
  openingRoom: OpeningRoomState
}

//Redux's state to component's props
const mapStateToProps = (state: RootState) => {
  return {
    auth       : state.auth,
    chats      : state.chats,
    openingRoom: state.openingRoom
  }
}

//Interface for Redux's dispatch to component's props
interface MapDispatchToProps {
  loadRoomHistory,
  subscribeRoomMessages,
  unsubscribeRoomMessages,
  sendMessage,
  deleteSentMessage
}

//Redux's dispatch to component's props
const mapDispatchToProps = (dispatch): MapDispatchToProps => {
  const actionCreators = {
    loadRoomHistory,
    subscribeRoomMessages,
    unsubscribeRoomMessages,
    sendMessage,
    deleteSentMessage
  }

  return bindActionCreators(actionCreators, dispatch)
}

export const Chat = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(
  class Chat extends React.Component<MapStateToProps & MapDispatchToProps & OwnProps, OwnState> {
    public streamRoomMessageInstance: any

    constructor(props) {
      super(props)
      this.state = {
        newMessage: ''
      }
    }

    componentWillReceiveProps(newProps) {
      // console.log('this.props.openingRoom.room', this.props.openingRoom.room)
      // console.log('newProps.openingRoom.room', newProps.openingRoom.room)

      if (!_.isEqual(this.props.openingRoom.room, newProps.openingRoom.room)) {
        if (this.props.openingRoom.room && (this.props.openingRoom.room.rid || this.props.openingRoom.room._id)) {
          this.unsubscribeRoomMessages(this.props.openingRoom.room)
        }
        if (newProps.openingRoom.room && (newProps.openingRoom.room.rid || newProps.openingRoom.room._id)) {
          this.initRoomMessaage(newProps.openingRoom.room)
        }
      }
    }

    //load history of this room and subscribe this room
    initRoomMessaage(room: RoomState & SubscriptionState) {
      const {loadRoomHistory, subscribeRoomMessages} = this.props

      loadRoomHistory(room.rid || room._id).then(() => {
        this.streamRoomMessageInstance = subscribeRoomMessages(room.rid || room._id)
      })
    }

    //unsubscribe this room
    unsubscribeRoomMessages(room: RoomState & SubscriptionState) {
      const {unsubscribeRoomMessages} = this.props
      const streamRoomMessageInstance = this.streamRoomMessageInstance

      if (streamRoomMessageInstance) {
        unsubscribeRoomMessages(streamRoomMessageInstance, room.rid || room._id)
      }
    }

    changeMessage(event) {
      this.setState({newMessage: event.target.value})
    }

    submitMessage(event) {
      event.preventDefault()

      if (this.state.newMessage) {
        console.log('new message : ', this.state.newMessage)
        this.props.sendMessage(this.props.openingRoom.room.rid || this.props.openingRoom.room._id, this.state.newMessage)

        this.setState({
          newMessage: ''
        })
      }
    }

    _renderMessages() {
      const {chats, openingRoom} = this.props
      const chat = chats[openingRoom.room.rid || openingRoom.room._id]
      const messages = chat && chat.messages

      if (messages && messages.length > 0) {
        return (
          <div className={classnames('chat')}>
            {
              messages.map((message, index) => {
                const prevMessage = index > 0 ? messages[index - 1] : null
                // const nextMessage = index < messages.length - 1 ? messages[index + 1] : null

                return (
                  <Message key={index} prevMessage={prevMessage} message={message}/>
                )
              })
            }
          </div>
        )
      }
      else {
        return null
      }
    }

    _renderMessageForm() {
      if (this.props.auth.isLoggedIn)
        return (
          <form className={classnames('input-group')} onSubmit={(event) => this.submitMessage(event)}>
            <input type="text" value={this.state.newMessage} onChange={(event) => this.changeMessage(event)}
                   className={classnames('form-control')} placeholder="Message..." aria-label="Message..."/>
            <span className={classnames('input-group-btn')}>
                <button type="submit" className={classnames('btn btn-secondary')}>Send</button>
              </span>
          </form>
        )
    }

    _renderNewMessage() {
      return (
        <div className={classnames('chat-input-container')}>
          <div className={classnames('chat-input')}>
            {
              this._renderMessageForm()
            }
          </div>
        </div>
      )
    }

    render() {
      const {openingRoom} = this.props
      if (openingRoom && openingRoom.room && (openingRoom.room.rid || openingRoom.room._id)) {
        return (
          <div className={classnames('chat-container')}>
            <style>{stylesheet}</style>
            {
              this._renderMessages()
            }
            {
              this._renderNewMessage()
            }
          </div>
        )
      }

      return null
    }
  }
)