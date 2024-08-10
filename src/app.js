import express from "express";
const app = express();
import { createRoles } from "./createRoles.js";
import userRoutes from "./routes/user.routes.js";
import imageRouter from "./routes/image.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
createRoles()
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/image/", imageRouter);
app.use("/api/auth", authRoutes);
/**
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader
      .upload_stream((error, result) => {
        if (error) {
          return res
            .status(400)
            .json({ message: "Error uploading image", error });
        }
        res.status(200).json(result);
      })
      .end(req.file.buffer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error", error });
  }
});

*/

export default app;
