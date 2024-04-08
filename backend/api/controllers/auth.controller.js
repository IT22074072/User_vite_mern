import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import EmailSender from '../utils/EmailSender/EmailSender.js';
import passwordReset from '../utils/EmailSender/RePasswordTemp.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
    const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "This email does not exist." });
    // Proceed with password reset logic
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// create reset-password
export const resetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(200).json({ message: "Email not provided", code: 404 });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: "User not found", code: 404 });

    const token = Math.random().toString(36).slice(-8);
    const expireDate = Date.now() + 360000;
    EmailSender.sendVerificationEmail(user, token, passwordReset(token), "Password Reset", async () => {
      const result = await User.updateOne(
        { email },
        { $set: { resetPasswordToken: token, resetPasswordExpire: expireDate } }
      );
      if (!result) return res.status(200).json({ message: "Failed to update user", code: 404 });
    }, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", code: 500 });
  }
};

// verify reset-password with token
export const verifyResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) return res.status(200).json({ message: "Password not provided",code:"403" });

  try {
    if (!token) return res.status(200).json({ message: "Token not provided",code:"403" });

    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) return res.status(200).json({ message: "Invalid token",code:"403" });

    const tokenExpire = await User.findOne({ resetPasswordExpire: { $gt: Date.now() } });
    if (!tokenExpire) return res.status(200).json({ message: "Token expired",code:"403" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const result = await User.updateOne(
      { resetPasswordToken: token },
      { $set: { resetPasswordToken: "", resetPasswordExpire: "", password: hashedPassword } }
    );

    if (result.modifiedCount === 0) return res.status(500).json({ error: "Failed operation" });
    return res.status(201).json({ message: "Password reset successfully" ,code:"200"});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error",code:"505"});
  }
};

