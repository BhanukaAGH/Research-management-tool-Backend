require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// rest of the packages
const morgan = require('morgan')
const cors = require('cors')

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

// middleware
const notFoundMiddleware = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/student', StudentRouter)
app.use('/users', userRouter)
app.use('/api/v1/topic', topicRouter)
app.use('/api/v1/evaluate', evaluationRouter)
app.use('/subtype', adminsubRoute) //admin create submissio n types
app.use('/markscheme', adminmarkscheme) //admin markscheme

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
