import { Router } from "express";

const userRoutes = Router();

import * as userCtrl from "../controllers/user.ctrl.js";
import verifyToken from "../validator/verifytoken.js";
import { itsAdmin, itsModeratorOrAdmin } from "../validator/itsPermise.js";
userRoutes.get("/", [verifyToken, itsAdmin], userCtrl.getUsers);

userRoutes.post("/", [verifyToken, itsAdmin], userCtrl.createUser);
userRoutes.delete("/", [verifyToken], userCtrl.deleteUser);
userRoutes.put("/", [verifyToken], userCtrl.updateUser);

export default userRoutes;
