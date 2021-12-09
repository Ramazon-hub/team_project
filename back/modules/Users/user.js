require('dotenv').config()
const jwt = require('jsonwebtoken')
const model = require('./model')

module.exports = {
    GET: async (req, res) => {
        try {
            if (req.user) {
                res.json(await model.users())
           } else {
                res.json({ message: 'not authorized' })
           }
        } catch (error) {
            console.log(error);
        }
    },
    REGISTER: async (req, res) => {
        try {
            const { user_avatar, user_fname, user_lname, user_email, user_password } = req.body

            const foundUser = model.userLogin(user_email, user_password) 
                        
            if (!(await foundUser).length) {
                const newUser = model.userRegister( user_avatar, user_fname, user_lname, user_email, user_password )
                const token = jwt.sign(JSON.stringify(newUser), process.env.TOKEN)

                res.json({
                    accessToken: `bearer ${token}`
                })
            } else {
                res.json({ message: 'not authorized' })
            }
        } catch (error) {
            console.log(error);
        }
    },
    LOGIN: async (req, res) => {
        try {
            const { user_email, user_password } = req.body

            const foundUser = model.userLogin(user_email, user_password)

            if ((await foundUser).length) {
                const token = jwt.sign((await foundUser)[0], process.env.TOKEN)

                res.json({
                    accessToken: `bearer ${token}`
                })
            } else {
                res.json({ message: 'not authorized' })
            }
            
        } catch (error) {
            console.log(error);
        }
    },
    AUTH: async (req, res) => {
       if (req.user) {
            res.json(req.user)
       } else {
            res.json({ message: 'not authorized' })
       }
    }
}
