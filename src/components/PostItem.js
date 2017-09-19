// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Time from 'react-time'
import CaretUp from 'react-icons/lib/fa/caret-up'
import CaretDown from 'react-icons/lib/fa/caret-down'
import MoreHoriz from 'react-icons/lib/md/more-horiz'

// local module imports
import { togglePostEditor, removePost, votePost } from '../actions'

class PostItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    type: PropTypes.string,
    remove: PropTypes.func.isRequired,
    vote: PropTypes.func.isRequired,
    toggleEditor: PropTypes.func.isRequired
  }

  state = { actionOptions: false }

  toggleActionOptions = () => {
    this.setState(state => {
      const option = !state.actionOptions
      return { actionOptions: option }
    })
  }

  render () {
    const dtFormat = `MMM DD'YY [at] HH:mm`
    const { post, type, remove, vote, toggleEditor } = this.props
    const { actionOptions } = this.state

    return (
      <div className='post-item detail'>
        {type === 'detail'
          ? <h4 className='post-item__title detail'>{post.title}</h4>
          : <Link to={`/${post.category}/${post.id}`}>
              <h4 className='post-item__title'>{post.title}</h4>
            </Link>
        }

        <p className='post-item__body'>{post.body}</p>

        <div className='post-item__bottom'>
          <div className='post-item__vote'>
            <button
              className='post-item__vote-item icon'
              onClick={() => vote(post.id, 'upVote')}
            >
              <CaretUp size='30' />
            </button>
            <span className='post-item__vote-item'>
              {post.voteScore}
            </span>
            <button
              className='post-item__vote-item icon'
              onClick={() => vote(post.id, 'downVote')}
            >
              <CaretDown size='30' />
            </button>
          </div>

          <div className='post-item__meta'>
            <span className='post-item__meta-item'>
              by <span className='author'>{post.author}</span>
            </span>
            <Time
              className='post-item__meta-item'
              value={post.timestamp}
              format={dtFormat}
            />
          </div>
        </div>

        <div
          className='post-item__actions'
          style={{backgroundColor: actionOptions && '#353535' }}
        >
          <button className='icon' onClick={this.toggleActionOptions}>
            <MoreHoriz size='30' />
          </button>

          {actionOptions && (
            <div className='post-item__actions-options'>
              <div onClick={() => (
                toggleEditor({ option: true, action: 'edit', post })
              )}>
                edit
              </div>
              <div onClick={() => remove(post.id)}>delete</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { post, type } = ownProps
  return { post, type }
}

function mapDispatchToProps (dispatch) {
  return {
    remove: postId => dispatch(removePost(postId)),
    vote: (postId, option) => dispatch(votePost(postId, option)),
    toggleEditor: (obj) => dispatch(togglePostEditor(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
