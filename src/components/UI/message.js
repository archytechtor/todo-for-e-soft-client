import {notification} from 'antd'

export const message = (type, msg, description = '', duration = 3) => {
  notification[type]({
    key: type + msg + description,
    message: msg,
    description: description,
    duration: duration
  })
}