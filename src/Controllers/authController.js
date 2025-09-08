
import User from '../Models/userModel.js'; 
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import {errorHandler}  from '../Utils/error.js';

export const signup = async (req, res,next ) => {
  const { username, email, password } = req.body;
  const hashedPassword =bcryptjs.hashSync(password,10);
  const newUser =new User({username,email,password:hashedPassword});
try{
    await newUser.save();
    res.status(201).json('User created sucesfully!');

}catch (error){
    next(error);
}
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    // Check password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // Generate JWT including role
    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: pass, ...rest } = validUser._doc;

    const isAdmin = rest.role === "admin";

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ user: rest, token, isAdmin });

  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { email, name, photo } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      const { password, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true, sameSite: "lax" })
        .status(200)
        .json(rest);

    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        avatar: photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      const { password, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, { httpOnly: true, sameSite: "lax" })
        .status(201)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
export const signout = (req, res,next) => {
  try{
    res
    .clearCookie('access_token') 
    .status(200) .json({ message: 'User has been signed out successfully.' });
  }catch  (eroor)
  {
    next(eroor)
}
}

