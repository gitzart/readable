import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Category extends Component {
  static propTypes = {
    category: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render () {
    const { category, posts } = this.props

    return (
      <div>
        <h3>{category}</h3>
        <Link to='/'>Home</Link>

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

function mapStateToProps (state, ownProps) {
  const category = ownProps.match.params.category

  return {
    category,
    posts: ownProps.posts.filter(p => p.category === category)
  }
}

export default connect(mapStateToProps)(Category)
