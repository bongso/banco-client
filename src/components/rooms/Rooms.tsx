import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../redux/index'
import stylesheet from './Rooms.pcss'
import {bindActionCreators} from 'redux'
import {getRooms} from '../../redux/room/rooms/actions'
import {openRoom} from '../../redux/room/openingRoom/actions'
import {RoomsState, RoomState} from '../../redux/room/rooms/reducer'
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
  rooms: RoomsState
}

//Redux's state to component's props
const mapStateToProps = (state: RootState) => {
  return {
    rooms: state.rooms
  }
}

//Interface for Redux's dispatch to component's props
interface MapDispatchToProps {
  getRooms,
  openRoom
}

//Redux's dispatch to component's props
const mapDispatchToProps = (dispatch): MapDispatchToProps => {
  const actionCreators = {
    getRooms,
    openRoom
  }

  return bindActionCreators(actionCreators, dispatch)
}

export const Rooms = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(
  class Rooms extends React.Component<MapStateToProps & MapDispatchToProps & OwnProps, OwnState> {
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
      const {getRooms, openRoom, selectedRoomName} = this.props
      getRooms().then(() => {
        if (selectedRoomName && this.getRoomByName(selectedRoomName)) {
          openRoom(this.getRoomByName(selectedRoomName))
        }
      })
    }

    getRoomByName(roomName: string) {
      return this.props.rooms.totalRooms.find((x) => x.name == roomName)
    }

    _renderRoom(room: RoomState, index: number) {
      const url = '/channel?channelName=' + room.name
      const isSelected = room.name == this.props.selectedRoomName
      return (
        <Link href={url} key={index}>
          <a className={classnames('room', isSelected ? 'selected' : null)}>
            # {room.name}
          </a>
        </Link>
      )
    }

    _renderRooms(roomsSectionName: string, chatRooms: RoomState[]) {
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
              chatRooms.map((room, index) => {
                return this._renderRoom(room, index)
              })
            }
          </div>
        </div>
      )
    }

    _renderRoomsContainer() {
      const rooms = this.props.rooms

      if (rooms.loading) {
        return this._renderLoading()
      }
      else {
        return (
          <div>
            {
              this._renderRooms('Channels', rooms.chatRooms)
            }
            {
              this._renderRooms('Private Groups', rooms.privateChatRooms)
            }
            {
              this._renderRooms('Direct Messages', rooms.directChatRooms)
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