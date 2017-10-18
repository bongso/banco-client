import actionTypes from './actionTypes'

export const getSubscriptions = () => {
  return (dispatch, getState, {bancoRealtimeAPI, bancoRestAPI}) => {
    return new Promise((resolve, reject) => {
      const subscriptionsState = getState().subscriptions
      if (subscriptionsState.totalRooms.length > 0) {
        return resolve()
      }

      dispatch(getSubscriptionsStarted())


      // bancoRestAPI.get('/api/v1/channels.list')
      //   .subscribe((msg) => {
      //     console.log('bancoRestAPI', msg.response)
      //
      //     return resolve(msg.response)
      //   }, (err) => {
      //     //TODO::display error message
      //     console.log('bancoRestAPI', err)
      //     dispatch(getSubscriptionsFailed({
      //       error: err
      //     }))
      //
      //     return reject(err)
      //   })

      bancoRealtimeAPI.callMethod('subscriptions/get')
        .subscribe((msg) => {
          // console.log(response)
          dispatch(getSubscriptionsSucceed({
            rooms: msg && msg.result
          }))

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          console.log(err)
          dispatch(getSubscriptionsFailed({
            error: err
          }))

          return reject(err)
        })
    })
  }
}

const getSubscriptionsStarted = () => {
  return {
    type: actionTypes.GET_SUBSCRIPTIONS_STARTED,
  }
}

const getSubscriptionsSucceed = (payload: any) => {
  return {
    type   : actionTypes.GET_SUBSCRIPTIONS_SUCCEED,
    payload: payload
  }
}

const getSubscriptionsFailed = (payload: any) => {
  return {
    type   : actionTypes.GET_SUBSCRIPTIONS_FAILED,
    payload: payload
  }
}