// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serialize from 'form-serialize'
import uuid4 from 'uuid/v4'
import Modal from 'react-modal'

// local module imports
import { addPost, editPost, togglePostEditor } from '../actions'

function PostCreate ({ onSubmit, categories }) {
  return (
    <form className='editor-form' onSubmit={onSubmit}>
      <div className='editor-form-select'>
        <span>category </span>
        <select name='category'>
          {categories.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <input
        className='editor-form-item'
        type='text'
        name='author'
        placeholder='your precious name'
        autoFocus
        required
      />

      <input
        className='editor-form-item'
        type='text'
        name='title'
        placeholder='title goes here'
        required
      />

      <textarea
        className='editor-form-item'
        name='body'
        placeholder={`now it's time to write something new`}
        required
      >
      </textarea>

      <button className='editor-form-btn'>post</button>
    </form>
  )
}

function PostEdit ({ onSubmit, post, categories }) {
  return (
    <form className='editor-form' onSubmit={onSubmit}>
      <div className='editor-form-select'>
        <span>category </span>
        <select name='category' defaultValue={post.category}>
          {categories.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <input
        className='editor-form-item'
        type='text'
        name='author'
        defaultValue={post.author}
        placeholder='your precious name'
        autoFocus
        required
      />

      <input
        className='editor-form-item'
        type='text'
        name='title'
        defaultValue={post.title}
        placeholder='title goes here'
        required
      />

      <textarea
        className='editor-form-item'
        name='body'
        defaultValue={post.body}
        placeholder={`now it's time to write something new`}
        required
      >
      </textarea>

      <input type='hidden' name='id' defaultValue={post.id} />
      <button className='editor-form-btn'>save</button>
    </form>
  )
}

class PostEditor extends Component {
  static propTypes = {
    action: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    post: PropTypes.object,
    postEditorOpen: PropTypes.bool.isRequired,
    add: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    toggleEditor: PropTypes.func.isRequired,
  }

  onCreatePost = e => {
    const { add, toggleEditor } = this.props
    add(e)
    toggleEditor({ option: false })
  }

  onEditPost = e => {
    const { edit, toggleEditor } = this.props
    edit(e)
    toggleEditor({ option: false })
  }

  render () {
    const {
      categories, post, action, postEditorOpen, toggleEditor
    } = this.props

    const createProps = { onSubmit: this.onCreatePost, categories }
    const editProps = { onSubmit: this.onEditPost, categories, post }

    return (
      <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={postEditorOpen}
        onRequestClose={() => toggleEditor({ option: false })}
        contentLabel='Post Modal'
      >
        {action === 'create' && <PostCreate {...createProps} />}
        {action === 'edit' && <PostEdit {...editProps} />}
      </Modal>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { categories } = state
  const { postEditorOpen } = state.misc
  const { action, post } = ownProps

  return { action, categories, postEditorOpen, post }
}

function mapDispatchToProps (dispatch) {
  return {
    add: e => {
      e.preventDefault()

      const post = serialize(e.target, { hash: true })
      post.id = uuid4()
      post.timestamp = Date.now()

      dispatch(addPost(post))
    },
    edit: e => {
      e.preventDefault()
      const post = serialize(e.target, { hash: true })
      dispatch(editPost(post.id, post))
    },
    toggleEditor: obj => dispatch(togglePostEditor(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor)
