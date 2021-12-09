import { Link } from 'react-router-dom'
import useAuthUser from '../../Hooks/useAuthUser';
import useUser from '../../Hooks/useUser';
import './Main.scss'
import avatar from '../../Images/avatar.png'

function Main({ children }) {
    const user = useUser()
    const authUser = useAuthUser()

    const imgSrc = authUser.user_avatar ? (authUser.user_avatar.split('/').includes('upload') ? 'http://localhost:4300/' + authUser.user_avatar : avatar) : ''

    return (
        <main>
            <div className="main_warpper">
                <ul className='main-user-list'>
                    <li className='main-item'><Link className='item_link' to='/'>Home</Link></li>
                    <li className='main-item'><Link className='item_link' to='/profile'>Profile</Link></li>
                </ul>
            </div>
            {children}
            <div className="main_warpper">
                <h2 className='main-rec-title'>Recommend for you</h2>
                <ul className='main-user-list'>
                    {user.length ? user.map(u => {
                       return (
                           <li className='main-user-item' key={u.user_uid}>
                               <img className='logo-img' src={imgSrc} alt={imgSrc} />
                               <h3 className='main-user-title'>{u.user_email}</h3>
                           </li>
                       ) 
                    }) : ''}
                </ul>
            </div>
        </main>
    )
}

export default Main;
