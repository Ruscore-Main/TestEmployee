import UserList from 'components/UserList'
import React from 'react'
import s from './AdminPage.module.scss'
import ProfileBlock from 'components/ProfileBlock'
import Navigation from 'components/Navigation'

const AdminPage = () => {
  return (
    <div className="container">
      <div className={s.container}>
        <ProfileBlock />
        <Navigation />
      </div>
    </div>
  )
}

export default AdminPage