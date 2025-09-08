import User from '../Models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../Utils/error.js'; 
import Listing from '../models/listingModel.js';

export const test = (req, res) => {
    res.json({
        message: 'Hello World',
    });
};
//Update User
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your account!"));
    }

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                }
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

// Delete User
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your own account!"));
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({ message: 'User has been deleted...' });
    } catch (error) {
        next(error);
    }
};
//Get Users Listings
export const getUserListing = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try{
            const listings=await Listing.find({userRef:req.params.id});
            res.status(200).json(listings);

        }catch (error) {
            next(error);
        }
    }else{
        return next(errorHandler(401, "You can only  view your own listings!"));

    }
}
export const getUser = async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(errorHandler(404, 'User not found!'));
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
      } catch (error ) {
        next(error);
      }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

//Change Password
export const resetPassword = async (req,res,next) => {
	try {
		log.info('Changing user password');

    const { newPassword } = req.body;
    const userId = req.params.id
    
    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }
const hashedPassword = await bcryptjs.hash(newPassword, 10);

    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Password changed successfully");
    return res.status(200).json({ message: "Password updated", user });
  } catch (error) {
    next(error);
  }
};