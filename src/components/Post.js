import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Post extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired
  }

  render () {
    const postId = this.props.match.params.postId
    const post = this.props.posts.filter(p => p.id === postId)[0]

    return (
      <div>
        <Link to='/'>Home</Link>
        {post && (
          <div>
            <h3>{post.title}</h3>
            <span>by {post.author}</span>
            <p>{post.body}</p>
          </div>
        )}
      </div>
    )
  }
}

export default Post
