import {bindActionCreators, combineReducers} from 'redux'
import {PersistState, reducer as persist} from './persist/index'
import {loggedIn, logout, reducer as system, SystemState} from './system/index'
import {reducer as router, replaceUrl} from './router/index'
import {bookmarkNews, getNews, NewsState, reducer as news, unBookmarkNews} from './news/index'

export const reducer = combineReducers<RootState>({
  persist,
  system,
  router,
  news
})
export interface RootState {
  persist: PersistState
  system: SystemState
  news: NewsState
}

export function actions(dispatch): DispatchProps {
  const actionCreators = {
    loggedIn,
    logout,

    getNews,
    bookmarkNews,
    unBookmarkNews,

    replaceUrl
  }
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}
interface ActionCreators {
  loggedIn: typeof loggedIn
  logout: typeof logout
  getNews: typeof getNews
  bookmarkNews: typeof bookmarkNews
  unBookmarkNews: typeof unBookmarkNews
  replaceUrl: typeof replaceUrl
}
export interface DispatchProps {
  actions: ActionCreators
}
