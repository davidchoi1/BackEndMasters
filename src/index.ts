import * as dotenv from 'dotenv'                    // injects environment variables into server
dotenv.config()                                     // get environment vars from .env 
import config from './config'
import app from './server'

app.listen(config.port, () => {
    console.log(`Server started on http://localhost:${config.port}`)           // begin server
})