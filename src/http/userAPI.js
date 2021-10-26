import {$authHost, $host} from './index'
import jwtDecode from 'jwt-decode'
import {message} from '../components/UI/message'
import {store} from '../store'
import randoms from '../utils/randoms.json'


const user = store.user


export const registration = async (surname, name, patronymic, username, password) => {
  const {data} = await $host.post(
    'api/user/registration',
    {
      surname,
      name,
      patronymic,
      username,
      password
    }
  )
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

export const login = async (username, password) => {
  const {data} = await $host.post(
    'api/user/login',
    {
      username,
      password
    }
  )
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

export const check = async () => {
  try {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
  } catch (e) {
    localStorage.removeItem('token')
    localStorage.removeItem('access')
  }
}

export const getAllUsers = async () => {
  !user.leadersOnly && user.setLoading(true)
  await $authHost.post(
    'api/user/all',
    {
      pageSize: user.pageSize,
      page: user.page,
      sorter: user.sorter,
      filter: user.filter,
      leadersOnly: user.leadersOnly
    }
  )
    .then(response => {
      user.leadersOnly
        ? user.setLeaders(response.data)
        : user.setAllUsers(response.data)
      !user.leadersOnly && user.setLoading(false)
    })
    .catch(e => {
      console.log(e)
      message('error', 'Ошибка', e)
      !user.leadersOnly && user.setLoading(false)
    })
}

export const updateUser = async (id, name, surname, patronymic, username, leaderId) => {
  user.setLoading(true)
  await $authHost.put(
    'api/user/update',
    {
      id,
      name,
      surname,
      patronymic,
      leaderId
    })
    .then(response => {
      message('success', response.data?.success)
      user.setLoading(false)
    })
    .catch(e => {
      console.log(e)
      message('error', 'Ошибка', e)
      user.setLoading(false)
    })
}

export const deleteUser = async (id) => {
  user.setLoading(true)
  await $authHost.post('api/user/delete', {id})
    .then(response => {
      message('success', response.data?.success)
      user.setLoading(false)
      getAllUsers()
    })
    .catch(e => {
      console.log(e)
      message('error', 'Ошибка', e)
      user.setLoading(false)
    })
}

export const createRandomUser = async () => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const transliterate = (word) => {
    return word.split('').map(char => randoms.abc[char] || char).join('')
  }

  const surname = randoms.users.surnames[getRandomInt(randoms.users.surnames.length)]
  const name = randoms.users.names[getRandomInt(randoms.users.names.length)]
  const patronymic = randoms.users.patronymics[getRandomInt(randoms.users.patronymics.length)]
  const username = `${transliterate(surname)}-${transliterate(name[0])}${transliterate(patronymic[0])}`.toLowerCase()
  const password = '12345678'

  user.setLoading(true)

  await $host.post(
    'api/user/registration',
    {
      surname,
      name,
      patronymic,
      username,
      password
    }
  )
    .then(response => {
      console.log(response.data)
      message('success', 'Пользователь создан успешно')
      getAllUsers()
      user.setLoading(false)
    })
    .catch(e => {
      console.log(e)
      message('error', 'Ошибка', e)
      user.setLoading(false)
    })
}
