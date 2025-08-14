import mongoose from "mongoose" // Helps us talk to the MongoDB database

// Make a blueprint (schema) for how a user should look
const userSchema = new mongoose.Schema({
    username: {
        type: String, // Username is text
        required: true // We must have it
    },
    email: {
        type: String, // Email is text
        required: true, // We must have it
        unique: true // No two users can have the same email
    },
    password: {
        type: String, // Password is text
        required: true, // We must have it
        select: false // Hide it when we get user info (for safety)
    }
})

// Make a "User" collection in the database using the blueprint
const User = mongoose.model("User", userSchema)

// Share User so other files can use it
export default User
