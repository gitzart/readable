import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Time from 'react-time'
import { removeComment, voteComment } from '../actions'

class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,
    voteComment: PropTypes.func.isRequired
  }

  render () {
    const dtFormat = `MMM DD'YY [at] HH:mm`
    const { comment, removeComment, voteComment } = this.props

    return (
      <div>
        <div>
          <span>by {comment.author} | </span>
          <span>votes {comment.voteScore} | </span>
          <Time value={comment.timestamp} format={dtFormat} />
        </div>
        <div>
          <button onClick={() => voteComment(comment.id, 'upVote')}>vote up</button>
          <button onClick={() => voteComment(comment.id, 'downVote')}>vote down</button>
        </div>
        <p>{comment.body}</p>
        <button onClick={() => removeComment(comment.id)}>delete</button>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    removeComment: commentId => dispatch(removeComment(commentId)),
    voteComment: (commentId, option) => (
      dispatch(voteComment(commentId, option))
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)
