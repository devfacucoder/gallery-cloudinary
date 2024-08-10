import userModel from "../models/user.model.js";
import roleModel from "../models/roles.model.js";
import cloudinary from "../cloudinary.js";

import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
export const createUser = async (req, res) => {
  try {
    const { nickname, email, password, rol } = req.body;

    // Verificar si el email ya existe
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    const newUser = new userModel({
      nickname,
      email,
      rol: await roleModel.findOne({ name: rol }),
      password: await userModel.enCryptPassword(password),
    });
    const userSave = await newUser.save();
    console.log(userSave);
    const token = jwt.sign({ id: userSave._id }, process.env.SECRETJWT, {
      expiresIn: "2d",
    });

    res.status(201).json({ message: "Usuario creado", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Busca al usuario por ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Elimina todas las imágenes de Cloudinary
    for (const image of user.imgs) {
      await cloudinary.uploader.destroy(image.idImg);
    }

    // Elimina el usuario de la base de datos
    await userModel.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ message: "User and all images deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting the user and images" });
  }
};
export const updateUser = async (req,res) => {
 
  try {
    
    const userDB = await userModel.findByIdAndUpdate(req.params.idUpdate,req.body,{
      new:true
    })  
    res.status(200).json(userDB)

  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}