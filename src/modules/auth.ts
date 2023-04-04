import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// compare given password with hashed version of password
export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

// hash given password using salt = 5
export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}


// create json web token - (Use for email and password circle app?)
export const createJWT = (user) => {
    const token = jwt.sign(                                     // token created by using..
        { id: user.id, username: user.username },               // users id and pass
        process.env.JWT_SECRET                                  // signed with JWT_SECRET 
    )   
    return token
}

// middleware for token authentication for route access
export const protect = (req, res, next) => {
    const bearer = req.headers.authorization                    // authorization scheme

    if(!bearer) {                                               // reject user without bearer token
        res.status(401)
        res.json({message: "Not Authorized"})   
        return
    }

    const [, token] = bearer.split(' ')                         // extract just token from bear

    if(!token) {                                                // reject user without token
        res.status(401)
        res.json({message: "Not Valid Token"})   
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)  // user created if token verified against acceptable string
        req.user = user                                         // requesting user is now this user (for iding)                         
        next()
    } catch (e) {                                               // otherwise reject
        console.error(e)
        res.status(401)
        res.json({message: "Not Valid Token"})   
        return
    }
}