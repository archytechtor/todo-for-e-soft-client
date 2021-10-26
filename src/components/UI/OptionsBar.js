import React from 'react'
import {useHistory} from 'react-router-dom'
import {Context} from '../../index'
import {LOGIN_ROUTE} from '../../utils/consts'
import {Tooltip} from 'antd'
import Icon from './icons/Icon'

const OptionsBar = ({theme, setTheme}) => {

  const {user} = React.useContext(Context)
  const {todo} = React.useContext(Context)
  const history = useHistory()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
    localStorage.removeItem('access')
    history.push(LOGIN_ROUTE)
  }

  return (
    <div className='options-wrapper'>
      {/*<Tooltip title={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'} placement='right'>*/}
      {/*  <div className='options-button' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>*/}
      {/*    <Icon type='solid' name={theme === 'dark' ? 'sun' : 'moon-stars'}/>*/}
      {/*  </div>*/}
      {/*</Tooltip>*/}
      <Tooltip title='Выйти' placement='right'>
        <div className='options-button' onClick={() => todo.resetByDefault() & logOut()}>
          <Icon type='solid' name='power-off'/>
        </div>
      </Tooltip>
    </div>
  )
}

export default OptionsBar