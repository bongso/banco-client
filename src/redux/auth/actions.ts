import actionTypes from './actionTypes'
import {auth} from './reducer'

export const login = (username: string, password: string) => {
  return (dispatch, getState, {bancoRealtimeAPI, bancoRestAPI}) => {
    return new Promise((resolve, reject) => {
      dispatch(loginUserStarted())

      //load room history
      bancoRealtimeAPI.login(username, password)
        .subscribe((msg) => {
          // console.log('login',msg)

          if (msg.msg == 'result') {
            dispatch(loginUserSucceed({
              tokenInfo: msg && msg.result
            }))

            bancoRestAPI.setToken(msg.result.token)
            bancoRestAPI.setUserId(msg.result.id)
          }

          if (msg.msg == 'added') {
            dispatch(loginUserSucceed({
              user: msg && msg.fields
            }))
          }

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          // console.log('error',err)
          dispatch(loginUSerFailed({
            error: err
          }))

          return reject(err)
        })
    })
  }
}

export const loginWithAuthToken = () => {
  return (dispatch, getState, {bancoRealtimeAPI, bancoRestAPI}) => {
    return new Promise((resolve, reject) => {
      const tokenInfo = getState().auth.tokenInfo
      const authToken: string | null = tokenInfo && tokenInfo.token || null
      if (!authToken) {
        return reject('no token')
      }

      dispatch(loginUserStarted())

      //load room history
      bancoRealtimeAPI.loginWithAuthToken(authToken)
        .subscribe((msg) => {
          // console.log(response)
          dispatch(loginUserSucceed({
            tokenInfo: msg && msg.result
          }))

          bancoRestAPI.setToken(msg.result.token)
          bancoRestAPI.setUserId(msg.result.id)

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
  return (dispatch, getState, {bancoRealtimeAPI, bancoRestAPI}) => {
    return new Promise((resolve, reject) => {
      dispatch(loginUserStarted())

      //load room history
      bancoRealtimeAPI.loginWithOAuth(credToken, credSecret)
        .subscribe((msg) => {
          // console.log(response)
          dispatch(loginUserSucceed({
            tokenInfo: msg && msg.result
          }))

          bancoRestAPI.setToken(msg.result.token)
          bancoRestAPI.setUserId(msg.result.id)

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
  return (dispatch, getState, {bancoRealtimeAPI, bancoRestAPI}) => {
    dispatch(logoutUserSucceed())

    bancoRestAPI.setToken(null)
    bancoRestAPI.setUserId(null)
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
    type: actionTypes.LOGOUT_USER_SUCCEED,
  }
}

const logoutUSerFailed = (payload: any) => {
  return {
    type   : actionTypes.LOGOUT_USER_FAILED,
    payload: payload
  }
}