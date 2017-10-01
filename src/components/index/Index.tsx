import * as React from 'react'
import * as classnames from 'classnames'
import stylesheet from './Index.pcss'

import BancoRealtimeAPI from '../../lib/banco-realtime-api'

const BANCO_URL:string = 'ws://localhost:3000/websocket'

export class Index extends React.Component<{}, {}> {

  componentDidMount(){
    let bancoRealtimeAPI = new BancoRealtimeAPI(BANCO_URL);

    bancoRealtimeAPI.connectToServer()
    bancoRealtimeAPI.onError(err => console.log('Banco API Error', err));
    bancoRealtimeAPI.onCompletion(() => console.log('Banco API Complete'));
    bancoRealtimeAPI.onMessage(msg => console.log(msg));
    bancoRealtimeAPI.login('rustykey4@naver.com','wlsgh82').subscribe(msg => {
      console.log('login');
      console.log('msg', msg);
    });

    //get rooms
    bancoRealtimeAPI.callMethod('rooms/getAll').subscribe(msg => {
      console.log('rooms/getAll');
      console.log('msg', msg);
    });

    //join room
    // bancoAPI.callMethod('joinRoom','BITCOIN')

    console.log('join room')
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