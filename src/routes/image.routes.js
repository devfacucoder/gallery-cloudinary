import express from "express";
import { upload, uploadImage, deleteImage } from "../controllers/image.ctrl.js"; // Importar las funciones correctamente
import verifyToken from "../validator/verifytoken.js";
const imageRouter = express.Router();

imageRouter.post("/upload", [verifyToken, upload.single("image")], uploadImage);
imageRouter.delete("/delete/:id", [verifyToken], deleteImage);

export default imageRouter;
