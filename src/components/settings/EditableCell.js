import React from 'react'
import {EditableContext} from './SettingsList'
import {Form, Select} from 'antd'
import {getAllUsers} from '../../http/userAPI'
import {Context} from '../../index'
import {message} from '../UI/message'


const EditableCell = ({
                        title,
                        editable,
                        children,
                        dataIndex,
                        record,
                        handleSave,
                        ...restProps
                      }) => {

  const [editing, setEditing] = React.useState(false)

  const {user} = React.useContext(Context)

  const form = React.useContext(EditableContext)
  const inputRef = React.useRef(null)

  const {Option} = Select

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    })
  }

  const save = async (value) => {
    try {
      toggleEdit()
      handleSave({...record, value})
    } catch (errInfo) {
      message('error', 'Ошибка при сохранении', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{margin: 0}}
                 name={dataIndex}
                 rules={[{required: true, message: `${title} is required.`}]}
      >
        <Select
          ref={inputRef}
          style={{width: '100%'}}
          showAction={['click', 'focus']}
          optionLabelProp='label'
          onChange={value => save(value)}
          onBlur={() => toggleEdit()}
          onFocus={async () => user.setLeadersOnly(true) & await getAllUsers() & user.setLeadersOnly(false)}
          showSearch
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {
            (user.leaders && user.leaders?.leaders?.length > 0) &&
            <Option key='null' value={null} label='Нет'>Нет</Option>
          }
          {
            (user.leaders?.leaders || []).map(leader => {
              return (
                <Option
                  key={leader.id}
                  value={leader.id}
                  label={`${leader.surname} ${leader.name} ${leader.patronymic}`}
                >
                  {`${leader.surname} ${leader.name} ${leader.patronymic}`}
                </Option>
              )
            })
          }
        </Select>

      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{paddingRight: 24}}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  React.useEffect(() => {
    if (editing) {
      inputRef.current.focus()
    }
  }, [editing])

  return <td {...restProps}>{childNode}</td>
}

export default EditableCell