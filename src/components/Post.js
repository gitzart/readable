import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllComments } from '../actions'
import PostItem from './PostItem'
import Comment from './Comment'

class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    postId: PropTypes.string.isRequired
  }

  componentDidMount = () => {
    const { postId, loadComments } = this.props
    loadComments(postId)
  }

  render () {
    const { post } = this.props

    return (
      <div>
        <Link to='/'>Home</Link>
        {post && <PostItem post={post} />}
        <hr />
        {post && <Comment parentId={post.id} />}
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const postId = ownProps.match.params.postId

  return {
    post: ownProps.posts.filter(p => p.id === postId)[0],
    postId
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadComments: post => dispatch(getAllComments(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
