import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Time from 'react-time'
import { removePost } from '../actions'

class PostItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    removePost: PropTypes.func.isRequired
  }

  render () {
    const dtFormat = `MMM DD'YY [at] HH:mm`
    const { post, removePost } = this.props

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
        <button onClick={() => removePost(post.id)}>delete</button>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    removePost: postId => dispatch(removePost(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
