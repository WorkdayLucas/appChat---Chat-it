import React from 'react'
import { useState } from 'react'
import ContactList from './contacts/ContactList'
import './Side.css'
import SideNavBar from './sideNavBar/SideNavBar'
import SearchMain from '../../searchUsers/SearchMain'
import { useLogOutMutation } from '../../../features/auth/authApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserListOption, selectUsersListVisibility, setUserListRender } from '../../../features/users/utilSlice'
import Notifications from './notifications/Notifications'
import { useGetNotificationsQuery } from '../../../features/users/usersApiSlice'
import { selectCurrentUser } from '../../../features/auth/authSlice'
import { useEffect } from 'react'
import Ring from '../../../song/ring.mp3'

const Side = () => {

  // const [component, setComponent] = useState("contactList")
  const user = useSelector(selectCurrentUser)
  const component = useSelector(selectUserListOption)
  const [logOut] = useLogOutMutation()
  const dispatch = useDispatch()

  const { data, refetch } = useGetNotificationsQuery(user.id)

  const visibility = useSelector(selectUsersListVisibility)
  setTimeout(()=>{refetch();},1200)

  useEffect(() => {
    // const ring = new Audio(Ring)
    // ring.play()
  }, [data])

  

  return (
    <div className='SideContainer'>
      <SideNavBar notificationsLength={data?.length} />
      <div className={visibility}>
        {component === "contactList" ? <ContactList /> :
         component === "buscar" ? <SearchMain /> :
         component === "notifications" ? <Notifications notifications={data ? data :[]} /> :
         <div>nada</div>}
      </div>

    </div>
  )
}

export default Side