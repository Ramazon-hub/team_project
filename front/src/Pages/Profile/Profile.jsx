import useAuthUser from "../../Hooks/useAuthUser";
import './Profile.scss'
import avatar from '../../Images/avatar.png'

function Profile() {
    const authUser = useAuthUser()

    const imgSrc = authUser.user_avatar ? (authUser.user_avatar.split('/').includes('upload') ? 'http://localhost:4300/' + authUser.user_avatar : avatar) : ''
    
    return (
        <>
            <div className="profile_background">

            </div>
            <div className="profile">
                <img className='avatar' src={imgSrc} alt={authUser.user_avatar ? authUser.user_avatar.split('/')[2] : avatar} />
                <div className="profile-name_wrapper">
                    <small className="profile-name-content" >First Name:</small><h3 className='profile_name'> {authUser.user_fname}</h3>
                    <small className="profile-name-content" >Last Name:</small><h3 className='profile_name'> {authUser.user_lname}</h3>
                    <small className="profile-name-content" >Email:</small><h3 className='profile_name'> {authUser.user_email}</h3>
                    <small className="profile-name-content" >Join Date: {authUser.user_date ? authUser.user_date.split('.')[0] : ''}</small>
                </div>
            </div>
        </>
    )
}

export default Profile;