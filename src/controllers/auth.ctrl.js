import userModel from "../models/user.model.js";
import dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken";
 const singUp = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    const newUserDB = new userModel({
      nickname,
      email,
      password: await userModel.enCryptPassword(password),
    });
    
    
    const newUserDBSave = await newUserDB.save();
    const token = jwt.sign({ id: newUserDBSave._id }, process.env.SECRETJWT, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).json({token});
  } catch (error) {
    console.log(error);
  }
};
 const singIn = async (req, res) => {
    try {
      const userFound = await userModel.findOne({ email: req.body.email })
      if (!userFound) {
        return res.status(400).json({ message: "user or password incorrect" });
      }
      const machtPassword = await userModel.comparePassword(
        req.body.password,
        userFound.password
      );
      if (!machtPassword) {
        return res.status(400).json({ message: "user or password incorrect" });
      }
  
      const token = jwt.sign({ id: userFound._id }, process.env.SECRETJWT, {
        expiresIn: 86400, //24 hours
      });
  
      res.status(200).json({token});
    } catch (error) {
      console.log(error);
    }
  };
export {singUp,singIn}