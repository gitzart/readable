import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Category extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired
  }

  render () {
    const { posts } = this.props
    const category = this.props.match.params.category

    return (
      <div>
        <h3>{category}</h3>
        <Link to='/'>Home</Link>

        <ul>
          {posts.filter(p => p.category === category).map(p => (
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

export default Category
