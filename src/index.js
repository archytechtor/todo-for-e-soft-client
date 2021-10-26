import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {store} from './store'

export const Context = React.createContext(null)

ReactDOM.render(
  <Context.Provider value={store}>
    <App/>
  </Context.Provider>
  ,
  document.getElementById('root')
)
