import React from 'react'
import {Avatar, Tooltip} from 'antd'

const TodoAvatar = ({user}) => {

  return (
    <div>
      {
        user.user &&
        <Tooltip title={`Ты авторизован, как ${user.user.shortName}`} placement='right'>
          <Avatar shape='square' style={{backgroundColor: 'var(--primary)'}} size={40}>
            {user.user.shortName.split(' ').map(word => `${word[0]}`)}
          </Avatar>
        </Tooltip>
      }
    </div>
  )
}

export default TodoAvatar