import {
  TODO_ROUTE,
  SETTINGS_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  NOT_FOUND_404_ROUTE
} from '../utils/consts'
import Auth from '../views/Auth'
import NotFound from '../views/NotFound'
import Todo from '../views/Todo'
import Settings from '../views/Settings'


export const authRoutes = [
  {
    path: TODO_ROUTE,
    Component: Todo
  },
  {
    path: SETTINGS_ROUTE,
    Component: Settings
  },
]

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: NOT_FOUND_404_ROUTE,
    Component: NotFound
  }
]