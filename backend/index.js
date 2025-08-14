import express from 'express' // This helps us make a web server
import mongoose from 'mongoose' // This helps us talk to our MongoDB database
import dotenv from 'dotenv' // This helps us hide secret keys in a .env file

import todoRoute from "../backend/routes/todo.route.js" // Routes for todo tasks
import userRoute from "../backend/routes/user.route.js" // Routes for users

const app = express() // Makes our app so it can listen and respond
dotenv.config(); // Tells our app to read secrets from .env file

const PORT = process.env.PORT || 4001 // The number (port) where our app will run
const DB_URI = process.env.MONGODB_URI // The link to our database

// Connect to the database
try {
  await mongoose.connect(DB_URI) // Try to connect to the database
  console.log("Connected to MongoDB") // Yay! It worked
} catch (error) {
  console.log(error) // Oops! Something went wrong
}

// Use routes and middle stuff
app.use(express.json()) // Lets our app read JSON data
app.use("/todo", todoRoute) // If someone visits /todo, use todo routes
app.use("/user", userRoute) // If someone visits /user, use user routes

// Start the app
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`) // Tell us the app is running
})
