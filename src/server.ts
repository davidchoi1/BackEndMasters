import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'

// make api
const app = express()

// middleware
app.use(cors())                                 // configuration for security access
app.use(morgan('dev'))                          // use middleware morgan
app.use(express.json())                         // allows client to send json to server
app.use(express.urlencoded({extended: true}))   // allows client to send query code


app.get('/', (req, res, next) => {
    res.json({message: 'hello'})
})

// app use router route (protected by token auth middleware)
app.use('/api', protect, router)      

app.post('/user', createNewUser)                        // /user route creates new user
app.post('/signin', signin)                             // /signin route allows signin

app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({message: 'unauthorized'})
    } else if (err.type === 'input') {
        res.status(400).json({message: 'invalid input'})
    } else {
        res.status(500).json({message: 'oopsie, that is on us'})
    }
})

export default app