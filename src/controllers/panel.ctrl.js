import userModel from "../models/user.model.js";
import roleModel from '../models/roles.model.js'
export const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const userdb = await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "usuario eliminado" });
  } catch (error) {
    console.log(error);
  }
};
export const deleteImage = async (req, res) => {
  try {
    
    const { user,imageId } = req.body;
    // Busca al usuario por ID
    const userDb = await userModel.findById(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Busca la imagen en el array imgs del usuario
    const image = user.imgs.find((img) => img.idImg === imageId);
    if (!image) {
      return res
        .status(403)
        .json({
          message: "Image not found or not authorized to delete this image",
        });
    }

    // Si la imagen pertenece al usuario, procede a eliminarla
    // Si usas Cloudinary, elimina la imagen de Cloudinary
    await cloudinary.uploader.destroy(image.idImg);

    // Elimina la imagen del array imgs en el userModel
    user.imgs = user.imgs.filter((img) => img.idImg !== imageId);
    await user.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting the image" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { idUser, newRole } = req.body;

    // Verifica si el nuevo rol existe en la base de datos
    const role = await roleModel.findOne({ name: newRole });
    if (!role) {
      return res.status(400).json({ message: "El rol no existe" });
    }

    // Actualiza el rol del usuario
    const userDB = await userModel.findByIdAndUpdate(
      idUser,
      { rol: role._id },
      { new: true }
    );

    if (!userDB) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Rol actualizado con éxito", userDB });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar el rol", error });
  }
};