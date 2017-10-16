import {REHYDRATE} from 'redux-persist/constants'
import {Reducer} from 'redux'

export interface StorageState {
  storageLoaded: boolean
}


const defaultStorageState = {
  storageLoaded: false
} as StorageState

// export const storage = (state = {}, action) => {
export const storage: Reducer<StorageState> = (state = defaultStorageState, action) => {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        storageLoaded: true
      }
    default:
      return state
  }
}
