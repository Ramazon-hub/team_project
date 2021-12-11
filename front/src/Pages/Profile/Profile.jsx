import useAuthUser from "../../Hooks/useAuthUser";
import './Profile.scss'
import avatar from '../../Images/avatar.png'
import camera from '../../Images/camera.png'
import Header from '../../Components/Header/Header'
import Main from "../../Components/Main/Main";
import useUser from "../../Hooks/useUser";
import { useParams } from 'react-router-dom'
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";

function Profile() {
    const [ setToken ] = useAuth(false)
    const [ token ] = useAuth(true)
    const [ logOutBtn, setLogOutBtn ] = useState('log-out-btn')
    const [ accessUser, setAccessUser ] = useState({})
    const authUser = useAuthUser()
    const { email } = useParams()
    const user = useUser(email)
    const [ cameraBtn, setCameraBtn ] = useState('camera')
    const [ modal, setModal ] = useState(false)
    const [ img, setImg ] = useState('')

    useEffect(() => {
        if (user.length && authUser) {
            const User = user.find(u => u.user_email === authUser.user_email)
            setAccessUser(User)
        }
        if (typeof accessUser === 'undefined') {
            setLogOutBtn('log-out-btn--active')
            setCameraBtn('camera--active')
        } else {
            setLogOutBtn('log-out-btn')
            setCameraBtn('camera')
        }
    }, [authUser, user, accessUser])

    const logOut = () => {
        if (typeof accessUser !== 'undefined') {
            setToken(false)
        }
    }

    const cameraClick = () => {
        setModal(true)
    }

    const inputChange = e => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImg(reader.result);
        } 
    }

    let imgSrc = user.length ? (user[0].user_avatar ? 
        'http://localhost:4300/avatar/' + user[0].user_avatar 
    : avatar) :avatar

    let styleFile = {
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat"
    }

    return (
        <>
        <Header />
            <Main>
                <div className="profile_wrapper">
                    <div className="profile_background" />
                    <div className="profile">
                        <div className='avatar' style={styleFile} >
                            <button className={`${cameraBtn} btn`} onClick={cameraClick}>
                                <img src={camera} alt="img" />
                            </button>
                        </div>                        
                        <div className="profile-name_wrapper">
                            <small className="profile-name-content" >First Name:</small><h3 className='profile_name'> {user.length ? user[0].user_fname : ''}</h3>
                            <small className="profile-name-content" >Last Name:</small><h3 className='profile_name'> {user.length ? user[0].user_lname : ''}</h3>
                            <small className="profile-name-content" >Email:</small><h3 className='profile_name'> {user.length ? user[0].user_email : ''}</h3>
                            <small className="profile-name-content" >Join Date: {user.length ? user[0].user_date.split('.')[0] : ''}</small>
                            <button onClick={logOut} className={`${logOutBtn} btn`} >Log Out</button>
                        </div>
                        {modal ? 
                            <div className="upload-form-wrapper" onClick={e => e.target.classList.value === 'upload-form-wrapper' ? setModal(false) : ''}>
                                <form 
                                    action="http://localhost:4300/avatar"
                                    method="post"
                                    encType="multipart/form-data"
                                    className="upload-form"
                                >
                                    <div className="img_wrapper">
                                        <img className="form-sub-img" src={img} alt="" />
                                    </div>
                                    <div className="input_wrapper">
                                        <input type="hidden" name="authorization" value={token} />
                                        <input type="file" className="file" name="image" onChange={inputChange} />
                                        <button type="submit" className="form-sub-btn">submit</button>
                                    </div>
                                </form>
                            </div>
                        : ''}
                    </div>
                </div>
            </Main>
        </>
    )
}

export default Profile;