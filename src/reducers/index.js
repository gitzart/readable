import { combineReducers } from 'redux'
import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
  LOAD_COMMENTS,
  SORT_POSTS,
  SORT_COMMENTS
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

const comments = (state = {}, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return { ...state, ...action.comments }
    default:
      return state
  }
}

const miscState = {
  postObj: {
    options: [
      { value: '-voteScore', label: 'vote' },
      { value: 'title', label: 'title' },
      { value: '-timestamp', label: 'date' }
    ],
    currentOption: '-voteScore'
  },
  commentObj: {
    options: [
      { value: '-voteScore', label: 'vote' },
      { value: '-timestamp', label: 'date' }
    ],
    currentOption: '-voteScore'
  }
}

const misc = (state = miscState, action) => {
  switch (action.type) {
    case SORT_POSTS:
      return {
        ...state,
        postObj: {
          ...state.postObj, currentOption: action.option
        }
      }
    case SORT_COMMENTS:
      return {
        ...state,
        commentObj: {
          ...state.commentObj, currentOption: action.option
        }
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  categories,
  posts,
  comments,
  misc
})

export default reducer
