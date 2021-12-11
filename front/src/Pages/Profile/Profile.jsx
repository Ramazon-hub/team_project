import useAuthUser from "../../Hooks/useAuthUser";
import './Profile.scss'
import avatar from '../../Images/avatar.png'
import Header from '../../Components/Header/Header'
import Main from "../../Components/Main/Main";
import useUser from "../../Hooks/useUser";
import { useParams } from 'react-router-dom'
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";

function Profile() {
    const [ setToken ] = useAuth(false)
    const [ logOutBtn, setLogOutBtn ] = useState('log-out-btn')
    const [ accessUser, setAccessUser ] = useState({})
    const authUser = useAuthUser()
    const { email } = useParams()
    const user = useUser(email)

    useEffect(() => {
        if (user.length && authUser) {
            const User = user.find(u => u.user_email === authUser.user_email)
            setAccessUser(User)
        }
        if (typeof accessUser === 'undefined') {
            setLogOutBtn('log-out-btn--active')
        } else {
            setLogOutBtn('log-out-btn')
        }
    }, [authUser, user, accessUser])

    const logOut = () => {
        if (typeof accessUser !== 'undefined') {
            setToken(false)
        }
    }

    const imgSrc = user.length ? (user[0].user_avatar ? (user[0].user_avatar.split('/').includes('upload') ? 'http://localhost:4300/' + user[0].user_avatar : avatar) : avatar) : avatar
    
    return (
        <>
        <Header />
            <Main>
                <div className="profile_wrapper">
                    <div className="profile_background">
                    </div>
                    <div className="profile">
                        <img className='avatar' src={imgSrc} alt="profile"/>
                        <div className="profile-name_wrapper">
                            <small className="profile-name-content" >First Name:</small><h3 className='profile_name'> {user.length ? user[0].user_fname : ''}</h3>
                            <small className="profile-name-content" >Last Name:</small><h3 className='profile_name'> {user.length ? user[0].user_lname : ''}</h3>
                            <small className="profile-name-content" >Email:</small><h3 className='profile_name'> {user.length ? user[0].user_email : ''}</h3>
                            <small className="profile-name-content" >Join Date: {user.length ? user[0].user_date.split('.')[0] : ''}</small>
                            <button onClick={logOut} className={logOutBtn} >Log Out</button>
                        </div>
                    </div>
                </div>
            </Main>
        </>
    )
}

export default Profile;