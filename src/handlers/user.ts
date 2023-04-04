import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

// create user and give them token
export const createNewUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({                                             // create 
            data: {
                username: req.body.username,                                                // requested user name
                password: await hashPassword(req.body.password)                             // hashed password
            }
        })
        const token = createJWT(user)                                                       // create token
        res.json({ token })                                                                   // return token
    } catch (e) {
        e.type = 'input'
        next(e)
    }


}

// user signin
export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({                                         // check if username exists
        where: {
            username: req.body.username,
        }
    })

    const isValid = await comparePasswords(req.body.password, user.password)            // compare plaintext password with hashed password 

    if (!isValid) {                                                                      // reject if invalid
        res.status(401)
        res.json({ message: 'Nope' })
        return
    }

    const token = createJWT(user)                                                       // create token if valid
    res.json({ token })
}
