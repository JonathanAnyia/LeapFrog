import User from "../models/user.model.js"
import cryptoHash from 'crypto'

export const getAllUsers = async ( req, res) =>{
    try {
        const allUsers = await User.find()
        if(!allUsers) {
            res.status(400).json({message: `no users found in database`})
        } else {
            res.status(200).json({message:`users found succesfully`, allUsers})
        }
    } catch( error) {
        removeEventListener.status(500).json({message: error.message})
        console.error(error);
    }
    }

    export const getSingleUser = async ( req, res) =>{
        try {
            const userId = req.params.id
            const singleUser = await User.findById(userId)
            if(!singleUser ) {
                res.status(400).json({ message: `no user found with such id: ${userId} found `})
            } else {
                res.status(200).json({ message: 'user found successfully', singleUser})
            }
            } catch(error) {
                res.status(500).json({message: error.message})
                console.error(error);
            }}

            export const deleteSingleUser = async( req, res) => {
                try{
                    const userId = req.params.id
                    const userToDelete = await User.findByIdAndDelete(userId)
                    if (!userToDelete) {
                        res.status(400).json({message: `no user with such id ${userId} found`})
                    } else{
                        res.status(200).json({message: `user deleted successfully`, userToDelete})
                    }
                } catch(error) {
                    res.status(500).json({message:error.message})
                    console.error(error);
                }
            }

            export const deleteAllUsers = async ( req, res) => {
                try {
                    const allUsers = await User.deleteMany()
                    if(!allUsers) {
                        res.status(400).json({message: 'no users found in database'})
                    } else {
                        res.status(200).json({message: 'Users found successfully', allUsers})
                    }
                } catch(error) {
                    res.status(500).json({message: error.message})
                    console.error(error);
                }
            }

            export const updateUser = async (req, res) => {
                try {
                const userId = req.params.id;
                const { password, ...rest } = req.body;
            
                if (password) {
                    const hashedPassword = cryptoHash.createHash('sha256').update(password).digest('hex');
            
                    const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { ...rest, password: hashedPassword },
                    { new: true }
                    );
            
                    if (!updatedUser) {
                    return res.status(404).json({ message: `User with id: ${userId} not found` });
                    }
            
                    return res.status(200).json({ message: 'User updated successfully', updatedUser });
                } else {
                    const updatedUser = await User.findByIdAndUpdate(userId, rest, { new: true });
            
                    if (!updatedUser) {
                    return res.status(404).json({ message: `User with id: ${userId} not found` });
                    }
            
                    return res.status(200).json({ message: 'User updated successfully', updatedUser });
                }
            
            }  catch (error) {
                console.error('Error while updating User:', error);
                res.status(400).json({ message: error.message });
              }};