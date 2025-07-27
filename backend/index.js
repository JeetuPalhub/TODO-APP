import express from  'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const app = express()

dotenv.config();

const PORT =process.env.PORT || 4001


//Database connection code
try {
  
} catch (error) {
  
}


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})