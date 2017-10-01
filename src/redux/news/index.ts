import {Reducer} from 'redux'
import {DELETE, GET, POST} from 'redux-fetch'
import {API_NEWS} from '../../constants/env'
import {createActions, FAIL, headers, REQUEST, SUCCESS} from '../common'

const defaultState = {} as NewsState

export const reducer: Reducer<NewsState> = (state = defaultState, action) => {
  const {type, payload} = action
  switch (type) {
    case ACTIONS_NEWS[REQUEST]:
    return {
      ...state,
      loading: true
    }
    case ACTIONS_NEWS[SUCCESS]:
      return {
        ...state,
        list: payload,
        loading: false
      }
    case ACTIONS_NEWS[FAIL]:
      return {
        ...state,
        list: [],
        loading: false
      }
    case ACTIONS_BOOKMARK_NEWS[SUCCESS]:
      const index = state.list.findIndex(row => row._id === payload._id)
      if (index === -1) {
        return state
      }
      state.list.splice(index, 1, payload)
      const list = state.list.slice()

      return {
        ...state,
        list
      }
    default:
      return state
  }
}

enum ActionTypes {
  BOOT      = 'boot',
  SESSION   = 'session',
  LOGGED_IN = 'logged in',
  LOGOUT    = 'logout',
  NEWS      = 'news',
  BOOKMARK_NEWS = 'bookmark news',
  UN_BOOKMARK_NEWS = 'un bookmark news'
}

const ACTIONS_NEWS = createActions(ActionTypes.NEWS)
export const getNews = () => GET(API_NEWS, ACTIONS_NEWS, {headers})

const ACTIONS_BOOKMARK_NEWS = createActions(ActionTypes.BOOKMARK_NEWS)
export const bookmarkNews = (id) => POST(`${API_NEWS}/${id}/bookmark`, ACTIONS_BOOKMARK_NEWS, {headers})

const ACTIONS_UN_BOOKMARK_NEWS = createActions(ActionTypes.UN_BOOKMARK_NEWS)
export const unBookmarkNews = (id) => DELETE(`${API_NEWS}/${id}/un-bookmark`, ACTIONS_UN_BOOKMARK_NEWS, {headers})

export interface NewsState {
  list: News[]
  loading: boolean
}

interface News {
  _id: string
  번호: string
  제목: string
  작성자: string
  작성일자: string
  조회수: string
  name: string
  url: string
  접수일정: string
  상태: string
}