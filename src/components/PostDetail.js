// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import sortBy from 'sort-by'

// local module imports
import { getAllComments } from '../actions'
import PostItem from './PostItem'
import CommentList from './CommentList'

class PostDetail extends Component {
  static propTypes = {
    post: PropTypes.object,
    postId: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  componentDidMount = () => (
    this.props.dispatch(getAllComments(this.props.postId))
  )

  render () {
    const { post, comments } = this.props
    return post
      ? <div>
          <PostItem post={post} type='detail' />
          <CommentList comments={comments} parentPost={post} />
        </div>
      : <div></div>
  }
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

  return { post, postId, comments }
}

export default connect(mapStateToProps)(PostDetail)
