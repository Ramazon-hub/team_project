const { fetch,fetchAll } = require('../../lib/postgres')

const USER_GET = `
    select 
        user_uid, user_avatar, user_fname,
        user_lname, user_email, user_date
    from users
`

const USER_REGISTER =  `
    insert into users(
        user_avatar, user_fname,user_lname, 
        user_email, user_password
    ) values (
        $1, $2, $3, $4, $5
    ) returning user_uid, user_avatar, user_fname, user_lname, user_email, user_date
`

const USER_LOGIN =  `
    select 
        user_uid, user_avatar, user_fname,
        user_lname, user_email, user_date
    from users
    where
        user_email = $1 and user_password = $2
`

const users = () => fetchAll(USER_GET)
const userRegister = (user_avatar, user_fname, user_lname, user_email, user_password) => 
    fetch(USER_REGISTER, user_avatar, user_fname, user_lname, user_email, user_password);
const userLogin = (user_email, user_password) => 
    fetchAll(USER_LOGIN, user_email, user_password)

module.exports = {
    users,
    userRegister,
    userLogin
}
