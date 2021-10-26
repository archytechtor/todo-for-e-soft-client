import React from 'react'
import {observer} from 'mobx-react'
import {getTodo} from '../http/todoAPI'
import TopMenu from '../components/UI/TopMenu'
import TodoList from '../components/todo/TodoList'
import TodoModal from '../components/todo/TodoModal'


const Todo = observer(() => {

  React.useEffect(() => {
    getTodo()
  }, [])

  return (
    <>
      <div className='p-5'>
        <TopMenu page='todo'/>
        <TodoList/>
      </div>
      <TodoModal/>
    </>
  )
})

export default Todo