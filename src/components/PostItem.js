import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Time from 'react-time'

function PostItem ({ ui = 'full', post }) {
  const dtFormat = `MMM DD'YY [at] HH:mm`

  return (
    <div>
      <Link to={`/${post.category}/${post.id}`}>
        <h4>{post.title}</h4>
      </Link>
      <div>
        <span>by {post.author} | </span>
        <span>votes {post.voteScore} | </span>
        <Time value={post.timestamp} format={dtFormat} />
      </div>
      <p>{post.body}</p>
    </div>
  )
}

PostItem.propTypes = {
  ui: PropTypes.string,
  post: PropTypes.object.isRequired
}

export default PostItem
