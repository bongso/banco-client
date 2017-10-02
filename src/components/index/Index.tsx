import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {actions, DispatchProps, RootState} from '../../redux/index'
import stylesheet from './Index.pcss'
import {connectionState} from '../../redux/connection/reducer'
import BancoRealtimeAPI from '../../lib/banco-realtime-api'

const BANCO_URL: string = 'ws://localhost:3000/websocket'
interface S extends connectionState {
}
interface O {
}
type Props = S & DispatchProps & O

export const Index = connect<S, DispatchProps, O>(
  (state: RootState) => ({
    ...state.connection
  }),
  actions
)(
  class Index extends React.Component<{}, {}> {
    componentDidMount() {
      // let bancoRealtimeAPI = new BancoRealtimeAPI(BANCO_URL)
      //
      // bancoRealtimeAPI.connectToServer()
      // bancoRealtimeAPI.onError(err => console.log('Banco API Error', err))
      // bancoRealtimeAPI.onCompletion(() => console.log('Banco API Complete'))
      // bancoRealtimeAPI.onMessage(msg => console.log(msg))
      // bancoRealtimeAPI.login('rustykey4@naver.com', 'wlsgh82').subscribe(msg => {
      //   console.log('login')
      //   console.log('msg', msg)
      // })
      //
      // //get rooms
      // bancoRealtimeAPI.callMethod('rooms/getAll').subscribe(msg => {
      //   console.log('rooms/getAll')
      //   console.log('msg', msg)
      // })
      //
      // //join room
      // bancoRealtimeAPI.callMethod('joinRoom', 'Qqk6t5nC3b3HBrjnw').subscribe(msg => {
      //   console.log('joinRoom')
      //   console.log('msg', msg)
      // })
      this.props.actions.initConnection()
    }

    render() {
      const {children} = this.props
      return (
        <div className={classnames('screen')}>
          <style {...{jsx: true}}>{stylesheet}</style>
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