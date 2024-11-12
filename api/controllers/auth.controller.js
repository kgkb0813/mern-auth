import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword }); 
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error.message);
    // next(errorHandler(300, "somthing went wrong...")); <-------- Custom ErrorNumber/ErrorMessage 생성
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res.cookie('access_token', token, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8), // req.body.name에 포함된 빈칸을 삭제한 후 소문자로 변환 후, 8개의 임의 문자열과 합친다 
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;  // 비번을 제외시킨 후, rest에 저장
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res.cookie('access_token', token, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json(rest);  // 비번을 제회한 정보를 return
    }
  } catch (error) {
    next(error);
  }
};

// export const signout = (req, res) => {
//   res.clearCookie('access_token').status(200).json('Signout success!');
// };
