import { Router } from "express";
import verifytoken from "../validator/verifytoken.js";
import { itsAdmin, itsModeratorOrAdmin } from "../validator/itsPermise.js";
import rateLimit from "../middlewares/rateLimits.js";
import * as panelCtrl from "../controllers/panel.ctrl.js";
import verifyToken from "../validator/verifytoken.js";
const panelRoutes = Router();
panelRoutes.use(rateLimit);
panelRoutes.get("/", (req, res) => res.send("usted es admin"));

//ruta para eliminar imagenes siendo moderator o admin
panelRoutes.delete("/img/", [verifyToken], panelCtrl.deleteImage);

//ruta para eliminar usuario siendo admin
panelRoutes.delete("/user/:id", [verifyToken], panelCtrl.deleteUserByAdmin);

//ruta para cambiar roles
panelRoutes.put("/role",[verifyToken],panelCtrl.updateUser)
export default panelRoutes;
