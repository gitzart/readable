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

export const sortPosts = key => ({
  type: types.SORT_POSTS,
  key
})

/* ===========================
    Redux Thunk action creators
============================== */
export const getAllCategories = () => dispatch =>
  API.getAllCategories().then(data => dispatch(loadCategories(data)))

export const getAllPosts = () => dispatch =>
  API.getAllPosts().then(data => dispatch(loadPosts(data)))
