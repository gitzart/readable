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

export const createPost = post => ({
  type: types.ADD_POST,
  post
})

export const createComment = comment => ({
  type: types.ADD_COMMENT,
  comment
})

export const togglePostEditor = (
  { option, action = undefined, post = undefined }
) => ({
  type: types.TOGGLE_POST_EDITOR,
  option,
  action,
  post
})

export const toggleCommentEditor = value => ({
  type: types.TOGGLE_COMMENT_EDITOR,
  value
})

export const deletePost = postId => ({
  type: types.REMOVE_POST,
  postId
})

export const deleteComment = commentId => ({
  type: types.REMOVE_COMMENT,
  commentId
})

export const updatePostVote = post => ({
  type: types.VOTE_POST,
  post
})

export const updateCommentVote = comment => ({
  type: types.VOTE_COMMENT,
  comment
})

export const updatePost = post => ({
  type: types.EDIT_POST,
  post
})

/* ===========================
    Redux Thunk action creators
============================== */
export const getAllCategories = () => dispatch =>
  API.getAllCategories()
    .then(data => dispatch(loadCategories(data)))

export const getAllPosts = () => dispatch =>
  API.getAllPosts().then(data => dispatch(loadPosts(data)))

export const getAllComments = post => dispatch =>
  API.getAllComments(post)
    .then(data => dispatch(loadComments(data)))

export const addPost = post => dispatch =>
  API.addPost(post).then(data => dispatch(createPost(data)))

export const addComment = (postId, comment) => dispatch =>
  API.addComment(postId, comment)
    .then(data => dispatch(createComment(data)))

export const removePost = postId => dispatch =>
  API.removePost(postId)
    .then(data => dispatch(deletePost(postId)))

export const removeComment = commentId => dispatch =>
  API.removeComment(commentId)
    .then(data => dispatch(deleteComment(commentId)))

export const votePost = (postId, option) => dispatch =>
  API.votePost(postId, option)
    .then(data => dispatch(updatePostVote(data)))

export const voteComment = (commentId, option) => dispatch =>
  API.voteComment(commentId, option)
    .then(data => dispatch(updateCommentVote(data)))

export const editPost = (postId, post) => dispatch =>
  API.editPost(postId, post)
    .then(data => dispatch(updatePost(data)))
