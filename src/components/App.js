import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './Home'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Readable</h1>

        <Route exact path='/' render={() => (
          <Home {...this.props} />
        )} />
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

export default withRouter(connect(mapStateToProps)(App))
