// third-party module imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentIcon from 'react-icons/lib/fa/comment-o'

// local module imports
import { sortComments, toggleCommentEditor } from '../actions'
import Sort from './Sort'
import CommentItem from './CommentItem'

function CommentList ({ comments, commentObj, sort, toggleEditor }) {
  return (
    <div>
      <p className='comment-list__meta'>
        {comments.length} comments
      </p>

      <div
        className='editor-trigger'
        onClick={() => toggleEditor({ option: true, action: 'create' })}
      >
        <CommentIcon size='20' /> What do you think?
      </div>

      {comments.length !== 0
        && <Sort target={commentObj} onChange={sort} />
      }

      <div>
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  commentObj: PropTypes.object.isRequired,
  sort: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired
}

function mapStateToProps (state, ownProps) {
  const { comments } = ownProps
  const { commentObj } = state.misc
  return { comments, commentObj }
}

function mapDispatchToProps (dispatch) {
  return {
    sort: e => dispatch(sortComments(e.target.value)),
    toggleEditor: obj => dispatch(toggleCommentEditor(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
