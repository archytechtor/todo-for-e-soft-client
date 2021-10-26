import React from 'react'
import {Context} from '../../index'
import {Button, Card, Popconfirm, Table} from 'antd'
import Icon from '../UI/icons/Icon'
import {deleteUser, getAllUsers, updateUser} from '../../http/userAPI'
import {observer} from 'mobx-react'
import EditableRow from './EditableRow'
import EditableCell from './EditableCell'
import {message} from '../UI/message'


export const EditableContext = React.createContext(null)


const SettingsList = observer(() => {

  const {user} = React.useContext(Context)

  const columns = [
    {
      title: 'ID',
      key: 'id',
      render: row => row.id,
      sorter: (a, b) => (a.id && b.id) && a.id - b.id,
      align: 'center',
      width: '100px'
    },
    {
      title: 'ФИО',
      key: 'username',
      render: row => `${row.surname} ${row.name} ${row.patronymic}`,
      sorter: (a, b) => (a.surname && b.surname) && a.surname.localeCompare(b.surname),
      onFilterDropdownVisibleChange: (visible) => visible && getLeaders(),
      filters: (user.leaders?.leaders || []).map(leader => {
        return {text: `${leader.surname} ${leader.name} ${leader.patronymic}`, value: leader.id}
      }),
      filterSearch: true,
      width: '350px',
      ellipsis: true
    },
    {
      title: 'Имя пользователя',
      key: 'username',
      render: row => row.username,
      sorter: (a, b) => (a.username && b.username) && a.username.localeCompare(b.username),
      width: '250px',
      ellipsis: true
    },
    {
      title: 'Руководитель',
      key: 'leader',
      render: row => row.leader
        ? `${row.leader.surname} ${row.leader.name} ${row.leader.patronymic}`
        : 'Отсутствует',
      sorter: (a, b) => (a.leader?.surname && b.leader?.surname) &&
        a.leader.surname.localeCompare(b.leader.surname),
      onFilterDropdownVisibleChange: (visible) => visible && getLeaders(),
      filters: (user.leaders?.leaders || []).map(leader => {
        return {text: `${leader.surname} ${leader.name} ${leader.patronymic}`, value: leader.id}
      }),
      filterSearch: true,
      width: '350px',
      ellipsis: true,
      editable: true
    },
    {
      title: 'Зарегистрирован',
      key: 'createdAt',
      render: row => {
        return row.createdAt && new Intl.DateTimeFormat(
          'ru-RU',
          {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }
        ).format(Date.parse(row.createdAt))
      },
      sorter: (a, b) => (a.createdAt && b.createdAt) && new Date(a.createdAt) - new Date(b.createdAt),
      width: '200px',
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (_, row) => {
        return user.allUsers?.count >= 1
          ? (
            <Popconfirm
              title='Уверен, что хочешь удалить пользователя?'
              placement='right'
              onConfirm={() => deleteUser(row.id)}
              disabled={row.id === user.user.id}
            >
              <Button
                size='small'
                type={row.id === user.user.id ? 'default' : 'primary'}
                danger={row.id !== user.user.id}
                icon={<Icon type='solid' name='trash' size={12}/>}
                disabled={row.id === user.user.id}
              />
            </Popconfirm>
          )
          : null
      },
      align: 'center',
      width: '100px'
    }
  ]

  const onChange = async (pagination, filters, sorter, extra) => {
    switch (extra?.action) {
      case 'sort':
        sorter.order
          ? user.setSorter([sorter.columnKey, sorter.order === 'ascend' ? 'ASC' : 'DESC'])
          : user.setSorter(['id', 'ASC'])
        await getAllUsers()
        break
      case 'paginate':
        user.setPage(pagination.current)
        user.setPageSize(pagination.pageSize)
        await getAllUsers()
        break
      case 'filter':
        Object.keys(filters).map(filter => user.setFilter(filter, filters[filter] || []))
        await getAllUsers()
        break
      default:
        break
    }
  }

  const getLeaders = async () => {
    user.setLeadersOnly(true)
    await getAllUsers()
    user.setLeadersOnly(false)
  }

  const saveData = async (row) => {
    if (row.id === row.value) {
      return message('error', 'Нельзя установить пользователя начальником для себя же')
    }
    await updateUser(row.id, row.name, row.surname, row.patronymic, row.username, row.value)
    await getAllUsers()
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }

  const mutateColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: saveData
      })
    }
  })

  return (
    <Card>
      <Table
        rowKey='id'
        components={components}
        loading={{
          spinning: user.loading,
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
        columns={mutateColumns}
        dataSource={user.allUsers?.users || []}
        showSorterTooltip={false}
        rowClassName={() => 'editable-row'}
        scroll={{y: '68vh'}}
        onChange={onChange}
        pagination={{
          total: user.allUsers?.count || 0,
          current: user.page,
          pageSize: user.pageSize,
          showSizeChanger: true,
          showTotal: (total, range) => <div>{`Показаны пользователи: ${range[0]} - ${range[1]} из ${total}`}</div>
        }}
      />
    </Card>
  )
})

export default SettingsList