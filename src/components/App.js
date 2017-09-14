import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { sortPosts } from '../actions'
import Home from './Home'
import Category from './Category'
import Post from './Post'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Readable</h1>

        <Route exact path='/' render={() => (
          <Home {...this.props} />
        )} />

        <Route path='/categories/:category' render={routeProps => (
          <Category {...this.props} {...routeProps} />
        )} />

        <Route path='/posts/:postId' render={routeProps => (
          <Post {...this.props} {...routeProps} />
        )} />
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const categories = Object.keys(state.categories)
  const posts = Object.keys(state.posts)
  const sortKey = state.misc.sortPosts

  return {
    categories: categories.map(c => state.categories[c]),
    posts: posts.map(p => state.posts[p]).sort(sortBy(sortKey)),
    selectedSortKey: sortKey
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sortPosts: e => dispatch(sortPosts(e.target.value))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
