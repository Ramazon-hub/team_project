import { Link } from "react-router-dom";
import useAuthUser from "../../Hooks/useAuthUser";
import avatar from '../../Images/avatar.png'
import './RenderUser.scss'

function RenderUsers({ user, moreUser }) {
    const authUser = useAuthUser()

    const imgSrc = authUser.user_avatar ? 
        (authUser.user_avatar.split('/').includes('upload') ? 
        'http://localhost:4300/' + authUser.user_avatar : avatar) 
        : avatar
    return (
        <ul className='main-user-list'>
            {user.length ? user[0].map(u => {
            return (
            <li className="main-item" key={u.user_uid}>
                <Link className="item_link item_link-profile" to={'/profile/' + u.user_email}>
                    <img className='logo-img' src={imgSrc} alt={imgSrc} />
                    <h3 className='main-user-title'>{u.user_email}</h3>
                </Link>
            </li>
            )
            }) : ''}
            <button onClick={moreUser} className="profile-btn">more</button>
        </ul>
    )
}

export default RenderUsers;