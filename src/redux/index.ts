import {bindActionCreators, combineReducers} from 'redux'
import {PersistState, reducer as persist} from './persist/index'
import {reducer as router, replaceUrl} from './router/index'
import {connectionState, connection} from './connection/reducer'
import {initConnection} from './connection/actions'

export interface RootState {
  persist: PersistState
  connection: connectionState
}

export const reducer = combineReducers<RootState>({
  persist,
  router,
  connection
})

// export function actions(dispatch): DispatchProps {
//   const actionCreators = {
//     loggedIn,
//     logout,
//
//     getNews,
//     bookmarkNews,
//     unBookmarkNews,
//
//     replaceUrl,
//
//     initConnection
//   }
//   return {
//     actions: bindActionCreators(actionCreators, dispatch)
//   }
// }

// interface ActionCreators {
//   loggedIn: typeof loggedIn
//   logout: typeof logout
//   getNews: typeof getNews
//   bookmarkNews: typeof bookmarkNews
//   unBookmarkNews: typeof unBookmarkNews
//   replaceUrl: typeof replaceUrl
//   initConnection: typeof initConnection
// }
//
// export interface DispatchProps {
//   actions: ActionCreators
// }
