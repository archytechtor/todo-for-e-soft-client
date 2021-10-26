import React from 'react'
import SettingsList from '../components/settings/SettingsList'
import {getAllUsers} from '../http/userAPI'
import TopMenu from '../components/UI/TopMenu'


const Settings = () => {

  React.useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className='p-5'>
      <TopMenu page='users'/>
      <SettingsList />
    </div>
  )
}

export default Settings