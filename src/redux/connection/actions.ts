import actionTypes from './actionTypes'

export const initConnection = () => {
  return {
    type: actionTypes.INIT_CONNECTION,
  }
}

export const connectionEstablished = (payload : any) => {
  return {
    type: actionTypes.CONNECTION_ESTABLISHED,
    payload: payload
  }
}

export const closeConnection = () => {
  return {
    type: actionTypes.CLOSE_CONNECTION,
  }
}