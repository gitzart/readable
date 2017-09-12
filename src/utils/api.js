const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  Accept: 'application/json',
  Authorization: token
}

const postHeaders = {
  ...headers,
  'Content-Type': 'application/json'
}

/* ===========================
    categories
============================== */
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getCategory = category =>
  fetch(`${api}/${category.name}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

/* ===========================
    posts
============================== */
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPost = post =>
  fetch(`${api}/posts/${post.id}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addPost = body =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: postHeaders,
    body: JSON.stringify(body)
  }).then(res => res.json())

export const votePost = (post, option='upVote') =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'POST',
    headers: postHeaders,
    body: JSON.stringify({ option })
  }).then(res => res.json())

export const editPost = (post, body) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: postHeaders,
    body: JSON.stringify(body)
  }).then(res => res.json())

export const removePost = post =>
  fetch(`${api}/posts/${post.id}`, { method: 'DELETE', headers })

/* ===========================
    comments
============================== */
export const getAllComments = post =>
  fetch(`${api}/posts/${post.id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addComment = (post, body) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: postHeaders,
    body: JSON.stringify({ ...body, parentId: post.id })
  }).then(res => res.json())
    .then(data => data)

export const getComment = comment =>
  fetch(`${api}/comments/${comment.id}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const voteComment = (comment, option='upVote') =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'POST',
    headers: postHeaders,
    body: JSON.stringify({ option })
  }).then(res => res.json())
    .then(data => data)

export const editComment = (comment, body) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: postHeaders,
    body: JSON.stringify(body)
  }).then(res => res.json())

export const removeComment = comment =>
  fetch(`${api}/comments/${comment.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data)
