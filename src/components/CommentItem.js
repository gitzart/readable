import React from 'react'
import PropTypes from 'prop-types'
import Time from 'react-time'

function CommentItem ({ comment }) {
  const dtFormat = `MMM DD'YY [at] HH:mm`

  return (
    <div>
      <div>
        <span>by {comment.author} | </span>
        <span>votes {comment.voteScore} | </span>
        <Time value={comment.timestamp} format={dtFormat} />
      </div>
      <p>{comment.body}</p>
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired
}

export default CommentItem
