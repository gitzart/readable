// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import sortBy from 'sort-by'

// local module imports
import { getAllCategories, getAllPosts } from '../actions'
import Post from './Post'
import PostList from './PostList'
import PostEditor from './PostEditor'
import Nav from './Nav'

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

  getCategoryPosts = (category) => (
    this.props.posts.filter(p => p.category === category)
  )

  render() {
    const {
      categories, posts, postInAction, currentPostAction
    } = this.props

    return (
      <main>
        <h1>Readable</h1>

        <Route exact path='/' render={({ match }) => (
          <div>
            <Nav match={match} navList={categories} />
            <PostList posts={posts} />
          </div>
        )} />

        <Route exact path='/:category' render={({ match }) => {
          const { category } = match.params
          return (
            <div>
              <Nav match={match} navList={categories} />
              <PostList posts={this.getCategoryPosts(category)} />
            </div>
          )
        }} />

        <Route path='/:category/:postId' render={routeProps => (
          <div>
            <Nav match={routeProps.match} navList={categories} />
            <Post {...this.props} {...routeProps} />
          </div>
        )} />

        <PostEditor task={currentPostAction} post={postInAction} />
      </main>
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
