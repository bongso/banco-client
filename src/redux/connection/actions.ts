import actionTypes from './actionTypes'

export const connectToServer = () => {
  return (dispatch, getState, bancoRealtimeAPI) => {
    return new Promise((resolve, reject) => {
      const connectionState = getState().connection;
      if(connectionState.isConnected){
        return resolve()
      }

      dispatch(initConnection())

      bancoRealtimeAPI.connectToServer()
        .subscribe((msg) => {
          // console.log(response)
          dispatch(connectionEstablished({
            session: msg.session
          }))

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          console.log(err)
          dispatch(connectionError({error: err}))

          return reject(err)
        })
    })
  }
}

export const initConnection = () => {
  return {
    type: actionTypes.INIT_CONNECTION,
  }
}

export const connectionEstablished = (payload: any) => {
  return {
    type   : actionTypes.CONNECTION_ESTABLISHED,
    payload: payload
  }
}

export const connectionError = (payload: any) => {
  return {
    type   : actionTypes.CONNECTION_ERROR,
    payload: payload
  }
}

export const closeConnection = () => {
  return {
    type: actionTypes.CLOSE_CONNECTION,
  }
}