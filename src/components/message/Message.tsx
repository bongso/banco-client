import * as React from 'react'
import * as classnames from 'classnames'
import stylesheet from './Message.pcss'
import {MessageState} from '../../redux/chats/reducer'
import TimeAgo from 'react-timeago'

//Interface for Component's props
interface OwnProps {
  message: MessageState | null
}

//Interface for Component's state
interface OwnState {
}

export class Message extends React.Component<OwnProps, OwnState> {
  render() {
    const message: MessageState | null = this.props.message
    console.log('message', message)

    if (message) {
      const messageTime = new Date(message._updatedAt.$date)
      console.log('messageTime', messageTime)

      return (
        <div className={classnames('message')}>
          <style>{stylesheet}</style>
          <div className={classnames('message-header')}>
            <span className={classnames('message-username')}>{message.u.username}</span>
            <TimeAgo className={classnames('message-timeago')} date={message._updatedAt.$date}/>
          </div>
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