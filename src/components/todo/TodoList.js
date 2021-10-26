import React from 'react'
import {observer} from 'mobx-react'
import {Context} from '../../index'
import {getTodo, getWorkers} from '../../http/todoAPI'
import {Card, Table, Tag} from 'antd'
import Icon from '../UI/icons/Icon'


const TodoList = observer(() => {

  const {todo} = React.useContext(Context)

  const columns = [
    {
      title: 'Заголовок',
      key: 'title',
      render: row => {
        const color =
          row.status === 'resolved'
            ? 'var(--success)'
            : (Date.parse(row.sla) - Date.now()) < 0
            ? 'var(--error)'
            : 'var(--black-to-white-8)'
        return <div style={{color: color}}>{row.title}</div>
      },
      sorter: (a, b) => (a.title && b.title) && a.title.localeCompare(b.title),
      width: '500px',
      ellipsis: true
    },
    {
      title: 'Приоритет',
      key: 'priority',
      render: row => {
        const priorities = {
          value: {
            0: 'Низкий',
            1: 'Средний',
            2: 'Высокий'
          },
          color: {
            0: 'processing',
            1: 'warning',
            2: 'error'
          }
        }
        return (
          <Tag
            className='m-0'
            color={priorities.color[row.priority]}
          >
            {priorities.value[row.priority]}
          </Tag>
        )
      },
      sorter: (a, b) => (a.priority && b.priority) && a.priority - b.priority,
      filters: [
        {
          text: 'Низкий',
          value: 0
        },
        {
          text: 'Средний',
          value: 1
        },
        {
          text: 'Высокий',
          value: 2
        }
      ],
      width: '160px'
    },
    {
      title: 'Дата окончания',
      key: 'sla',
      render: row => {
        return row.sla && new Intl.DateTimeFormat(
          'ru-RU',
          {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }
        ).format(Date.parse(row.sla))
      },
      sorter: (a, b) => (a.sla && b.sla) && new Date(a.sla) - new Date(b.sla),
      filterMultiple: false,
      filters: [
        {
          text: 'Задачи на сегодня',
          value: 'today'
        },
        {
          text: 'Задачи на неделю',
          value: 'week'
        },
        {
          text: 'Все актуальные',
          value: 'actual'
        },
        {
          text: 'Все просроченные',
          value: 'expired'
        }
      ],
      width: '200px'
    },
    {
      title: 'Ответственный',
      key: 'assignee',
      render: row => row.assignee
        ? `${row.assignee.surname} ${row.assignee.name} ${row.assignee.patronymic}`
        : 'Не назначено',
      sorter: (a, b) => (a.assignee?.surname && b.assignee?.surname) &&
        a.assignee.surname.localeCompare(b.assignee.surname),
      onFilterDropdownVisibleChange: (visible) => visible && getWorkers(),
      filters: (todo.workers?.workers || []).map(worker => {
        return {text: `${worker.surname} ${worker.name} ${worker.patronymic}`, value: worker.id }
      }),
      filterSearch: true,
      width: '350px',
      ellipsis: true
    },
    {
      title: 'Статус',
      key: 'status',
      render: row => {
        const statuses = {
          value: {
            'to_do': 'К выполнению',
            'in_progress': 'Выполняется',
            'resolved': 'Выполнена',
            'cancelled': 'Отменена'
          },
          color: {
            'to_do': 'var(--black-to-white-2)',
            'in_progress': 'processing',
            'resolved': 'success',
            'cancelled': 'error'
          }
        }
        return (
          <Tag
            className='m-0'
            color={statuses.color[row.status]}
          >
            {statuses.value[row.status]}
          </Tag>
        )
      },
      sorter: (a, b) => (a.status && b.status) && a.status.localeCompare(b.status),
      filters: [
        {
          text: 'К выполнению',
          value: 'to_do'
        },
        {
          text: 'Выполняется',
          value: 'in_progress'
        },
        {
          text: 'Выполнена',
          value: 'resolved'
        },
        {
          text: 'Отменена',
          value: 'cancelled'
        }
      ],
      width: '180px'
    }
  ]

  const onChange = async (pagination, filters, sorter, extra) => {
    switch (extra?.action) {
      case 'sort':
        sorter.order
          ? todo.setSorter([sorter.columnKey, sorter.order === 'ascend' ? 'ASC' : 'DESC'])
          : todo.setSorter(['updatedAt', 'DESC'])
        await getTodo()
        break
      case 'paginate':
        todo.setPage(pagination.current)
        todo.setPageSize(pagination.pageSize)
        await getTodo()
        break
      case 'filter':
        Object.keys(filters).map(filter => todo.setFilter(filter, filters[filter] || []))
        await getTodo()
        break
      default:
        break
    }
  }

  return (
    <Card>
      <Table
        rowKey='id'
        onRow={(record) => ({
          onClick: event => {
            todo.setTask(record)
            todo.setModalVisible(true)
          }
        })}
        rowClassName='pointer'
        loading={{
          spinning: todo.loading,
          indicator: (
            <div>
              <Icon
                type='regular'
                name='spinner-third'
                size={48}
                spin
              />
            </div>
          )
        }}
        columns={columns}
        dataSource={todo.todoList?.todo || []}
        showSorterTooltip={false}
        scroll={{y: '68vh'}}
        onChange={onChange}
        pagination={{
          total: todo.todoList?.count || 0,
          current: todo.page,
          pageSize: todo.pageSize,
          showSizeChanger: true,
          showTotal: (total, range) => `Показаны задачи: ${range[0]} - ${range[1]} из ${total}`
        }}
      />
    </Card>
  )
})

export default TodoList