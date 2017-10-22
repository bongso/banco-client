import actionTypes from './actionTypes'

export const registerUser = (email: string, password: string, username: string) => {
  return (dispatch, getState, {bancoRealtimeAPI, bancoRestAPI}) => {
    return new Promise((resolve, reject) => {
      dispatch(registerUserStarted())

      //load room history
      bancoRealtimeAPI.callMethod('registerUser', {
        'email': email,
        'pass' : password,
        'name' : username
      })
        .subscribe((msg) => {
          console.log('registerUser', msg)

          if(msg.error){
            dispatch(registerUserFailed({
              error: msg.error.reason
            }))

            return reject(msg.error.reason)
          }

          if (msg.msg == 'result') {
            dispatch(registerUserSucceed({
              userId: msg && msg.result
            }))
          }

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          // console.log('error',err)
          dispatch(registerUserFailed({
            error: err
          }))

          return reject(err)
        })
    })
  }
}

const registerUserStarted = () => {
  return {
    type: actionTypes.REGISTER_USER_STARTED,
  }
}

const registerUserSucceed = (payload: any) => {
  return {
    type   : actionTypes.REGISTER_USER_SUCCEED,
    payload: payload
  }
}

const registerUserFailed = (payload: any) => {
  return {
    type   : actionTypes.REGISTER_USER_FAILED,
    payload: payload
  }
}