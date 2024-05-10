import cryptoHash from 'crypto';
import User from '../models/User.js';
import { signUpValidator, signInValidator } from '../validators/auth.validator.js';

export const signUp = async (req, res) => {
    const registerResults = signUpValidator.safeParse(req.body)
    if (!registerResults) {
        return res.status(400).json(formatZodError(registerResults.error.issues))
    }
    try {
        const user = await User.findOne({email:req.body.email})
        if (user) {
            res.status(409).json({messaage:'User with email already exists'})
        } else {
            const {
                name,
                userName,
                password,
                confirmPassword,
                email,
                phoneNumber,
                bio,
                gender
            } = req.body

            const newUser = new User({
                name,
                userName,
                password,
                confirmPassword,
                email,
                phoneNumber,
                bio,
                gender
            })
            await newUser.save()
            res.status(200).json({message: 'User registered succesfully',newUser})
            console.log('User registered succesfully',newUser);
        }
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log('INTERNAL SERVER ERROR',error.message)
    }
}

export const signIn = async (req, res, next) => {
    const logInResults = logInValidator.safeParse(req.body)
    if (!logInResults) {
        return res.status(400).json(formatZodError(logInResults.error.issues))
    }

    try {
        const {email, password} = req.body
        const user = await User.findOne((email))
        if  (!user) {
            return res.status(400).json({message: "User with email not found"})
        }
        const comparePass = comparePassword(password,{passsword})
        if(!comparePass) {
            return res.status(400).json({message:"Password is incorrect"})
        }
        const accessToken = generateTokenAndSetCookies(user.id)

        res.status(200).json({message:"User Login successful", user})
    }catch(error){
        res.status(500).json({message: error.message})
        console.log('INTERNAL SERVER ERROR',error.message)
    }
}

export const logout = async (req, res, next) => {

}