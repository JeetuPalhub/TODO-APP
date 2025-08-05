import User from "../model/user.model.js"
import { z } from"zod"
import bcrypt from "bcrypt"
import { generateTokenAndsaveInCookies } from "../jwt/token.js"

const userSchema=z.object({
    email:z.string().email({message:"Invalid email address"}),
    username:z.string().min(3,{message:"Username atleast 3 character long"}),
    password:z.string().min(6,{message:"password atleast 6 character long"})  
})

export const register=async(req,res)=>{
    try {
        const { email, username, password } =req.body

        if(!email || !username || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        const validation= userSchema.safeParse({email, username, password})
        if(!validation.success){
            // return res.status(400).json({errors: validation.error.errors})
            const errorMessage=validation.error.errors.map((err)=>err.message)
            return res.status(400).json({errors:errorMessage})
        }

        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message: "User already registered"})
        }
        const hashPassword=await bcrypt.hash(password,10)
        const newUser = new User({ email, username, password:hashPassword})
        await newUser.save()
        if(newUser){
            generateTokenAndsaveInCookies()
            res.status(201).json({message: "User registered successfully", newUser})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error registering user"})
    }
}

export const login= async(req,res)=>{
    const{ email, password } = req.body
try {
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    const user = await User.findOne({email}).select("+password")
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({message:"Invalid email or password"})
}
res.status(200).json({message: "User logged in successfully", user})
} catch (error) {
    console.log(error)
    res.status(500).json({message: "Error logging user"})
}
}

export const logout=(req,res)=>{
    console.log("Logout function called")
}