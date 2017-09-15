// third-party module imports
import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import sortBy from 'sort-by'

// local module imports
import { getAllCategories, getAllPosts, sortPosts } from '../actions'
import Home from './Home'
import Category from './Category'
import Post from './Post'

class App extends Component {
  componentDidMount = () => {
    this.props.loadCategories()
    this.props.loadPosts()
  }

  render() {
    return (
      <div>
        <h1>Readable</h1>

        <ul>
          {this.props.categories.map(c => (
            <li key={c.name}>
              <Link to={`/categories/${c.path}`}>{c.name}</Link>
            </li>
          ))}
        </ul>

        <hr />

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
  let { categories, posts } = state
  const { postObj } = state.misc

  categories = Object.keys(categories).map(key => categories[key])
  posts = Object
    .keys(posts)
    .map(key => posts[key])
    .sort(sortBy(postObj.currentOption))

  return { postObj, categories, posts }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: () => dispatch(getAllCategories()),
    loadPosts: () => dispatch(getAllPosts()),
    sortPosts: e => dispatch(sortPosts(e.target.value))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
