import { Router } from "express";

const userRoutes = Router();

import * as userCtrl from "../controllers/user.ctrl.js";

userRoutes.get("/",userCtrl.getUsers);

userRoutes.post("/",userCtrl.createUser);

export default userRoutes

