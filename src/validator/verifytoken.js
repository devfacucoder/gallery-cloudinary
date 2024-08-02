import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import dotenv from 'dotenv'
dotenv.config()
const verifyToken = async (req, res, next) => {
    try {
      const token = req.headers["x-access-token"];
      if (!token) return res.status(400).json({ message: "no token provider" });
      const decoded = jwt.verify(token, process.env.SECRETJWT);
      req.userId = decoded.id
      const userDB = await userModel.findById(req.userId, { password: 0 });
      if (!userDB) return res.status(400).json({ message: "not found" });
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "error" });
  
    }
  };
  export default verifyToken