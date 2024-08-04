import userModel from "../models/user.model.js";
import cloudinary from "../cloudinary.js";
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
    const { id } = req.params;
    const userId = req.userId;

    // Eliminar la imagen de Cloudinary
    const result = await cloudinary.uploader.destroy(id);
    if (result.result !== 'ok') {
      return res.status(400).json({ message: "Error deleting image from Cloudinary", error: result });
    }

    // Eliminar la imagen del array de imágenes del usuario
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.imgs = user.imgs.filter(img => img.idImg !== id);
    await user.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};



export { deleteImage, uploadImage,upload,uploadMultipleImages };