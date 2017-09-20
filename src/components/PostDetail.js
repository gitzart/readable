import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllComments } from '../actions'
import PostItem from './PostItem'

class PostDetail extends Component {
  static propTypes = {
    post: PropTypes.object,
    postId: PropTypes.string.isRequired
  }

  componentDidMount = () => (
    this.props.dispatch(getAllComments(this.props.postId))
  )

  render () {
    const { post } = this.props
    return post
      ? <PostItem post={post} type='detail' />
      : <div></div>
  }
}

function mapStateToProps (state, ownProps) {
  const { postId } = ownProps.match.params
  const { post } = ownProps
  return { post, postId }
}

export default connect(mapStateToProps)(PostDetail)
