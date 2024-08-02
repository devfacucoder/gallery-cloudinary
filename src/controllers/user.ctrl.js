import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
const createUser = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    
    // Verificar si el email ya existe
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    const newUser = new userModel({
      nickname,
      email,
      password: await userModel.enCryptPassword(password),
    });

    const userSave = await newUser.save();
    const token = jwt.sign({ id: userSave._id }, process.env.SECRETJWT, { expiresIn: '1h' });

    res.status(201).json({ message: "Usuario creado", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export { getUsers,createUser };
