import {$authHost} from './index'
import {store} from '../store'
import {message} from '../components/UI/message'


const todo = store.todo
const user = store.user


export const createTodo = async (title, description, priority, status, sla, assignee) => {
  todo.setLoading(true)
  await $authHost.post(
    'api/todo/create',
    {
      title,
      description,
      priority,
      status,
      sla,
      assignee
    })
    .then(response => {
      message(
        response.data?.success ? 'success' : 'error',
        response.data?.success || response.data?.error
      )
      todo.setLoading(false)
    })
    .catch(e => {
      console.log(e)
      message('error', 'Ошибка', e)
      todo.setLoading(false)
    })
}

export const getTodo = async () => {
  todo.setLoading(true)
  await $authHost.post(
    'api/todo/get',
    {
      pageSize: todo.pageSize,
      page: todo.page,
      sorter: todo.sorter,
      filter: todo.filter,
    })
    .then(response => {
      todo.setTodoList(response.data)
      todo.setLoading(false)
    })
    .catch(e => {
      console.log(e)
      message('error', 'Ошибка', e)
      todo.setLoading(false)
    })
}

export const updateTodo = async (id, title, description, priority, status, sla, assignee) => {
  todo.setLoading(true)
  await $authHost.put(
    'api/todo/update',
    {
      id,
      title,
      description,
      priority,
      status,
      sla,
      assignee
    })
    .then(response => {
      message('success', response.data?.success)
      todo.setLoading(false)
    })
    .catch(e => {
      console.log(e)
      message('error', 'Ошибка', e)
      todo.setLoading(false)
    })
}

export const deleteTodo = async (id) => {
  todo.setLoading(true)
  await $authHost.post('api/todo/delete', {id})
    .then(response => {
      message('success', response.data?.success)
      todo.setLoading(false)
    })
    .catch(e => {
      console.log(e)
      message('error', 'Ошибка', e)
      todo.setLoading(false)
    })
}

export const getWorkers = async () => {
  user.setLoading(true)
  await $authHost.get('api/user/workers')
    .then(response => {
      todo.setWorkers(response.data)
      user.setLoading(false)
    })
    .catch(e => {
      console.log(e)
      message('error', 'Ошибка', e)
      user.setLoading(false)
    })
}
