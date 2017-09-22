// third-party module imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import sortBy from 'sort-by'

// local module imports
import PostItem from './PostItem'
import CommentList from './CommentList'

function PostDetail ({ post, comments }) {
  return post
    ? <div>
        <PostItem post={post} type='detail' />
        <CommentList comments={comments} parentPost={post} />
      </div>
    : <div></div>
}

PostDetail.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
}

function mapStateToProps (state, ownProps) {
  const { postId } = ownProps.match.params
  const { post } = ownProps
  const { commentObj } = state.misc
  let { comments } = state

  comments = Object
    .keys(state.comments)
    .map(key => comments[key])
    .filter(c => c.parentId === postId && !c.deleted)
    .sort(sortBy(commentObj.currentOption))

  return { post, comments }
}

export default connect(mapStateToProps)(PostDetail)
