import User from '../Models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../Utils/error.js'; 
import Listing from '../Models/listingModel.js';

export const test = (req, res) => {
    res.json({
        message: 'Woelcome in our Real Estate website',
    });
};
//Update User
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your account!"));
  }

  try {
    const updateData = {};

    if (req.body.password) {
      updateData.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) updateData.username = req.body.username;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.avatar) updateData.avatar = req.body.avatar;
    if (req.body.phone) updateData.phone = req.body.phone;
    if (req.body.address) updateData.address = req.body.address;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found!"));
    }

    // fsheh password nga përgjigja
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


// Deactivate user
export const deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { isActive: false },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Activate user
export const activateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
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