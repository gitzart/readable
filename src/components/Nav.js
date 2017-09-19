import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Nav ({ navList, match }) {
  const defaultPath = '/'
  const currentPath = match.params.category || defaultPath

  return (
    <nav>
      <div className='nav-item'>
        {currentPath === defaultPath
          ? <span className='current-path'>home</span>
          : <Link to='/'>home</Link>
        }
      </div>

      {navList.map(item => (
        <div className='nav-item' key={item.name}>
          {currentPath === item.path
            ? <span className='current-path'>{item.name}</span>
            : <Link to={`/${item.path}`}>{item.name}</Link>
          }
        </div>
      ))}
    </nav>
  )
}

Nav.propTypes = {
  navList: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired
}

export default Nav
