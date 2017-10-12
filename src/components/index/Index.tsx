import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../redux/index'
import stylesheet from './Index.pcss'
import {ConnectionState} from '../../redux/connection/reducer'
import {bindActionCreators} from 'redux'
import {initConnection} from '../../redux/connection/actions'
import {OpeningRoomState} from '../../redux/room/openingRoom/reducer'
import {Chat} from '../chat/Chat'
import {Rooms} from '../rooms/Rooms'

//Interface for Component's props
interface OwnProps {
}

//Interface for Component's state
interface OwnState {
}

//Interface for Redux's state to component's props
interface MapStateToProps {
  connection: ConnectionState,
  openingRoom: OpeningRoomState
}

//Redux's state to component's props
const mapStateToProps = (state: RootState) => {
  return {
    connection : state.connection,
    openingRoom: state.openingRoom
  }
}

//Interface for Redux's dispatch to component's props
interface MapDispatchToProps {
}

//Redux's dispatch to component's props
const dispatchToProps = (dispatch): MapDispatchToProps => {
  const actionCreators = {
    initConnection
  }

  return bindActionCreators(actionCreators, dispatch)
}

//Index component
export const Index = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
  mapStateToProps,
  dispatchToProps
)(
  class Index extends React.Component<MapStateToProps & MapDispatchToProps & OwnProps, OwnState> {

    _renderChat() {
      const {openingRoom} = this.props
      if (openingRoom.room && openingRoom.room._id) {
        return <Chat roomId={openingRoom.room._id}/>
      }

      return null
    }

    _renderScreen() {

      return (
        <div className={classnames('screen')}>
          <style>{stylesheet}</style>
          <aside className={classnames('sidebar')}>
            <Rooms/>
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
                {
                  this._renderChat()
                }
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
      const error: string = connection.error

      if (error) {
        return this._renderError(error)
      }

      if (isConnectedServer) {
        return this._renderScreen()
      }
      else {
        return this._renderLoading()
      }
    }
  }
)