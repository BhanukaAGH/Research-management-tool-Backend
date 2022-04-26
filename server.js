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

const userRouter = require('./routes/userRoutes') //ADMIN USER managment RIVINDU

const topicRouter = require('./routes/topicRoutes')


// middleware
const notFoundMiddleware = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/v1/auth', authRouter)

app.use('/users', userRouter)//ADMIN USER managment RIVINDU

app.use('/api/v1/topic', topicRouter)


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
