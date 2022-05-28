require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// rest of the packages
const morgan = require('morgan')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

// database
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoutes')
const StudentRouter = require('./routes/studentRoutes')
const userRouter = require('./routes/userRoutes')
const topicRouter = require('./routes/topicRoutes')
const adminsubRoute = require('./routes/adminSubRoutes') //admin subtype routes
const adminmarkscheme = require('./routes/adminMarkSchemeRoutes') //admin marchscheme router
const evaluationRouter = require('./routes/evaluationRoutes')
const submissionRouter = require('./routes/submissionRoutes')

// middleware
const notFoundMiddleware = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
) // limit request from each ip address
app.use(helmet()) // set security related http headers
app.use(cors()) // allow cross origin requests
app.use(xss()) // sanitize user inputs
app.use(mongoSanitize()) // protect against MongoDB injection
app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/student', StudentRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/topic', topicRouter)
app.use('/api/v1/evaluate', evaluationRouter)
app.use('/api/v1/submission', submissionRouter)
app.use('/api/v1/subtype', adminsubRoute)
app.use('/api/v1/markscheme', adminmarkscheme)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
