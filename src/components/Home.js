import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Home extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render () {
    const { categories, posts } = this.props

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

        <ul>
          {posts.map(p => (
            <li key={p.id}>
              <Link to={`/posts/${p.id}`}>{p.title} </Link>
              <span>by {p.author}</span>
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
