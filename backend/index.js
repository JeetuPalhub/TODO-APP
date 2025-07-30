import express from  'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import todoRoute from "../backend/routes/todo.route.js"

const app = express()
dotenv.config();

const PORT =process.env.PORT || 4001
const DB_URI=process.env.MONGODB_URI

//Database connection code
try {
  await mongoose.connect(DB_URI)
   console.log("Connected to MongoDB")
} catch (error) {
  console.log(error)
}

//routes
app.use(express.json())
app.use("/todo", todoRoute)


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})