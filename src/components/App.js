// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import sortBy from 'sort-by'

// local module imports
import { getAllCategories, getAllPosts } from '../actions'
import PostDetail from './PostDetail'
import PostList from './PostList'
import PostEditor from './PostEditor'
import CommentEditor from './CommentEditor'
import Nav from './Nav'

class App extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    postInAction: PropTypes.object,
    currentPostAction: PropTypes.string,
    commentInAction: PropTypes.object,
    currentCommentAction: PropTypes.string
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getAllCategories())
    dispatch(getAllPosts())
  }

  getCategoryPosts = category => (
    this.props.posts.filter(p => p.category === category)
  )

  getPost = (category, postId) => (
    this.props.posts.filter(p => (
      p.id === postId && p.category === category
    ))[0]
  )

  render() {
    const {
      categories, posts, postInAction, currentPostAction,
      commentInAction, currentCommentAction
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

        <Route path='/:category/:postId' render={({ match }) => {
          const { category, postId } = match.params
          const post = this.getPost(category, postId)

          return (
            <div>
              <Nav match={match} navList={categories} />
              <PostDetail post={post} match={match} />
            </div>
          )
        }} />

        <PostEditor
          action={currentPostAction}
          post={postInAction}
        />

        <CommentEditor
          action={currentCommentAction}
          comment={commentInAction}
          parentPost={postInAction}
        />
      </main>
    )
  }
}

function mapStateToProps (state, ownProps) {
  let { categories, posts } = state
  const {
    postObj, postInAction, currentPostAction,
    commentInAction, currentCommentAction
  } = state.misc

  posts = Object
    .keys(posts)
    .map(key => posts[key])
    .filter(post => !post.deleted)
    .sort(sortBy(postObj.currentOption))

  return {
    categories, posts, postInAction, currentPostAction,
    commentInAction, currentCommentAction
  }
}

export default withRouter(connect(mapStateToProps)(App))
