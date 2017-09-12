import { combineReducers } from 'redux'
import {
  LOAD_CATEGORIES,
  LOAD_POSTS
} from '../constants/ActionTypes'

const categories = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return { ...state, ...action.categories }
    default:
      return state
  }
}

const posts = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...state, ...action.posts }
    default:
      return state
  }
}

const reducer = combineReducers({
  categories,
  posts
})

export default reducer
