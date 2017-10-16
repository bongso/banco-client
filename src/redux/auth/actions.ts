import actionTypes from './actionTypes'

export const login = (username: string, password: string) => {
  return (dispatch, getState, bancoRealtimeAPI) => {
    return new Promise((resolve, reject) => {
      dispatch(loginUserStarted())

      //load room history
      bancoRealtimeAPI.login(username, password)
        .subscribe((msg) => {
          // console.log(response)
          dispatch(loginUserSucceed({
            user: msg && msg.result
          }))

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          console.log(err)
          dispatch(loginUSerFailed({
            error: err
          }))

          return reject(err)
        })
    })
  }
}

export const loginWithAuthToken = (authToken: string) => {
  return (dispatch, getState, bancoRealtimeAPI) => {
    return new Promise((resolve, reject) => {
      dispatch(loginUserStarted())

      //load room history
      bancoRealtimeAPI.loginWithAuthToken(authToken)
        .subscribe((msg) => {
          // console.log(response)
          dispatch(loginUserSucceed({
            user: msg && msg.result
          }))

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          console.log(err)
          dispatch(loginUSerFailed({
            error: err
          }))

          return reject(err)
        })
    })
  }
}

export const loginWithOAuth = (credToken: string, credSecret: string) => {
  return (dispatch, getState, bancoRealtimeAPI) => {
    return new Promise((resolve, reject) => {
      dispatch(loginUserStarted())

      //load room history
      bancoRealtimeAPI.loginWithOAuth(credToken, credSecret)
        .subscribe((msg) => {
          // console.log(response)
          dispatch(loginUserSucceed({
            user: msg && msg.result
          }))

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          console.log(err)
          dispatch(loginUSerFailed({
            error: err
          }))

          return reject(err)
        })
    })
  }
}

export const logout = () => {
  return (dispatch, getState, bancoRealtimeAPI) => {
      dispatch(logoutUserSucceed())
  }
}

const loginUserStarted = () => {
  return {
    type: actionTypes.LOGIN_USER_STARTED,
  }
}

const loginUserSucceed = (payload: any) => {
  return {
    type   : actionTypes.LOGIN_USER_SUCCEED,
    payload: payload
  }
}

const loginUSerFailed = (payload: any) => {
  return {
    type   : actionTypes.LOGIN_USER_FAILED,
    payload: payload
  }
}

const logoutUserStarted = () => {
  return {
    type: actionTypes.LOGOUT_USER_STARTED,
  }
}

const logoutUserSucceed = () => {
  return {
    type   : actionTypes.LOGOUT_USER_SUCCEED,
  }
}

const logoutUSerFailed = (payload: any) => {
  return {
    type   : actionTypes.LOGOUT_USER_FAILED,
    payload: payload
  }
}