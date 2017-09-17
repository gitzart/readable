import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Time from 'react-time'
import { removeComment } from '../actions'

class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired
  }

  render () {
    const dtFormat = `MMM DD'YY [at] HH:mm`
    const { comment, removeComment } = this.props

    return (
      <div>
        <div>
          <span>by {comment.author} | </span>
          <span>votes {comment.voteScore} | </span>
          <Time value={comment.timestamp} format={dtFormat} />
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
    removeComment: commentId => dispatch(removeComment(commentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)
