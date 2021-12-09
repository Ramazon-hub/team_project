import { useEffect, useState } from "react";
import useAuth from "./useAuth";

function useUser() {
    const [ user, setUser ] = useState('')
    const [ token ] = useAuth(true)

    useEffect(() => {
        fetch('http://localhost:4300/users', {
            headers: {
                'authorization': `${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser(data) 
            typeof data.message !== 'undefined' ? console.log(data.message) :  console.log()
        })
        .catch(err => console.log(err))
    }, [token])

    return user
}

export default useUser;