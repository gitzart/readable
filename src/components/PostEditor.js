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
    <form onSubmit={onSubmit}>
      <input type='text' name='author' placeholder='author' autoFocus required />
      <br />
      <span>category </span>
      <select name='category'>
        {categories.map(({ name }) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <br />
      <input type='text' name='title' placeholder='post title' required />
      <br />
      <textarea name='body' placeholder='post here...' required ></textarea>
      <br />
      <button>post</button>
    </form>
  )
}

function PostEdit ({ onSubmit, post, categories }) {
  return (
    <form onSubmit={onSubmit}>
      <input type='text' name='author' defaultValue={post.author} placeholder='author' autoFocus required />
      <br />
      <span>category </span>
      <select name='category' defaultValue={post.category}>
        {categories.map(({ name }) => (
          <option key={name} defaultValue={name}>{name}</option>
        ))}
      </select>
      <br />
      <input type='text' name='title' defaultValue={post.title} placeholder='post title' required />
      <br />
      <textarea name='body' defaultValue={post.body} placeholder='post here...' required></textarea>
      <br />
      <input type='hidden' name='id' defaultValue={post.id} />
      <button>save</button>
    </form>
  )
}

class PostEditor extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    post: PropTypes.object,
    postEditorOpen: PropTypes.bool.isRequired,
    addPost: PropTypes.func,
    editPost: PropTypes.func,
    togglePostEditor: PropTypes.func.isRequired,
  }

  render () {
    const {
      addPost, categories, postEditorOpen, togglePostEditor,
      editPost, post, task
    } = this.props

    const onCreatePost = e => {
      addPost(e)
      togglePostEditor(false)
    }

    const onEditPost = e => {
      editPost(e)
      togglePostEditor(false)
    }

    const createProps = { onSubmit: onCreatePost, categories }
    const editProps = { onSubmit: onEditPost, categories, post }

    return (
      <Modal
        isOpen={postEditorOpen}
        onRequestClose={() => togglePostEditor(false)}
        contentLabel='Post Modal'
      >
        {task === 'create' && (
          <PostCreate {...createProps} />
        )}

        {task === 'edit' && (
          <PostEdit {...editProps} />
        )}
      </Modal>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { categories } = state
  const { postEditorOpen } = state.misc
  const { post } = ownProps

  return { categories, postEditorOpen, post }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: e => {
      e.preventDefault()

      const post = serialize(e.target, { hash: true })
      post.id = uuid4()
      post.timestamp = Date.now()

      dispatch(addPost(post))
    },
    editPost: e => {
      e.preventDefault()
      const post = serialize(e.target, { hash: true })
      dispatch(editPost(post.id, post))
    },
    togglePostEditor: value => dispatch(togglePostEditor(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor)
