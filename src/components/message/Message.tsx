import * as React from 'react'
import * as classnames from 'classnames'
import stylesheet from './Message.pcss'
import {MessageState} from '../../redux/chats/reducer'
import TimeAgo from 'react-timeago'

//Interface for Component's props
interface OwnProps {
  message: MessageState | null,
  prevMessage: MessageState | null
}

//Interface for Component's state
interface OwnState {
}

export class Message extends React.Component<OwnProps, OwnState> {
  isSameUser(prevMessage, message) {
    if (!prevMessage) {
      return false
    }

    return prevMessage.u._id == message.u._id
  }

  isSameTime(prevMessage, message) {
    if (!prevMessage) {
      return false
    }

    //more than 15 minute
    // console.log(Math.abs(prevMessage._updatedAt.$date - message._updatedAt.$date) / 1000 / 60)
    return Math.abs(prevMessage._updatedAt.$date - message._updatedAt.$date) / 1000 / 60 < 15
  }

  _renderMessageHeader() {
    const {prevMessage, message} = this.props
    const isSameBubble = this.isSameUser(prevMessage, message) && this.isSameTime(prevMessage, message)

    if (isSameBubble) {
      return null
    }

    return (
      <div className={classnames('message-header')}>
        <span className={classnames('message-username')}>{message.u.username}</span>
        <TimeAgo className={classnames('message-timeago')} date={message._updatedAt.$date}/>
      </div>
    )
  }

  render() {
    const {message} = this.props

    if (message) {
      return (
        <div className={classnames('message')}>
          <style>{stylesheet}</style>

          {
            this._renderMessageHeader()
          }

          <div className={classnames('message-content')}>
            <span className={classnames('message-text')}>
            {
              message.msg
            }
            </span>
          </div>
        </div>
      )
    }

    return null
  }
}