import * as API from '../utils/api'
import * as types from '../constants/ActionTypes'

export const loadCategories = categories => ({
  type: types.LOAD_CATEGORIES,
  categories
})

export const loadPosts = posts => ({
  type: types.LOAD_POSTS,
  posts
})

export const getAllCategories = () => dispatch =>
  API.getAllCategories().then(data => dispatch(loadCategories(data)))

export const getAllPosts = () => dispatch =>
  API.getAllPosts().then(data => dispatch(loadPosts(data)))
