import { Router } from "express";
import verifytoken from '../validator/verifytoken.js'
const authRoutes = Router();
import  * as authCtrl from '../controllers/auth.ctrl.js';

authRoutes.post("/login",authCtrl.singIn)
authRoutes.post("/register",authCtrl.singUp)

authRoutes.post("/verifyemail",[verifytoken],authCtrl.verifyEmail)

export default authRoutes;