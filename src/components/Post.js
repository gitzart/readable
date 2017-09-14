import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Post extends Component {
  static propTypes = {
    post: PropTypes.object
  }

  render () {
    const { post } = this.props

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

function mapStateToProps (state, ownProps) {
  const postId = ownProps.match.params.postId

  return {
    post: ownProps.posts.filter(p => p.id === postId)[0]
  }
}

export default connect(mapStateToProps)(Post)
