import React from 'react'
import {Button} from 'antd'
import {useHistory} from 'react-router-dom'
import {TODO_ROUTE} from '../utils/consts'


const NotFound = () => {

  const history = useHistory()

  return (
    <div className='flex justify-center align-center' style={{height: window.innerHeight}}>
      <div className='text-center' style={{marginTop: -24}}>
        <div style={{fontSize: '30vh'}}>
          404
        </div>
        <div style={{opacity: 0.4, fontSize: '3.5rem'}}>
          Упс! Тут ничего нет...
        </div>
        <Button
          type='primary'
          onClick={() => history.push(TODO_ROUTE)}>
          На главную
        </Button>
      </div>
    </div>
  )
}

export default NotFound