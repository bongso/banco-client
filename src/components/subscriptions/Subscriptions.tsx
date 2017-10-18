import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../redux/index'
import stylesheet from './Subscriptions.pcss'
import {bindActionCreators} from 'redux'
import {getSubscriptions} from '../../redux/room/subscriptions/actions'
import {openRoom} from '../../redux/room/openingRoom/actions'
import {SubscriptionsState, SubscriptionState} from '../../redux/room/subscriptions/reducer'
import Link from 'next/link'

//Interface for Component's props
interface OwnProps {
  selectedRoomName: string
}

//Interface for Component's state
interface OwnState {
}

//Interface for Redux's state to component's props
interface MapStateToProps {
  subscriptions: SubscriptionsState
}

//Redux's state to component's props
const mapStateToProps = (state: RootState) => {
  return {
    subscriptions: state.subscriptions
  }
}

//Interface for Redux's dispatch to component's props
interface MapDispatchToProps {
  getSubscriptions,
  openRoom
}

//Redux's dispatch to component's props
const mapDispatchToProps = (dispatch): MapDispatchToProps => {
  const actionCreators = {
    getSubscriptions,
    openRoom
  }

  return bindActionCreators(actionCreators, dispatch)
}

export const Subscriptions = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(
  class Subscriptions extends React.Component<MapStateToProps & MapDispatchToProps & OwnProps, OwnState> {
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      this.initRooms()
    }

    componentWillReceiveProps(newProps: MapStateToProps & MapDispatchToProps & OwnProps) {
      // console.log('Rooms componentWillReceiveProps this.props', this.props)
      // console.log('Rooms componentWillReceiveProps newProps', newProps)

      if (this.props.selectedRoomName != newProps.selectedRoomName) {
        if (newProps.selectedRoomName && this.getRoomByName(newProps.selectedRoomName)) {
          this.props.openRoom(this.getRoomByName(newProps.selectedRoomName))
        }
      }
    }

    //load history of this room and subscribe this room
    initRooms() {
      const {getSubscriptions, openRoom, selectedRoomName} = this.props
      getSubscriptions().then(() => {
        if (selectedRoomName && this.getRoomByName(selectedRoomName)) {
          openRoom(this.getRoomByName(selectedRoomName))
        }
      })
    }

    getRoomByName(roomName: string) {
      return this.props.subscriptions.totalRooms.find((x) => x.name == roomName)
    }

    _renderRoom(subscription: SubscriptionState, index: number) {
      const url = '/channel?channelName=' + subscription.name
      const isSelected = subscription.name == this.props.selectedRoomName
      return (
        <Link href={url} key={index}>
          <a className={classnames('room', isSelected ? 'selected' : null)}>
            # {subscription.name}
          </a>
        </Link>
      )
    }

    _renderRooms(roomsSectionName: string, chatRooms: SubscriptionState[]) {
      return (
        <div>
          <div className={classnames('rooms-section-container')}>
            <span className={classnames('rooms-section-name')}>
            {
              roomsSectionName
            }
            </span>
            <span className={classnames('rooms-section-count')}>
            {
              chatRooms.length
            }
            </span>
          </div>
          <div>
            {
              chatRooms.map((subscription, index) => {
                return this._renderRoom(subscription, index)
              })
            }
          </div>
        </div>
      )
    }

    _renderRoomsContainer() {
      const subscriptions = this.props.subscriptions

      if (subscriptions.loading) {
        return this._renderLoading()
      }
      else {
        return (
          <div>
            {
              this._renderRooms('Channels', subscriptions.chatRooms)
            }
            {
              this._renderRooms('Private Groups', subscriptions.privateChatRooms)
            }
            {
              this._renderRooms('Direct Messages', subscriptions.directChatRooms)
            }
          </div>
        )
      }
    }

    _renderLoading() {
      //TODO::display loading
      return null
    }

    render() {
      return (
        <div className={classnames('chat-container')}>
          <style>{stylesheet}</style>
          {
            this._renderRoomsContainer()
          }
        </div>
      )
    }
  }
)