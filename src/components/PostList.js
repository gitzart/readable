// third-party module imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateIcon from 'react-icons/lib/md/create'

// local module imports
import { sortPosts, togglePostEditor } from '../actions'
import Sort from './Sort'
import PostItem from './PostItem'

function PostList (props) {
  const { posts, postObj, sort, toggleEditor } = props

  return (
    <div>
      <div
        className='editor-trigger'
        onClick={() => toggleEditor({ option: true, action: 'create' })}
      >
        <CreateIcon size='20' /> Write something new here...
      </div>

      <Sort target={postObj} onChange={sort} />

      <div>
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

PostList.propTypes = {
  postObj: PropTypes.object.isRequired,
  sort: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired
}

function mapStateToProps (state, ownProps) {
  return { postObj: state.misc.postObj }
}

function mapDispatchToProps (dispatch) {
  return {
    sort: e => dispatch(sortPosts(e.target.value)),
    toggleEditor: obj => dispatch(togglePostEditor(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
