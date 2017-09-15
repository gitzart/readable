// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// local module imports
import { getAllComments, sortComments } from '../actions'
import PostItem from './PostItem'
import Comment from './Comment'
import Sort from './Sort'

class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    postId: PropTypes.string.isRequired,
    loadComments: PropTypes.func.isRequired,
    sortComments: PropTypes.func,
    commentObj: PropTypes.object
  }

  componentDidMount = () => {
    const { postId, loadComments } = this.props
    loadComments(postId)
  }

  render () {
    const { post, sortComments, commentObj } = this.props

    return (
      <div>
        <Link to='/'>Home</Link>
        {post && <PostItem post={post} />}

        <hr />
        <Sort target={commentObj} onChange={sortComments} />

        {post && <Comment parentId={post.id} />}
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { category, postId } = ownProps.match.params
  const { commentObj } = state.misc
  const post = ownProps.posts
    .filter(p => p.id === postId && p.category === category)[0]

  return { postId, post, commentObj }
}

function mapDispatchToProps (dispatch) {
  return {
    loadComments: post => dispatch(getAllComments(post)),
    sortComments: e => dispatch(sortComments(e.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
