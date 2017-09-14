import { combineReducers } from 'redux'
import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
  SORT_POSTS
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

const miscState = {
  sortPosts: '-voteScore'
}

const misc = (state = miscState, action) => {
  switch (action.type) {
    case SORT_POSTS:
      return { ...state, sortPosts: action.key }
    default:
      return state
  }
}

const reducer = combineReducers({
  categories,
  posts,
  misc
})

export default reducer
