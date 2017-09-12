import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    const { categories, posts } = this.props

    return (
      <div>
        <h1>Readable</h1>

        <ul>
          {categories.map(c => (
            <li key={c.name}>{c.name}</li>
          ))}
        </ul>

        <hr />

        <ul>
          {posts.map(p => (
            <li key={p.id}>{p.body}</li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const categories = Object.keys(state.categories)
  const posts = Object.keys(state.posts)

  return {
    categories: categories.map(c => state.categories[c]),
    posts: posts.map(p => state.posts[p])
  }
}

export default connect(mapStateToProps)(App)
