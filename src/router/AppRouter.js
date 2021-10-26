import React from 'react'
import {observer} from 'mobx-react'
import {Context} from '../index'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {
  authRoutes,
  publicRoutes
} from './routes'
import {
  LOGIN_ROUTE,
  NOT_FOUND_404_ROUTE
} from '../utils/consts'


const AppRouter = observer(() => {

  const {user} = React.useContext(Context)

  return (
    <Switch>
      {
        user.isAuth &&
        authRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact/>)
      }
      {
        publicRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact/>)
      }
      <Redirect to={user.isAuth ? NOT_FOUND_404_ROUTE : LOGIN_ROUTE}/>
    </Switch>
  )
})

export default AppRouter