import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../redux/index'
import stylesheet from './Chat.pcss'
import {bindActionCreators} from 'redux'
import {loadRoomHistory} from '../../redux/chats/actions'
import {ChatsStates} from '../../redux/chats/reducer'
import {Message} from '../message/Message'

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
  loadRoomHistory
}

//Redux's dispatch to component's props
const mapDispatchToProps = (dispatch): MapDispatchToProps => {
  const actionCreators = {
    loadRoomHistory
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


    componentWillMount() {
      const roomId: string = this.props.roomId
      console.log('Chat roomId', roomId)
      this.props.loadRoomHistory(roomId)
    }

    _renderMessages() {
      const roomId: string = this.props.roomId
      const chat = this.props.chats[roomId]
      const messages = chat && chat.messages

      if (messages && messages.length > 0) {
        return (
          <div className={classnames('chat')}>
            {
              messages.map((message, index) => {
                return (
                  <Message key={index} message={message}/>
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