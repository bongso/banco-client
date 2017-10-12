import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../redux/index'
import stylesheet from './Chat.pcss'
import {bindActionCreators} from 'redux'
import {loadRoomHistory, subscribeRoomMessages, unsubscribeRoomMessages} from '../../redux/chats/actions'
import {ChatsStates} from '../../redux/chats/reducer'
import {Message} from '../message/Message'
import {v1 as uuid} from 'uuid'

//Interface for Component's props
interface OwnProps {
  roomId: string
}

//Interface for Component's state
interface OwnState {
}

//Interface for Redux's state to component's props
interface MapStateToProps {
  chats: ChatsStates
}

//Redux's state to component's props
const mapStateToProps = (state: RootState) => {
  return {
    chats: state.chats
  }
}

//Interface for Redux's dispatch to component's props
interface MapDispatchToProps {
  loadRoomHistory,
  subscribeRoomMessages,
  unsubscribeRoomMessages
}

//Redux's dispatch to component's props
const mapDispatchToProps = (dispatch): MapDispatchToProps => {
  const actionCreators = {
    loadRoomHistory,
    subscribeRoomMessages,
    unsubscribeRoomMessages
  }

  return bindActionCreators(actionCreators, dispatch)
}

export const Chat = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(
  class Chat extends React.Component<MapStateToProps & MapDispatchToProps & OwnProps, OwnState> {
    static PropTypes = {
      roomId: React.PropTypes.string
    }

    public streamRoomMessageInstance: any

    constructor(props) {
      super(props)
    }

    componentWillMount() {
      this.initRoomMessaage()
    }

    componentWillUnmount() {
      this.unsubscribeRoomMessages()
    }

    //load history of this room and subscribe this room
    initRoomMessaage() {
      const {roomId, loadRoomHistory, subscribeRoomMessages} = this.props

      loadRoomHistory(roomId).then(() => {
        this.streamRoomMessageInstance = subscribeRoomMessages(roomId)
      })
    }

    //unsubscribe this room
    unsubscribeRoomMessages() {
      const {roomId, unsubscribeRoomMessages} = this.props
      const streamRoomMessageInstance = this.streamRoomMessageInstance

      if (streamRoomMessageInstance) {
        unsubscribeRoomMessages(streamRoomMessageInstance, roomId)
      }
    }

    _renderMessages() {
      const {roomId, chats} = this.props
      const chat = chats[roomId]
      const messages = chat && chat.messages

      if (messages && messages.length > 0) {
        return (
          <div className={classnames('chat')}>
            {
              messages.map((message, index) => {
                const prevMessage = index > 0 ? messages[index - 1] : null
                const nextMessage = index < messages.length - 1 ? messages[index + 1] : null

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

    _renderMessageInput() {
      return (
        <div className={classnames('chat-input-container')}>
          <div className={classnames('chat-input')}>
          </div>
        </div>
      )
    }

    render() {
      return (
        <div className={classnames('chat-container')}>
          <style>{stylesheet}</style>
          {
            this._renderMessages()
          }
          {
            this._renderMessageInput()
          }
        </div>
      )
    }
  }
)