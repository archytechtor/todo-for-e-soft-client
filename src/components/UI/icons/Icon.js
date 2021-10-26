import React from 'react'
import icons from './icons.json'

const Icon = (props) => {

  const classes = {
    icon: props.spin ? 'anticon anticon-spin' : 'anticon'
  }

  let viewBox = icons[props.type][props.name]['view_box']
  let path = icons[props.type][props.name]['path']

  return (
    <i className={classes.icon} style={props.style}>
      <svg
        viewBox={viewBox}
        width={props.size ? props.size : '1.125rem'}
        height={props.size ? props.size : '1.125rem'}
        fill={props.color ? props.color : 'currentColor'}
      >
        <path d={path}/>
      </svg>
    </i>
  )
}

export default Icon