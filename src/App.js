import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {observer} from 'mobx-react'
import AppRouter from './router/AppRouter'
import {check} from './http/userAPI'
import {Context} from './index'

import ruRU from 'antd/lib/locale/ru_RU'
import moment from 'moment'
import 'moment/locale/ru'

import {ConfigProvider, Layout} from 'antd'

import './assets/css/App.css'
import Loader from './components/UI/Loader'
import NavBar from './components/UI/NavBar'
import OptionsBar from './components/UI/OptionsBar'
import Logo from './components/UI/logo/Logo'
import useBodyClass from './utils/useBodyClass'


moment.locale('ru')


const App = observer(() => {

  const {Content, Sider} = Layout
  const {user} = React.useContext(Context)
  const [loading, setLoading] = React.useState(true)
  const [theme, setTheme] = React.useState('dark')

  useBodyClass(`theme-${theme}`)

  React.useEffect(() => {
    check().then(data => {
      if (data) {
        user.setUser(data)
        user.setIsAuth(true)
      }
    }).finally(() => setLoading(false))
  })

  if (loading) {
    return (
      <Loader/>
    )
  }

  return (
    <ConfigProvider locale={ruRU}>
      <BrowserRouter>
        <Layout className={`theme-${theme}`}>
          {
            user.isAuth &&
            <Sider collapsed={true}>
              <Logo className='my-5' href='https://github.com/archytechtor/todo-for-e-soft' target='__blank'/>
              <NavBar/>
              <OptionsBar theme={theme} setTheme={setTheme}/>
            </Sider>
          }
          <Content>
            <AppRouter/>
          </Content>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  )
})

export default App
