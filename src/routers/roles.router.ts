import { Router } from "express";

import { roleController } from "../controllers/role.controller";
import { ERoles } from "../enums";
import { authenticateMiddleware, authMiddleware } from "../middlewares";

const router = Router();
router.use(authenticateMiddleware.isLogin);
router.use(authMiddleware.isMyRole(ERoles.Admin));

router.post("/", roleController.create);

router.get("/:roleId", roleController.findById);

router.put("/:roleId", roleController.updateByIdPut);

router.delete("/:roleId", roleController.deleteById);

export const roleRouter = router;
