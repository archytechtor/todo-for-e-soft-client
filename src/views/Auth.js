import React from 'react'
import {observer} from 'mobx-react'
import {Context} from '../index'
import {Link, useLocation, useHistory, Redirect} from 'react-router-dom'
import {LOGIN_ROUTE, REGISTRATION_ROUTE, TODO_ROUTE} from '../utils/consts'
import {login, registration} from '../http/userAPI'
import {Button, Card, Form, Input} from 'antd'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import {message} from '../components/UI/message'


const Auth = observer(() => {

  const {user} = React.useContext(Context)
  const location = useLocation()
  const history = useHistory()
  const isLogin = location.pathname === LOGIN_ROUTE

  const [name, setName] = React.useState('')
  const [surname, setSurname] = React.useState('')
  const [patronymic, setPatronymic] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')


  const submit = async () => {

    let data

    try {

      if (isLogin) {
        data = await login(username, password)
      } else {
        data = await registration(surname, name, patronymic, username, password)
      }

      if (data) {
        user.setUser(data)
        user.setIsAuth(true)
        history.push(TODO_ROUTE)
      }

    } catch (e) {
      message('error', e.response.data.message)
    }
  }

  if (user.isAuth) {
    return <Redirect to={TODO_ROUTE}/>
  }

  return (
    <div className='h-screen flex justify-center align-center p-5'>
      <Card className='p-5 w-80'>
        {
          <Form onFinish={submit}>
            {
              !isLogin &&
              <>
                <Form.Item
                  name='surname'
                  rules={[{
                    required: true,
                    message: 'Необходимо ввести фамилию!'
                  }]}
                >
                  <Input
                    value={surname}
                    onChange={e => setSurname(e.target.value.trim())}
                    placeholder='Фамилия'
                  />
                </Form.Item>

                <Form.Item
                  name='name'
                  rules={[{
                    required: true,
                    message: 'Необходимо ввести имя!'
                  }]}
                >
                  <Input
                    value={name}
                    onChange={e => setName(e.target.value.trim())}
                    placeholder='Имя'
                  />
                </Form.Item>
                <Form.Item
                  name='patronymic'
                  rules={[{
                    required: true,
                    message: 'Необходимо ввести отчество!'
                  }]}
                >
                  <Input
                    value={patronymic}
                    onChange={e => setPatronymic(e.target.value.trim())}
                    placeholder='Отчество'
                  />
                </Form.Item>
              </>
            }

            <Form.Item
              name='username'
              rules={[{
                required: true,
                message: 'Необходимо ввести имя пользователя!'
              }]}
            >
              <Input
                value={username}
                onChange={e => setUsername(e.target.value.trim())}
                placeholder='Имя пользователя'
                prefix={<UserOutlined/>}
              />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[{
                required: true,
                message: 'Необходимо ввести пароль!'
              }]}
            >
              <Input.Password
                value={password}
                onChange={e => setPassword(e.target.value.trim())}
                type='password'
                placeholder='Пароль'
                prefix={<LockOutlined/>}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
              >
                {isLogin ? 'Войти' : 'Создать'}
              </Button>
            </Form.Item>

            <Form.Item style={{textAlign: 'center'}}>
              {
                isLogin
                  ? <>Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Регистрация</Link></>
                  : <>Есть аккаунт? <Link to={LOGIN_ROUTE}>Авторизация</Link></>
              }
            </Form.Item>
          </Form>
        }
      </Card>
    </div>
  )
})

export default Auth