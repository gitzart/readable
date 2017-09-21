// third-party module imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentIcon from 'react-icons/lib/fa/comment-o'

// local module imports
import { sortComments, toggleCommentEditor } from '../actions'
import Sort from './Sort'
import CommentItem from './CommentItem'

function CommentList (props) {
  const {
    comments, commentObj, sort, toggleEditor, parentPost
  } = props

  return (
    <div>
      <div
        className='editor-trigger'
        onClick={() => toggleEditor(
          { option: true, action: 'create', parentPost }
        )}
      >
        <CommentIcon size='20' /> What do you think?
      </div>

      <div className='list-data__top'>
        <p className='list-data__meta'>
          {comments.length} comments
        </p>

        {comments.length !== 0
          && <Sort target={commentObj} onChange={sort} />
        }
      </div>

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
  parentPost: PropTypes.object,
  sort: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired
}

function mapStateToProps (state, ownProps) {
  const { comments, parentPost } = ownProps
  const { commentObj } = state.misc

  return { comments, commentObj, parentPost }
}

function mapDispatchToProps (dispatch) {
  return {
    sort: e => dispatch(sortComments(e.target.value)),
    toggleEditor: obj => dispatch(toggleCommentEditor(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
