import useAuth from '../../Hooks/useAuth';
import './Header.scss'

function Header() {
    const [ token ] = useAuth(true)
    return (
        <header className="header">
           <form 
                action="http://localhost:4300/posts"
                method="post"
                encType="multipart/form-data"
            >
                <input type="hidden" name="authorization" value={token} />
                <input type="text" name='postTitle' />
                <input type="file" name='postImage' />
                <button type="submit">Submit</button>
            </form>
        </header>
    )
}

export default Header;
