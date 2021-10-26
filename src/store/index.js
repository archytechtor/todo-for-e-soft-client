import UserStore from './UserStore'
import TodoStore from './TodoStore'

export const store = {
  user: new UserStore(),
  todo: new TodoStore()
}