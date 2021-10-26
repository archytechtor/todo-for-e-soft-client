import React from 'react'
import {observer} from 'mobx-react'
import {
  NavLink,
  useHistory
} from 'react-router-dom'
import {
  TODO_ROUTE,
  SETTINGS_ROUTE
} from '../../utils/consts'
import {Menu} from 'antd'
import Icon from './icons/Icon'


const NavBar = observer(() => {

  const history = useHistory()
  const [selected, setSelected] = React.useState(history.location.pathname)

  const menuItems = [
    {
      name: 'Задачи',
      path: TODO_ROUTE,
      iconName: 'check-double',
      iconType: 'solid'
    },
    {
      name: 'Настройки пользователей',
      path: SETTINGS_ROUTE,
      iconName: 'cog',
      iconType: 'solid'
    }
  ]

  React.useEffect(() => {
    setSelected(history.location.pathname)
  }, [history.location.pathname])

  return (
    <div className='ant-menu-wrapper'>
      <Menu
        style={{minHeight: '100vh'}}
        selectedKeys={selected}
      >
        {
          menuItems.map(item => {
            return (
              <Menu.Item
                 key={item.path}
                 icon={<Icon type={item.iconType} name={item.iconName}/>}
                 onClick={() => setSelected(history.location.pathname)}
              >
                <NavLink to={item.path} exact/>
                {item.name}
              </Menu.Item>
            )
          })
        }
      </Menu>
    </div>
  )
})

export default NavBar