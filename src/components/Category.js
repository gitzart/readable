import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PostItem from './PostItem'

class Category extends Component {
  static propTypes = {
    category: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render () {
    const { category, posts, sortPosts, selectedSortKey } = this.props

    return (
      <div>
        <Link to='/'>Home</Link>
        <h3>{category}</h3>

        <div>
          <span>Sort by </span>
          <select value={selectedSortKey} onChange={sortPosts}>
            <option value='-voteScore'>Vote Score</option>
            <option value='title'>Title</option>
            <option value='-timestamp'>Date</option>
          </select>
        </div>

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
  const category = ownProps.match.params.category

  return {
    category,
    posts: ownProps.posts.filter(p => p.category === category)
  }
}

export default connect(mapStateToProps)(Category)
