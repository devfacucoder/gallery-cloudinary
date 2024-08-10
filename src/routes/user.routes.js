import { Router } from "express";

const userRoutes = Router();

import * as userCtrl from "../controllers/user.ctrl.js";
import verifyToken from "../validator/verifytoken.js";
import { itsAdmin } from "../validator/itsPermise.js";
userRoutes.get("/", [verifyToken, itsAdmin], userCtrl.getUsers);

userRoutes.post("/", userCtrl.createUser);
//
export default userRoutes;
