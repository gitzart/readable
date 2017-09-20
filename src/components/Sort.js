import React from 'react'
import PropTypes from 'prop-types'

function Sort ({ target, onChange }) {
  const { currentOption, options } = target

  return (
    <div className='sort-btn'>
      <span>sort by </span>
      <select value={currentOption} onChange={onChange}>
        {options.map(({ value, label }, key) => (
          <option key={key} value={value}>{label}</option>
        ))}
      </select>
    </div>
  )
}

Sort.propTypes = {
  target: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Sort
