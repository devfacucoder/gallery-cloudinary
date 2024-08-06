import userModel from "../models/user.model.js";
import { transport } from "../nodEmailer.js";
import config from '../config.js'
import jwt from "jsonwebtoken";
const singUp = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    const newUserDB = new userModel({
      nickname,
      email,
      password: await userModel.enCryptPassword(password),
      codeVerify: await userModel.generateVerificationCode(),
    });

    const newUserDBSave = await newUserDB.save();

    //verify email
    await transport.sendMail({
      from: "Cloudinary app ", // sender address
      to: newUserDBSave.email, // list of receivers
      subject: "verificando email", // Subject line
      text: "Hello world?", // plain text body
      html: `<h1>CloudImagenes tu codigo de verificacion es: ${newUserDBSave.codeVerify}</h1>`, // html body
    });

    const token = jwt.sign({ id: newUserDBSave._id }, config.secret_jwt, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};
const singIn = async (req, res) => {
  try {
    const userFound = await userModel.findOne({ email: req.body.email });
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

    const token = jwt.sign({ id: userFound._id }, config.secret_jwt, {
      expiresIn: 86400, //24 hours
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const code = req.body.code;
    const userDB = await userModel.findOne({ _id: req.userId });
    if (!(userDB.codeVerify === code)) {
      return res.status(405).json({ mensage: "codigo incorrecto" });
    }
    userDB.isVerified = true
    await userDB.save();
    res.status(201).json({ message: "Email verificado" });
  } catch (error) {
    console.log(error);
  }
};

export { singUp, singIn,verifyEmail };
