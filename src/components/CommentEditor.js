// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serialize from 'form-serialize'
import uuid4 from 'uuid/v4'
import Modal from 'react-modal'

// local module imports
import { addComment, toggleCommentEditor } from '../actions'

function CommentCreate ({ onSubmit }) {
  return (
    <form className='editor-form' onSubmit={onSubmit}>
      <input
        className='editor-form-item'
        type='text'
        name='author'
        placeholder='your precious name'
        autoFocus
        required
      />

      <textarea
        className='editor-form-item'
        name='body'
        placeholder='well, tell us what you think'
        required
      >
      </textarea>

      <button className='editor-form-btn'>post</button>
    </form>
  )
}

function CommentEdit ({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>

    </form>
  )
}

class CommentEditor extends Component {
  static propTypes = {
    action: PropTypes.string,
    parentPost: PropTypes.object,
    add: PropTypes.func,
    commentEditorOpen: PropTypes.bool.isRequired,
    toggleEditor: PropTypes.func.isRequired
  }

  onCreateComment = e => {
    const { add, parentPost, toggleEditor } = this.props
    add(e, parentPost)
    toggleEditor({ option: false })
  }

  render () {
    const {
      action, commentEditorOpen, toggleEditor
    } = this.props

    const createProps = { onSubmit: this.onCreateComment }

    return (
      <div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commentEditorOpen}
          onRequestClose={() => toggleEditor({ option: false })}
          contentLabel='Comment Modal'
        >
          {action === 'create' && (
            <CommentCreate {...createProps} />
          )}

          {action === 'edit' && (
            <CommentEdit />
          )}
        </Modal>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { action, parentPost } = ownProps
  const { commentEditorOpen } = state.misc

  return { action, parentPost, commentEditorOpen }
}

function mapDispatchToProps (dispatch) {
  return {
    add: (e, parentPost) => {
      e.preventDefault()

      const comment = serialize(e.target, { hash: true })
      comment.id = uuid4()
      comment.timestamp = Date.now()

      dispatch(addComment(parentPost.id, comment))
    },
    toggleEditor: obj => dispatch(toggleCommentEditor(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditor)
