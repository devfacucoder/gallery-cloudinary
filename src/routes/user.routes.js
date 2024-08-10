import { Router } from "express";

const userRoutes = Router();

import * as userCtrl from "../controllers/user.ctrl.js";
import verifyToken from "../validator/verifytoken.js";
import { itsAdmin, itsModeratorOrAdmin } from "../validator/itsPermise.js";
userRoutes.get("/", [verifyToken], userCtrl.getUsers);

userRoutes.post("/", [verifyToken], userCtrl.createUser);
userRoutes.delete("/", [verifyToken,itsAdmin], userCtrl.deleteUser);
userRoutes.put("/", [verifyToken,itsAdmin], userCtrl.updateUser);

export default userRoutes;
