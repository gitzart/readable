import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sortPosts } from '../actions'
import Sort from './Sort'
import PostItem from './PostItem'

function PostList ({ posts, postObj, sortPosts }) {
  return (
    <div>
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
  sortPosts: PropTypes.func.isRequired
}

function mapStateToProps (state, ownProps) {
  return { postObj: state.misc.postObj }
}

function mapDispatchToProps (dispatch) {
  return { sortPosts: e => dispatch(sortPosts(e.target.value)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
