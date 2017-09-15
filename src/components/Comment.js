import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentItem from './CommentItem'

class Comment extends Component {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render () {
    const { comments } = this.props

    return (
      <div>
        <p>{comments.length} comments</p>

        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <CommentItem comment={comment} />
              <br />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const comments = Object.keys(state.comments)
  const { parentId } = ownProps

  return {
    comments: comments.map(c => state.comments[c])
      .filter(c => c.parentId === parentId)
  }
}

export default connect(mapStateToProps)(Comment)
