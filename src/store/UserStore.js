import {makeAutoObservable} from 'mobx'


export default class UserStore {
  constructor() {
    this._loading = false
    this._isAuth = false
    this._user = {}
    this._allUsers = null
    this._page = 1
    this._pageSize = 10
    this._filter = {
      leader: [],
      username: []
    }
    this._sorter = ['id', 'ASC']
    this._leadersOnly = false
    this._leaders = null

    makeAutoObservable(this)
  }

  setLoading(status) {
    this._loading = status
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }

  setUser(user) {
    this._user = user
  }

  setAllUsers(users) {
    this._allUsers = users
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

  setLeadersOnly(state) {
    this._leadersOnly = state
  }

  setLeaders(leaders) {
    this._leaders = leaders
  }

  get loading() {
    return this._loading
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }

  get allUsers() {
    return this._allUsers
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

  get leadersOnly() {
    return this._leadersOnly
  }

  get leaders() {
    return this._leaders
  }
}