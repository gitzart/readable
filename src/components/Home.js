import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Time from 'react-time'

class Home extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    sortPosts: PropTypes.func.isRequired,
    selectedSortKey: PropTypes.string
  }

  render () {
    const { categories, posts, sortPosts, selectedSortKey } = this.props

    return (
      <div>
        <ul>
          {categories.map(c => (
            <li key={c.name}>
              <Link to={`/categories/${c.path}`}>{c.name}</Link>
            </li>
          ))}
        </ul>

        <hr />

        <div>
          <span>Sort by </span>
          <select value={selectedSortKey} onChange={sortPosts}>
            <option value='-voteScore'>Vote Score</option>
            <option value='title'>Title</option>
            <option value='-timestamp'>Date</option>
          </select>
        </div>

        <ul>
          {posts.map(p => (
            <li key={p.id}>
              <Link to={`/posts/${p.id}`}>
                <h4>{p.title}</h4>
              </Link>
              <div>
                <span>by {p.author} | </span>
                <span>votes {p.voteScore} | </span>
                <span>
                  <Time
                    value={p.timestamp}
                    format={`MMM DD'YY [at] HH:mm`}
                  />
                </span>
              </div>
              <p>{p.body}</p>
              <br />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
