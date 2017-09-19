// third-party module imports
import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import sortBy from 'sort-by'

// local module imports
import { getAllCategories, getAllPosts } from '../actions'
import Category from './Category'
import Post from './Post'
import PostList from './PostList'
import PostEditor from './PostEditor'

class App extends Component {
  componentDidMount = () => {
    this.props.loadCategories()
    this.props.loadPosts()
  }

  render() {
    const { postInAction, currentPostAction } = this.props

    return (
      <div>
        <h1>Readable</h1>

        <ul>
          {this.props.categories.map(c => (
            <li key={c.name}>
              <Link to={`/${c.path}`}>{c.name}</Link>
            </li>
          ))}
        </ul>

        <hr />

        <Route exact path='/' render={() => (
          <PostList posts={this.props.posts} />
        )} />

        <Route exact path='/:category' render={routeProps => (
          <Category {...this.props} {...routeProps} />
        )} />

        <Route path='/:category/:postId' render={routeProps => (
          <Post {...this.props} {...routeProps} />
        )} />

        <PostEditor task={currentPostAction} post={postInAction} />
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  let { categories, posts } = state
  const { postObj, postInAction, currentPostAction } = state.misc

  posts = Object
    .keys(posts)
    .map(key => posts[key])
    .filter(post => !post.deleted)
    .sort(sortBy(postObj.currentOption))

  return { categories, posts, postInAction, currentPostAction }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: () => dispatch(getAllCategories()),
    loadPosts: () => dispatch(getAllPosts())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
