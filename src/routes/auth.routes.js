import { Router } from "express";
const authRoutes = Router();
import  * as authCtrl from '../controllers/auth.ctrl.js';

authRoutes.post("/login",authCtrl.singIn)
authRoutes.post("/register",authCtrl.singUp)
export default authRoutes;