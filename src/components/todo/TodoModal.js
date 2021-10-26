import React from 'react'
import {observer} from 'mobx-react'
import moment from 'moment'
import {Context} from '../../index'
import {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  getWorkers
} from '../../http/todoAPI'
import {
  Button,
  Col,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Tag
} from 'antd'
import {message} from '../UI/message'


const TodoModal = observer(() => {

  const {todo} = React.useContext(Context)
  const {user} = React.useContext(Context)

  const {Option} = Select

  const [id, setId] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [priority, setPriority] = React.useState(0)
  const [status, setStatus] = React.useState('to_do')
  const [sla, setSla] = React.useState(null)
  const [assignee, setAssignee] = React.useState(null)
  const [assigneeName, setAssigneeName] = React.useState('Не назначено')

  const disabled = todo.task && !(
    user.user.id === todo.task.creator.leaderId ||
    user.user.id === todo.task.creator.id
  )

  const submit = async () => {

    if (title.trim() && description.trim() && sla) {
      todo.setModalVisible(false)
      todo.task
        ? await updateTodo(id, title, description, priority, status, sla, assignee)
        : await createTodo(title, description, priority, status, sla, assignee)
      await getTodo()
    } else {
      message(
        'error',
        'Необходимо заполнить все обязательные поля!',
        <p>
          <span className={title ? 'text-success' : 'text-error'}>Заголовок</span><br/>
          <span className={description ? 'text-success' : 'text-error'}>Описание</span><br/>
          <span className={sla ? 'text-success' : 'text-error'}>Дата окончания</span>
        </p>
      )
    }
  }

  const del = async (id) => {
    await deleteTodo(id)
    await getTodo()
    todo.setModalVisible(false)
  }

  const resetStates = () => {
    setTitle('')
    setDescription('')
    setPriority(0)
    setStatus('to_do')
    setSla(null)
    setAssignee(null)
    setAssigneeName('Не назначено')
    todo.setTask(null)
  }

  React.useEffect(() => {
    getWorkers()

    if (todo.task) {
      setId(todo.task.id)
      setTitle(todo.task.title)
      setDescription(todo.task.description)
      setPriority(todo.task.priority)
      setStatus(todo.task.status)
      setSla(moment(new Date(Date.parse(todo.task.sla)), 'DD.MM.YYYY HH:mm'))
      setAssignee(todo.task.assignee ? todo.task.assignee.id : null)
      setAssigneeName(todo.task.assignee ? `${todo.task.assignee.surname} ${todo.task.assignee.name} ${todo.task.assignee.patronymic}` : 'Не назначено')
    }
  }, [todo.modalVisible, todo.task])

  return (
    <Modal
      title=' '
      visible={todo.modalVisible}
      onCancel={() => resetStates() & todo.setModalVisible(false)}
      width={650}
      footer={false}
      afterClose={() => resetStates()}
    >
      <Row gutter={[15, 15]}>
        {
          todo.task &&
          <>
            <Col span={6}>Создатель</Col>
            <Col span={18}>
              {` ${todo.task.creator.surname} ${todo.task.creator.name} ${todo.task.creator.patronymic}`}
            </Col>
            <Col span={6}>Дата создания</Col>
            <Col span={18}>
              {
                new Intl.DateTimeFormat(
                  'ru-RU',
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  }
                ).format(Date.parse(todo.task.createdAt))
              }
            </Col>
            <Col span={6}>Дата обновления</Col>
            <Col span={18}>
              {
                new Intl.DateTimeFormat(
                  'ru-RU',
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  }
                ).format(Date.parse(todo.task.updatedAt))
              }
            </Col>
          </>
        }
        <Col span={6}>
          Заголовок
          {!disabled && <span className='text-error'> *</span>}
        </Col>
        <Col span={18}>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={disabled}
          />
        </Col>
        <Col span={6}>
          Описание
          {!disabled && <span className='text-error'> *</span>}
        </Col>
        <Col span={18}>
          <Input.TextArea
            autoSize={{minRows: 8, maxRows: 16}}
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={disabled}
          />
        </Col>
        <Col span={6}>
          Дата окончания
          {!disabled && <span className='text-error'> *</span>}
        </Col>
        <Col span={18}>
          <DatePicker
            value={sla}
            onChange={(date) => setSla(date)}
            showTime={{defaultValue: moment('23:59:59', 'HH:mm:ss')}}
            format='DD.MM.YYYY HH:mm'
            placeholder=''
            style={{width: '100%'}}
            disabled={disabled}
            showNow={false}
          />
        </Col>
        <Col span={6}>Приоритет</Col>
        <Col span={18}>
          <Select
            value={priority}
            onChange={(value) => setPriority(value)}
            style={{width: '100%'}}
            disabled={disabled}
          >
            <Select.Option value={0} label='Низкий'>
              <Tag color='processing'>Низкий</Tag>
            </Select.Option>
            <Select.Option value={1} label='Средний'>
              <Tag color='warning'>Средний</Tag>
            </Select.Option>
            <Select.Option value={2} label='Высокий'>
              <Tag color='error'>Высокий</Tag>
            </Select.Option>
          </Select>
        </Col>
        <Col span={6}>Статус</Col>
        <Col span={18}>
          <Select value={status} onChange={(value) => setStatus(value)} style={{width: '100%'}}>
            <Select.Option value='to_do' label='К выполнению'>
              <Tag color='var(--black-to-white-2)'>К выполнению</Tag>
            </Select.Option>
            <Select.Option value='in_progress' label='Выполняется'>
              <Tag color='processing'>Выполняется</Tag>
            </Select.Option>
            <Select.Option value='resolved' label='Выполнена'>
              <Tag color='success'>Выполнена</Tag>
            </Select.Option>
            <Select.Option value='cancelled' label='Отменена'>
              <Tag color='error'>Отменена</Tag>
            </Select.Option>
          </Select>
        </Col>
        <Col span={6}>Ответственный</Col>
        <Col span={18}>
          <Select
            style={{width: '100%'}}
            value={assignee}
            label={assigneeName}
            optionLabelProp='label'
            onChange={(value) => setAssignee(value)}
            disabled={disabled}
            showSearch
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              !todo.workers &&
              <Option
                key={assignee}
                value={assignee}
                label={assigneeName}
              >
                {assigneeName}
              </Option>
            }
            {
              (todo.workers && todo.workers?.workers?.length > 0) &&
              <Option
                key='null'
                value={null}
                label='Не назначено'
              >
                Не назначено
              </Option>
            }
            {
              (todo.workers?.workers || []).map(worker => {
                return (
                  <Option
                    key={worker.id}
                    value={worker.id}
                    label={`${worker.surname} ${worker.name} ${worker.patronymic}`}
                  >
                    {`${worker.surname} ${worker.name} ${worker.patronymic}`}
                  </Option>
                )
              })
            }
          </Select>
        </Col>
        {
          (todo.task && todo.task.creatorId === user.user.id) &&
          <Col offset={6} span={9}>
            <Popconfirm
              title='Уверен, что хочешь удалить задачу?'
              placement='bottom'
              onConfirm={() => del(todo.task.id)}
            >
              <Button
                type='primary'
                danger
              >
                Удалить
              </Button>
            </Popconfirm>
          </Col>
        }
        <Col span={(todo.task && todo.task.creatorId === user.user.id) ? 9 : 24} className='text-right'>
          <Button
            type='primary'
            onClick={() => submit()}
            disabled={todo.loading}
            loading={todo.loading}
          >
            {todo.task ? 'Сохранить' : 'Создать'}
          </Button>
        </Col>
      </Row>
    </Modal>
  )
})

export default TodoModal