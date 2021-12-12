import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import './Header.scss'

function Header() {
    const [ token ] = useAuth(true)
    const [ modal, setModal ] = useState('')
    const [ img, setImg ] = useState('')

    const modalOpen = () => {
        setModal(true)
    }

    const inputChange = e => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImg(reader.result);
        } 
    }
    return (
        <header className="header">
            <button className='modal-btn btn' onClick={modalOpen}>+</button>
           {modal ?
           <div
                className="upload-form-wrapper" 
                onClick={e => e.target.classList.value === 'upload-form-wrapper' ? setModal(false) : ''}
           >
            <form action="http://localhost:4300/posts" method="post" encType="multipart/form-data" className="upload-form">
                <div className="img_wrapper">
                    <img className="form-sub-img" src={img} alt="" />
                </div>
                <div className="input_wrapper">
                    <input type="hidden" name="authorization" value={token} />
                    <input type="text" className='input' name='postTitle' />
                    <input type="file" className="file" name="postImage" onChange={inputChange} />
                    <button type="submit" className="form-sub-btn">submit</button>
                </div>
            </form>
           </div>
           : ''}
        </header>
    )
}

export default Header;
