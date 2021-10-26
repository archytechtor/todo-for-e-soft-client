import React from 'react'
import {observer} from 'mobx-react'
import {Context} from '../../index'
import {Button, Card, Col, Row, Space, Tooltip} from 'antd'
import TodoAvatar from '../todo/TodoAvatar'
import {getTodo} from '../../http/todoAPI'
import Icon from './icons/Icon'
import {createRandomUser, getAllUsers} from '../../http/userAPI'


const TopMenu = observer(({page}) => {

  const {todo} = React.useContext(Context)
  const {user} = React.useContext(Context)


  return (
    <Row className='mb-3'>
      <Col span={24}>
        <Card>
          <Row>
            <Col span={20}>
              <Space size={20}>
                {
                  page === 'todo'
                    ?
                    <>
                      <Tooltip title='Создать новую задачу'>
                        <Button
                          size='large'
                          type='primary'
                          onClick={() => todo.setModalVisible(true)}
                          icon={<Icon type='regular' name='plus'/>}
                        />
                      </Tooltip>
                      <Tooltip title='Обновить список задач'>
                        <Button
                          size='large'
                          onClick={() => getTodo()}
                          icon={<Icon type='regular' name='sync-alt'/>}
                        />
                      </Tooltip>
                    </>
                    :
                    <>
                      <Tooltip title='Добавить рандомного пользователя'>
                        <Button
                          size='large'
                          type='primary'
                          onClick={() => createRandomUser()}
                          icon={<Icon type='regular' name='plus'/>}
                        />
                      </Tooltip>
                      <Tooltip title='Обновить список пользователей'>
                        <Button
                          size='large'
                          onClick={() => getAllUsers()}
                          icon={<Icon type='regular' name='sync-alt'/>}
                        />
                      </Tooltip>
                    </>
                }
              </Space>
            </Col>
            <Col span={4} className='text-right'>
              <TodoAvatar user={user}/>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
})

export default TopMenu