import express from "express";
const app = express();
const PORT = 5000 || process.env.PORT;
import cloudinary from "./cloudinary.js";
import multer from "multer";
app.get("/", (req, res) => {
  res.send("hello cloudinary");
});
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

app.delete("/delete/:id", async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.id);
    console.log("Imagen eliminada:", result);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`abierto cloudnidary en http://localhost:${PORT}`);
});
