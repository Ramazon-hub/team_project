require('dotenv').config()
const jwt = require('jsonwebtoken')
const model = require('./model')

module.exports = {
    GET: async (req, res) => {
        try {
            const { page, limit } = req.query
            if (req.user && page && limit ) {
                const usersAll = (await model.usersALL()).length
                res.json([await model.users( page * limit, +limit ),usersAll])
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
                        
            if (!(await foundUser).length && user_fname && user_lname && user_email && user_password) {
                const newUser = model.userRegister( user_avatar, user_fname, user_lname, user_email, user_password )
                const token = jwt.sign(JSON.stringify(await newUser), process.env.TOKEN)

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
       try {
            if (req.user) {
                res.json(req.user)
            } else {
                res.json({ message: 'not authorized' })
            }
       } catch (error) {
           console.log(error);
       }
    }, 
    USER: async (req, res) => {
        try {
            const { email } = req.params
            if (req.user && email) {
                res.json(await model.usersParams(email))
            }
        } catch (error) {
            console.log(error);
        }
    }
}
