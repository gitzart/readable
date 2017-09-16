import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PostList from './PostList'

class Category extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render () {
    const { category, posts } = this.props

    return (
      <div>
        <Link to='/'>Home</Link>
        <h2>{category}</h2>
        <PostList posts={posts} />
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
