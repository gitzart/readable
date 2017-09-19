// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getAllCategories())
    dispatch(getAllPosts())
  }

  render() {
    const {
      categories, posts, postInAction, currentPostAction
    } = this.props

    return (
      <div>
        <h1>Readable</h1>

        <ul>
          {categories.map(c => (
            <li key={c.name}>
              <Link to={`/${c.path}`}>{c.name}</Link>
            </li>
          ))}
        </ul>

        <hr />

        <Route exact path='/' render={() => (
          <PostList posts={posts} />
        )} />

        <Route exact path='/:category' render={({ match }) => (
          <Category posts={posts} match={match} />
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

export default withRouter(connect(mapStateToProps)(App))
