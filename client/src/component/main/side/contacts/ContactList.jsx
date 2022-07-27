import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../../features/auth/authSlice'
import { useCreateRoomMutation } from '../../../../features/users/roomsApiSlice'
import { useGetContactListQuery } from '../../../../features/users/usersApiSlice'
import { callRoomOption, selectSwitchContactList, setRoomVisibility, setUserListRender, setUsersListVisibility } from '../../../../features/users/utilSlice'
import Contact from '../../../userItem/Contact'
import './ContactList.css'

const ContactList = () => {
    const user = useSelector(selectCurrentUser)
    const refectContacts = useSelector(selectSwitchContactList)
    const { data, isLoading, refetch } = useGetContactListQuery(user.id)
    const [createRoom] = useCreateRoomMutation()
    const dispatch = useDispatch()
    const visibility = useSelector(setUsersListVisibility)


    useEffect(() => {
        refetch()
        console.log("lista de contactos actualizada")
    }, [refectContacts])


    useEffect(() => {}, [visibility])

    const content = isLoading ? <h3>cargando...</h3> :
        data?.contactList.contacts.length ?
            <ul className={`ContactList ${visibility}`}>
                {data.contactList.contacts.map((contact) => <li key={contact.id} onClick={() => {
                    createRoom({
                        nameContact: contact.name,
                        contactId: contact.id,
                        usersId: user.id,
                        userName: user.name
                    }).then(() => {
                        dispatch(callRoomOption(contact.name));
                        dispatch(setRoomVisibility("show"));
                        dispatch(setUsersListVisibility("userListHide"))
                    })
                }}><Contact img={contact.img} name={contact.name} /></li>)}
            </ul> : (<h3>sin contactos</h3>)

    return content
}

export default ContactList