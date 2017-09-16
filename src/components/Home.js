import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostList from './PostList'

class Home extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render () {
    return (
      <PostList posts={this.props.posts} />
    )
  }
}

export default Home
