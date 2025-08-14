import User from "../model/user.model.js" // Bring in the User model to work with users in the database
import { z } from "zod" // Helps us check (validate) if user input is correct
import bcrypt from "bcrypt" // Helps us hide (hash) passwords so they are safe
import { generateTokenAndsaveInCookies } from "../jwt/token.js" // Makes a token and stores it in cookies

// Rules for what a user's data should look like
const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }), // Email must look like an email
    username: z.string().min(3, { message: "Username atleast 3 character long" }), // Username must be at least 3 letters
    password: z.string().min(6, { message: "password atleast 6 character long" }) // Password must be at least 6 letters
})

// Signup function
export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body // Get details sent by the user

        if (!email || !username || !password) { // If something is missing
            return res.status(400).json({ message: "All fields are required" }) // Tell them to fill all fields
        }

        const validation = userSchema.safeParse({ email, username, password }) // Check if data follows the rules
        if (!validation.success) { // If rules are broken
            const errorMessage = validation.error.errors.map((err) => err.message) // Get error messages
            return res.status(400).json({ errors: errorMessage }) // Send them back
        }

        const user = await User.findOne({ email }) // Check if email is already used
        if (user) {
            return res.status(400).json({ message: "User already registered" }) // Tell them email is taken
        }

        const hashPassword = await bcrypt.hash(password, 10) // Hide password by hashing
        const newUser = new User({ email, username, password: hashPassword }) // Make a new user
        await newUser.save() // Save user in the database

        if (newUser) {
            generateTokenAndsaveInCookies() // Make token and store in cookies (login user)
            res.status(201).json({ message: "User registered successfully", newUser }) // Tell them it worked
        }
    } catch (error) {
        console.log(error) // Show error in console
        res.status(500).json({ message: "Error registering user" }) // Tell them it failed
    }
}

// Login function
export const login = async (req, res) => {
    const { email, password } = req.body // Get login details
    try {
        if (!email || !password) { // If something is missing
            return res.status(400).json({ message: "All fields are required" }) // Tell them to fill all fields
        }

        const user = await User.findOne({ email }).select("+password") // Find user and also get their password
        if (!user || !(await bcrypt.compare(password, user.password))) { // If no user or wrong password
            return res.status(400).json({ message: "Invalid email or password" }) // Tell them it's wrong
        }

        res.status(200).json({ message: "User logged in successfully", user }) // Tell them it worked
    } catch (error) {
        console.log(error) // Show error in console
        res.status(500).json({ message: "Error logging user" }) // Tell them it failed
    }
}

// Logout function
export const logout = (req, res) => {
    console.log("Logout function called") // Just a placeholder for now
}
