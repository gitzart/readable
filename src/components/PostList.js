import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sortPosts, togglePostEditor } from '../actions'
import Sort from './Sort'
import PostItem from './PostItem'

function PostList (props) {
  const { posts, postObj, sortPosts, togglePostEditor } = props

  return (
    <div>
      <button onClick={() => (
        togglePostEditor(true, 'create')
      )}>Add a new post</button>

      <Sort target={postObj} onChange={sortPosts} />

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <PostItem post={post} />
            <br />
          </li>
        ))}
      </ul>
    </div>
  )
}

PostList.propTypes = {
  postObj: PropTypes.object.isRequired,
  sortPosts: PropTypes.func.isRequired,
  togglePostEditor: PropTypes.func.isRequired
}

function mapStateToProps (state, ownProps) {
  return { postObj: state.misc.postObj }
}

function mapDispatchToProps (dispatch) {
  return {
    sortPosts: e => dispatch(sortPosts(e.target.value)),
    togglePostEditor: (option, action) => (
      dispatch(togglePostEditor(option, action))
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
