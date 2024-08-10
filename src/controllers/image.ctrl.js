import userModel from "../models/user.model.js";
import cloudinary from "../libs/cloudinary.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadImage = async (req, res) => {
  try {
    console.log(req.userId);
    const uploadStream = cloudinary.uploader.upload_stream(async (error, result) => {
      if (error) {
        return res.status(400).json({ message: "Error uploading image", error });
      }

      // Agregar la URL de la imagen y el ID al array de imágenes del usuario
      const user = await userModel.findById(req.userId);
      user.imgs.push({
        urlImg: result.secure_url,
        idImg: result.public_id
      });
      await user.save();

      res.status(200).json(result);
    });

    // End the upload stream with the file buffer
    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
const uploadMultipleImages = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        });

        uploadStream.end(file.buffer);
      });
    });

    const results = await Promise.all(uploadPromises);
    
    // Agregar las imágenes al array del usuario
    results.forEach(result => {
      user.imgs.push({ urlImg: result.secure_url, idImg: result.public_id });
    });
    
    await user.save();

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteImage = async (req, res) => {
  try {
    const { userId, imageId } = req.params;

    // Busca al usuario por ID
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Busca la imagen en el array imgs del usuario
    const image = user.imgs.find(img => img.idImg === imageId);
    if (!image) {
      return res.status(403).json({ message: "Image not found or not authorized to delete this image" });
    }

    // Si la imagen pertenece al usuario, procede a eliminarla
    // Si usas Cloudinary, elimina la imagen de Cloudinary
    await cloudinary.uploader.destroy(image.idImg);

    // Elimina la imagen del array imgs en el userModel
    user.imgs = user.imgs.filter(img => img.idImg !== imageId);
    await user.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting the image" });
  }
};



export { deleteImage, uploadImage,upload,uploadMultipleImages };