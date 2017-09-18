// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Time from 'react-time'

// local module imports
import {
  togglePostEditor, removePost, votePost
} from '../actions'

class PostItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    removePost: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    togglePostEditor: PropTypes.func.isRequired
  }

  render () {
    const dtFormat = `MMM DD'YY [at] HH:mm`
    const {
      post, removePost, votePost, togglePostEditor
    } = this.props

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
        <div>
          <button onClick={() => votePost(post.id, 'upVote')}>vote up</button>
          <button onClick={() => votePost(post.id, 'downVote')}>vote down</button>
        </div>
        <p>{post.body}</p>
        <div>
          <button onClick={() => (
            togglePostEditor(true, 'edit', post)
          )}>edit</button>
          <button onClick={() => removePost(post.id)}>delete</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    removePost: postId => dispatch(removePost(postId)),
    votePost: (postId, option) => dispatch(votePost(postId, option)),
    togglePostEditor: (option, action, post) => (
      dispatch(togglePostEditor(option, action, post))
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
