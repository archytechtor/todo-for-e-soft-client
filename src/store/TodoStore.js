import {makeAutoObservable} from 'mobx'


export default class TodoStore {
  constructor() {
    this._loading = false
    this._todoList = null
    this._page = 1
    this._pageSize = 10
    this._filter = {
      priority: [],
      status: [],
      assignee: [],
      sla: []
    }
    this._sorter = ['updatedAt', 'DESC']
    this._modalVisible = false
    this._task = null
    this._workers = null

    makeAutoObservable(this, {}, {deep: true})
  }

  setLoading(status) {
    this._loading = status
  }

  setTodoList(todoList) {
    this._todoList = todoList
  }

  setPage(page) {
    this._page = page
  }

  setPageSize(pageSize) {
    this._pageSize = pageSize
  }

  setFilter(state, value) {
    this._filter = {...this._filter, [state]: value}
  }

  setSorter(order) {
    this._sorter = order
  }

  setModalVisible(state) {
    this._modalVisible = state
  }

  setTask(task) {
    this._task = task
  }

  setWorkers(workers) {
    this._workers = workers
  }

  resetByDefault() {
    this._todoList = null
    this._page = 1
    this._pageSize = 10
    this._filter = {
      priority: [],
      status: [],
      assignee: [],
      sla: []
    }
    this._sorter = ['updatedAt', 'DESC']
    this._workers = []
  }

  get loading() {
    return this._loading
  }

  get todoList() {
    return this._todoList
  }

  get page() {
    return this._page
  }

  get pageSize() {
    return this._pageSize
  }

  get filter() {
    return this._filter
  }

  get sorter() {
    return this._sorter
  }

  get modalVisible() {
    return this._modalVisible
  }

  get task() {
    return this._task
  }

  get workers() {
    return this._workers
  }
}