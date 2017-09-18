import { combineReducers } from 'redux'
import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
  LOAD_COMMENTS,
  SORT_POSTS,
  SORT_COMMENTS,
  ADD_POST,
  ADD_COMMENT,
  TOGGLE_POST_EDITOR,
  TOGGLE_COMMENT_EDITOR,
  REMOVE_POST,
  REMOVE_COMMENT,
  VOTE_POST,
  VOTE_COMMENT,
  EDIT_POST
} from '../constants/ActionTypes'

const categories = (state = [], action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

const posts = (state = {}, action) => {
  const { post } = action

  switch (action.type) {
    case LOAD_POSTS:
      return action.posts.reduce((posts, post) => {
        posts[post.id] = post
        return posts
      }, {})
    case ADD_POST:
      return { ...state, [post.id]: post }
    case REMOVE_POST:
      const newState = { ...state }
      delete newState[action.postId]
      return newState
    case VOTE_POST:
      return { ...state, [post.id]: post }
    case EDIT_POST:
      return { ...state, [post.id]: post }
    default:
      return state
  }
}

const comments = (state = {}, action) => {
  const { comment } = action

  switch (action.type) {
    case LOAD_COMMENTS:
      return action.comments.reduce((comments, comment) => {
        comments[comment.id] = comment
        return comments
      }, {})
    case ADD_COMMENT:
      return { ...state, [comment.id]: comment }
    case REMOVE_COMMENT:
      const newState = { ...state }
      delete newState[action.commentId]
      return newState
    case VOTE_COMMENT:
      return { ...state, [comment.id]: comment }
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
  },
  postEditorOpen: false,
  commentEditorOpen: false,
  postInAction: undefined,
  currentPostAction: undefined
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
    case TOGGLE_POST_EDITOR:
      return {
        ...state,
        postEditorOpen: action.option,
        postInAction: action.post,
        currentPostAction: action.action
      }
    case TOGGLE_COMMENT_EDITOR:
      return { ...state, commentEditorOpen: action.value }
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
