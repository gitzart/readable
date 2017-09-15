import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
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
  const { parentId } = ownProps
  let { comments } = state
  const { commentObj } = state.misc

  comments = Object
    .keys(comments)
    .map(key => comments[key])
    .filter(c => c.parentId === parentId)
    .sort(sortBy(commentObj.currentOption))

  return { comments }
}

export default connect(mapStateToProps)(Comment)
