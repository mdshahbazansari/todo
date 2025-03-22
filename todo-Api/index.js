import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

import mongoose from 'mongoose'
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('database connected'))
  .catch(() => console.log('db-connection failed'))

import express from 'express'
import bodyParser from 'body-parser'
import todoRouter from './todoCrud/todoRouter.js'
import cors from 'cors'

const app = express()
app.listen(PORT, () => {
  console.log(`server run on ${PORT}`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  cors({
    origin: '*',
  })
)

app.use('/todo', todoRouter)
