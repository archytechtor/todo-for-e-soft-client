import React from 'react'
import {Spin} from 'antd'
import Icon from './icons/Icon'

const Loader = () => {
  return (
    <div
      className='flex justify-center align-center'
      style={{height: window.innerHeight}}
    >
      <Spin
        indicator={
          <Icon
            type='light'
            name='spinner'
            size={72}
            color='var(--primary)'
            spin
          />
        }
      />
    </div>
  )
}

export default Loader