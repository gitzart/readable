import * as API from '../utils/api'
import * as types from '../constants/ActionTypes'

/* ===========================
    React action creators
============================== */
export const loadCategories = categories => ({
  type: types.LOAD_CATEGORIES,
  categories
})

export const loadPosts = posts => ({
  type: types.LOAD_POSTS,
  posts
})

export const loadComments = comments => ({
  type: types.LOAD_COMMENTS,
  comments
})

export const sortPosts = option => ({
  type: types.SORT_POSTS,
  option
})

export const sortComments = option => ({
  type: types.SORT_COMMENTS,
  option
})

/* ===========================
    Redux Thunk action creators
============================== */
export const getAllCategories = () => dispatch =>
  API.getAllCategories().then(data => dispatch(loadCategories(data)))

export const getAllPosts = () => dispatch =>
  API.getAllPosts().then(data => dispatch(loadPosts(data)))

export const getAllComments = post => dispatch =>
  API.getAllComments(post).then(data => dispatch(loadComments(data)))
