// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serialize from 'form-serialize'
import uuid4 from 'uuid/v4'
import Modal from 'react-modal'

// local module imports
import { addComment, toggleCommentEditor } from '../actions'

class CommentEditor extends Component {
  static propTypes = {
    parentId: PropTypes.string.isRequired,
    addComment: PropTypes.func,
    commentEditorOpen: PropTypes.bool.isRequired,
    toggleCommentEditor: PropTypes.func.isRequired
  }

  render () {
    const {
      parentId, addComment, commentEditorOpen, toggleCommentEditor
    } = this.props

    return (
      <div>
        <button onClick={() => toggleCommentEditor(true)}>Add a new comment</button>
        <Modal
          isOpen={commentEditorOpen}
          onRequestClose={() => toggleCommentEditor(false)}
          contentLabel='Comment Modal'
        >
          <form onSubmit={e => {
            addComment(e, parentId)
            toggleCommentEditor(false)
          }}>
            <input type='text' name='author' placeholder='author' autoFocus required />
            <br />
            <input type='text' name='title' placeholder='comment title' required />
            <br />
            <textarea name='body' placeholder='comment here...' required ></textarea>
            <br />
            <button>post</button>
          </form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { parentId } = ownProps
  const { commentEditorOpen } = state.misc

  return { parentId, commentEditorOpen }
}

function mapDispatchToProps (dispatch) {
  return {
    addComment: (e, postId) => {
      e.preventDefault()

      const comment = serialize(e.target, { hash: true })
      comment.id = uuid4()
      comment.timestamp = Date.now()

      dispatch(addComment(postId, comment))
    },
    toggleCommentEditor: value => dispatch(toggleCommentEditor(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditor)
