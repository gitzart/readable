import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostItem from './PostItem'
import Sort from './Sort'

class Home extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    sortPosts: PropTypes.func,
    postObj: PropTypes.object
  }

  render () {
    const { posts, sortPosts, postObj } = this.props

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
}

export default Home
