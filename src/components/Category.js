// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// local module imports
import PostItem from './PostItem'
import Sort from './Sort'

class Category extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    sortPosts: PropTypes.func,
    postObj: PropTypes.object
  }

  render () {
    const { category, posts, sortPosts, postObj } = this.props

    return (
      <div>
        <Link to='/'>Home</Link>
        <h2>{category}</h2>
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

function mapStateToProps (state, ownProps) {
  const { category } = ownProps.match.params
  const posts = ownProps.posts.filter(p => p.category === category)

  return { category, posts }
}

export default connect(mapStateToProps)(Category)
