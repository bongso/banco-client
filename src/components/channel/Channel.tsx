import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../redux/index'
import stylesheet from './Channel.pcss'
import {ConnectionState} from '../../redux/connection/reducer'
import {StorageState} from '../../redux/storage/reducer'
import {bindActionCreators} from 'redux'
import {connectToServer} from '../../redux/connection/actions'
import {OpeningRoomState} from '../../redux/room/openingRoom/reducer'
import {Chat} from '../chat/Chat'
import {Rooms} from '../rooms/Rooms'
import {Subscriptions} from '../subscriptions/Subscriptions'
import {ProfileSummary} from '../profileSummary/ProfileSummary'
import {openRoom} from '../../redux/room/openingRoom/actions'
import {getRooms} from '../../redux/room/rooms/actions'
import {RoomsState, RoomState} from '../../redux/room/rooms/reducer'
import {AuthState} from '../../redux/auth/reducer'

//Interface for Component's props
interface OwnProps {
  channelName: string
}

//Interface for Component's state
interface OwnState {
}

//Interface for Redux's state to component's props
interface MapStateToProps {
  connection: ConnectionState,
  storage: StorageState,
  openingRoom: OpeningRoomState,
  rooms: RoomsState,
  auth: AuthState
}

//Redux's state to component's props
const mapStateToProps = (state: RootState) => {
  return {
    connection : state.connection,
    storage    : state.storage,
    openingRoom: state.openingRoom,
    rooms      : state.rooms,
    auth       : state.auth
  }
}

//Interface for Redux's dispatch to component's props
interface MapDispatchToProps {
  connectToServer,
  openRoom,
  getRooms,
}

//Redux's dispatch to component's props
const dispatchToProps = (dispatch): MapDispatchToProps => {
  const actionCreators = {
    connectToServer,
    openRoom,
    getRooms
  }

  return bindActionCreators(actionCreators, dispatch)
}

//Index component
export const Channel = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
  mapStateToProps,
  dispatchToProps
)(
  class Channel extends React.Component<MapStateToProps & MapDispatchToProps & OwnProps, OwnState> {
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      const {connectToServer} = this.props
      connectToServer()
    }

    _renderRooms() {
      const channelName = this.props.channelName
      const isLoggedIn = this.props.auth.isLoggedIn

      if (isLoggedIn) {
        return (
          <Subscriptions selectedRoomName={channelName}/>
        )
      }

      return (
        <Rooms selectedRoomName={channelName}/>
      )
    }

    _renderScreen() {
      return (
        <div>
          <style>{stylesheet}</style>
          <div className={classnames('screen')}>
            <aside className={classnames('sidebar')}>
              <ProfileSummary/>
              {
                this._renderRooms()
              }
            </aside>
            <div className={classnames('main')}>
              <div className={classnames('main-header')}>
                main-header
              </div>
              <div className={classnames('main-content')}>
                <div className={classnames('chart-content')}>
                  chart content here
                </div>
                <div className={classnames('chat-content')}>
                  <Chat/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    _renderLoading() {
      //TODO::Render loading 
      return null
    }

    _renderError(error: string) {
      //TODO::Render Error message
      return (
        <div>
          <span>
            {
              error
            }
          </span>
        </div>
      )
    }

    render() {
      const connection: ConnectionState = this.props.connection
      const isConnectedServer: boolean = connection.isConnected
      const isStorageLoaded: boolean = this.props.storage.storageLoaded
      const error: string = connection.error

      if (error) {
        return this._renderError(error)
      }

      if (isConnectedServer && isStorageLoaded) {
        return this._renderScreen()
      }
      else {
        return this._renderLoading()
      }
    }
  }
)