// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serialize from 'form-serialize'
import uuid4 from 'uuid/v4'
import Modal from 'react-modal'

// local module imports
import { addPost, togglePostEditor } from '../actions'

class PostEditor extends Component {
  static propTypes = {
    addPost: PropTypes.func,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    postEditorOpen: PropTypes.bool.isRequired,
    togglePostEditor: PropTypes.func.isRequired
  }

  render () {
    const {
      addPost, categories, postEditorOpen, togglePostEditor
    } = this.props

    return (
      <div>
        <button onClick={() => togglePostEditor(true)}>Add a new post</button>
        <Modal
          isOpen={postEditorOpen}
          onRequestClose={() => togglePostEditor(false)}
          contentLabel='Post Modal'
        >
          <form onSubmit={e => {
            addPost(e)
            togglePostEditor(false)
          }}>
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
        </Modal>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { categories } = state
  const { postEditorOpen } = state.misc

  return { categories, postEditorOpen }
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
    togglePostEditor: value => dispatch(togglePostEditor(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor)
