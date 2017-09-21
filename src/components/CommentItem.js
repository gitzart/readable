// third-party module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Time from 'react-time'
import CaretUp from 'react-icons/lib/fa/caret-up'
import CaretDown from 'react-icons/lib/fa/caret-down'
import MoreHoriz from 'react-icons/lib/md/more-horiz'

// local module imports
import {
  toggleCommentEditor, removeComment, voteComment
} from '../actions'

class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
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
    const { comment, remove, vote, toggleEditor } = this.props
    const { actionOptions } = this.state


    return (
      <div className='comment-item'>
        <p className='comment-item__body'>{comment.body}</p>

        <div className='comment-item__bottom'>
          <div className='comment-item__vote'>
            <button
              className='comment-item__vote-item icon'
              onClick={() => vote(comment.id, 'upVote')}
            >
              <CaretUp size='30' />
            </button>
            <span className='comment-item__vote-item'>
              {comment.voteScore}
            </span>
            <button
              className='comment-item__vote-item icon'
              onClick={() => vote(comment.id, 'downVote')}
            >
              <CaretDown size='30' />
            </button>
          </div>

          <div className='comment-item__meta'>
            <span className='comment-item__meta-item'>
              <span className='author'>{comment.author} wrote</span>
            </span>
            <Time
              className='comment-item__meta-item'
              value={comment.timestamp}
              format={dtFormat}
            />
          </div>
        </div>

        <div
          className='comment-item__actions'
          style={{ backgroundColor: actionOptions && '#353535' }}
        >
          <button className='icon' onClick={this.toggleActionOptions}>
            <MoreHoriz size='30' />
          </button>

          {actionOptions && (
            <div className='comment-item__actions-options'>
              <div onClick={() => {
                toggleEditor({ option: true, action: 'edit', comment })
                this.toggleActionOptions()
              }}>
                edit
              </div>
              <div onClick={() => remove(comment.id)}>delete</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return { comment: ownProps.comment }
}

function mapDispatchToProps (dispatch) {
  return {
    remove: commentId => dispatch(removeComment(commentId)),
    vote: (commentId, option) => dispatch(voteComment(commentId, option)),
    toggleEditor: (obj) => dispatch(toggleCommentEditor(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)
