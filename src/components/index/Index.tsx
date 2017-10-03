import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../redux/index'
import stylesheet from './Index.pcss'
import {connectionState} from '../../redux/connection/reducer'
import BancoRealtimeAPI from '../../lib/banco-realtime-api'
import {bindActionCreators} from 'redux'
import {initConnection} from '../../redux/connection/actions'

const BANCO_URL: string = 'ws://localhost:3000/websocket'

interface StateToProps extends connectionState {}

interface OwnProps {}

interface DispatchProps {}

interface State {}

const dispatchToProps = (dispatch): DispatchProps => {
  const actionCreators = {
    initConnection
  }

  return bindActionCreators(actionCreators, dispatch)
}

export const Index = connect<StateToProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    ...state.connection
  }),
  dispatchToProps
)(
  class Index extends React.Component<StateToProps & DispatchProps & OwnProps, State> {
    render() {
      return (
        <div className={classnames('screen')}>
          <style>{stylesheet}</style>
          <aside className={classnames('sidebar')}>
            side-menu
          </aside>
          <div className={classnames('main-content')}>
            <div className={classnames('chart-content')}>
              chart content here
            </div>
            <div className={classnames('message-content')}>
              message content here
            </div>
          </div>
        </div>
      )
    }
  }
)