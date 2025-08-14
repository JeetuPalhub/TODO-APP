import express from "express" // Helps us make routes for our app
import { login, logout, register } from "../controller/user.controller.js" // Bring in the functions that do login, logout, signup work

const router = express.Router() // Make a small package to hold our routes

router.post("/signup", register) // When someone sends data to /signup, run register
router.post("/login", login) // When someone sends data to /login, run login
router.get("/logout", logout) // When someone visits /logout, run logout

export default router // Share this routes package with the rest of the app
