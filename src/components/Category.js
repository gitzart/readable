import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PostList from './PostList'

function Category ({ match, posts }) {
  const { category } = match.params
  posts = posts.filter(p => p.category === category)

  return (
    <div>
      <Link to='/'>Home</Link>
      <h2>{category}</h2>
      <PostList posts={posts} />
    </div>
  )
}

Category.propTypes = {
  match: PropTypes.object.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Category
