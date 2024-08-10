import userModel from "../models/user.model.js";
import roleModel from "../models/roles.model.js";
export const itsAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);
    const rol = await roleModel.findOne({ name: "admin" });
    if (!user.rol.equals(rol._id)) {
      console.log(user.rol);
      console.log(rol._id);
      return res.status(403).json({ message: "Require admin Role!" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const itsModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const moderatorRole = await roleModel.findOne({ name: "moderator" });
    const adminRole = await roleModel.findOne({ name: "admin" });

    if (!moderatorRole || !adminRole) {
      return res.status(404).json({ message: "Roles not found" });
    }

    if (user.rol.equals(moderatorRole._id) || user.rol.equals(adminRole._id)) {
      next(); // Permite pasar si es moderador o admin
    } else {
      return res.status(403).json({ message: "Require moderator or admin Role!" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


