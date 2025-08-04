import User from "../model/user.model.js"
import {email, z} from"zod"
const userSchema=z.object({
    email:z.string().email({message:"Invalid email address"}),
    username:z.string().min(3,{message:"Username atleast 3 character long"}),
    password:z.string().min(6,{message:"password atleast 6 character long"})  
})

export const register=async(req,res)=>{
    try {
        const { email, username, password } =req.body
        // console.log(email, username, password) 

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
        const newUser = new User({ email, username, password})
        await newUser.save()
        if(newUser){
            res.status(201).json({message: "USer registered successfully", newUser})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error registering user"})
    }
}

export const login=(req,res)=>{
    console.log("Login function called")
}

export const logout=(req,res)=>{
    console.log("Logout function called")
}