// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serialize from 'form-serialize'
import uuid4 from 'uuid/v4'
import Modal from 'react-modal'

// local module imports
import { addComment, editComment, toggleCommentEditor } from '../actions'

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

function CommentEdit ({ onSubmit, comment }) {
  return (
    <form className='editor-form' onSubmit={onSubmit}>
      <input
        className='editor-form-item'
        type='text'
        name='author'
        defaultValue={comment.author}
        placeholder='your precious name'
        autoFocus
        required
      />
      
      <textarea
        className='editor-form-item'
        name='body'
        defaultValue={comment.body}
        placeholder={`now it's time to write something new`}
        required
      >
      </textarea>

      <input type='hidden' name='id' defaultValue={comment.id} />
      <button className='editor-form-btn'>save</button>
    </form>
  )
}

class CommentEditor extends Component {
  static propTypes = {
    action: PropTypes.string,
    parentPost: PropTypes.object,
    add: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    commentEditorOpen: PropTypes.bool.isRequired,
    toggleEditor: PropTypes.func.isRequired
  }

  onCreateComment = e => {
    const { add, parentPost, toggleEditor } = this.props
    add(e, parentPost)
    toggleEditor({ option: false })
  }

  onEditComment = e => {
    const { edit, toggleEditor } = this.props
    edit(e)
    toggleEditor({ option: false })
  }

  render () {
    const {
      action, comment, commentEditorOpen, toggleEditor
    } = this.props

    const createProps = { onSubmit: this.onCreateComment }
    const editProps = { onSubmit: this.onEditComment, comment }

    return (
      <div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commentEditorOpen}
          onRequestClose={() => toggleEditor({ option: false })}
          contentLabel='Comment Modal'
        >
          {action === 'create' && <CommentCreate {...createProps} />}
          {action === 'edit' && <CommentEdit {...editProps} />}
        </Modal>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { action, comment, parentPost } = ownProps
  const { commentEditorOpen } = state.misc

  return { action, comment, parentPost, commentEditorOpen }
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
    edit: e => {
      e.preventDefault()
      const comment = serialize(e.target, { hash: true })
      dispatch(editComment(comment.id, comment))
    },
    toggleEditor: obj => dispatch(toggleCommentEditor(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditor)
