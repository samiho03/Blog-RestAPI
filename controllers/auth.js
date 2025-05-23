const {User, File} = require("../models")
const hashPassword = require("../utils/hashPassword")
const comparePassword = require("../utils/comparePassword")
const generateToken = require("../utils/generateToken")
const generateCode = require("../utils/generateCode")
const sendEmail = require("../utils/sendEmail")


const signup = async(req,res,next) =>{
    try {
        const {name, email, password, role} = req.body

        const isEmailExist = await User.findOne({email})
        if(isEmailExist){
           res.code = 400
           throw new Error("Email already exist")
        }

        const hashedPassword = await hashPassword(password)

        const newUser = new User({name, email, password: hashedPassword, role})

        await newUser.save()

        res.status(201).json({code:201, status: true, message:"User registered successfully"})

    } catch (error) {
        next(error)
    }
}

const signin = async(req,res,next) =>{
    try {

        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.code = 401
            throw new Error("Invalid credentials")
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            res.code = 401
            throw new Error("Invalid credentials")
        }

        const token = generateToken(user)

        res.status(200).json({code:200, status: true, message:"User logged in successfully",data: {token}})

    } catch (error) {
        next(error)
    }
}

//verify code for email verification

const verifyCode = async(req,res,next) =>{
    try {
        const {email} = req.body

        const user = await User.findOne({email})
        if(!user){
            res.code = 404
            throw new Error("User not found")
        }
        if(user.isVerified){
            res.code = 400
            throw new Error("User already verified")
        }

        const code = generateCode(6)

        user.verificationCode = code
        await user.save()

        //send email
        await sendEmail(
            user.email,
            "Email verification code",
            code,
            "verify your account"
        )
        res.status(200).json({code:200, status: true, message:"Verification code sent successfully"})
    } catch (error) {
        next(error)
    }
}

const verifyUser = async(req,res,next) =>{
    try {
       const {email, code} = req.body

       const user = await User.findOne({email})

       if(!user){
        res.code = 404
        throw new Error("User not found")
       }

       if(user.verificationCode !== code){
        res.code = 400
        throw new Error("Invalid code")
       }

       user.isVerified = true
       user.verificationCode = null
       await user.save()

       res.status(200).json({code:200, status: true, message: "User verified successfully"})
    } catch (error) {
        next(error)
    }
}

const forogotPasswordCode = async(req,res,next) =>{
    try {
       const {email}  = req.body

       const user = await User.findOne({email})
       if(!user){
        res.code = 404
        throw new Error("User not found")
       }

       const code = generateCode(6)
       user.forgotPasswordCode = code
       await user.save()

       await sendEmail(
        user.email,
        "Forgot password code",
        code,
        "Change your password"
       )

        res.status(200).json({code:200, status: true, message: "Forgot password code sent successfully"})
    } catch (error) {
        next(error)
    }
}

const recoverPassword = async(req,res,next) =>{
    try {
        const{email, code, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            res.code = 404
            throw new Error("User not found")
        }
        if(user.forgotPasswordCode !== code){
            res.code = 400
            throw new Error("Invalid code")
        }

        if(user.password === password){
            res.code = 400
            throw new Error("New password should be different from the old password")
        }   

        const hashedPassword = await hashPassword(password)
        user.password = hashedPassword
        user.forgotPasswordCode = null
        await user.save()

        res.status(200).json({code:200, status: true, message:"Password changed successfully"})

    } catch (error) {
        next(error)
    }
}

const changePassword = async(req,res,next) =>{
    try {
        const {oldPassword, newPassword} = req.body
        const {_id} = req.user
        const user = await User.findById(_id)

        if(!user){
            res.code = 404
            throw new Error("User not found")
        }

        const match = await comparePassword(oldPassword, user.password)
        if(!match){
            res.code = 400
            throw new Error("Invalid old password")
        }

        if(oldPassword === newPassword){
            res.code = 400
            throw new Error("New password should be different from the old password")
        }

        const hashedPassword = await hashPassword(newPassword)
        user.password = hashedPassword
        await user.save()

        res.status(200).json({code:200, status: true, message:"Password changed successfully"})
    } catch (error) {
        next(error)
    }
}

const updateProfile = async(req,res,next) =>{
    try {
        const {_id} = req.user
        const {name, email, profilePic} = req.body

        const user = await User.findById(_id).select("-password -verificationCode -forgotPasswordCode")
        
        if(!user){
            res.code = 404
            throw new Error("User not found")
        }

        if(email){
            const isUserExist = await User.findOne({email})
            if(isUserExist && isUserExist.email == email && String(user._id) !== String(isUserExist._id)){
                res.code = 400
                throw new Error("Email already exist")
            }
        }

        if(profilePic){
            const file = await File.findById(profilePic)
            if(!file){
                res.code = 404
                throw new Error("File not found")
            }
        }
        user.name = name ? name : user.name
        user.email = email ? email : user.email
        user.profilePic = profilePic

        if(email){
            user.isVerified = false
        }


        await user.save()

        res.status(200).json({code:200, status: true, message:"Profile updated successfully", data: {user}})
    } catch (error) {
        next(error)
    }
}

const currentUser = async(req,res,next) =>{
    try {
        const {_id} = req.user

        const user = await User
            .findById(_id)
            .select("-password -verificationCode -forgotPasswordCode")
            .populate("profilePic")

        if(!user){
            res.code = 404
            throw new Error("User not found")
        }

        res.status(200).json({code:200, status: true, message:"User found successfully", data: {user}})
    } catch (error) {
        next(error)
    }
}
   
    
module.exports = {signup, signin, verifyCode, verifyUser, forogotPasswordCode, recoverPassword, changePassword, updateProfile, currentUser}