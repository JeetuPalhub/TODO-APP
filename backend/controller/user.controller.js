import User from "../model/user.model.js"

export const register=async(req,res)=>{
    try {
        const { email, username, password } =req.body
        // console.log(email, username, password) 

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