// third-party module imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateIcon from 'react-icons/lib/md/create'

// local module imports
import { sortPosts, togglePostEditor } from '../actions'
import Sort from './Sort'
import PostItem from './PostItem'

function PostList ({ posts, postObj, sort, toggleEditor }) {
  return (
    <div>
      <div
        className='editor-trigger'
        onClick={() => toggleEditor({ option: true, action: 'create' })}
      >
        <CreateIcon size='20' /> Write something new here...
      </div>

      <div className='list-data__top'>
        <p className='list-data__meta'>
          {posts.length} posts
        </p>

        {posts.length !== 0
          && <Sort target={postObj} onChange={sort} />
        }
      </div>

      <div>
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  postObj: PropTypes.object.isRequired,
  sort: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired
}

function mapStateToProps (state, ownProps) {
  const { postObj } = state.misc
  const { posts } = ownProps
  return { postObj, posts }
}

function mapDispatchToProps (dispatch) {
  return {
    sort: e => dispatch(sortPosts(e.target.value)),
    toggleEditor: obj => dispatch(togglePostEditor(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
