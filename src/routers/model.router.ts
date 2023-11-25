import { Router } from "express";

import { modelController } from "../controllers/model.controller";
import { ERoles } from "../enums";
import {
  authenticateMiddleware,
  authMiddleware,
  carMiddleware,
  commonMiddleware,
} from "../middlewares";
import { modelSchema } from "../validations/modelValidation";

const router = Router();

router.post(
  "/",
  authenticateMiddleware.isLogin,
  authMiddleware.isMyRole(ERoles.Admin),
  commonMiddleware.isBodyValid(modelSchema.create),
  carMiddleware.isModel,
  modelController.create,
);

router.get(
  "/all/:brandId",
  commonMiddleware.isIdValid("brandId"),
  carMiddleware.findByIdBrandByThrow,
  modelController.findAllByBrand,
);

router.get(
  "/:modelId",
  commonMiddleware.isIdValid("modelId"),
  carMiddleware.findByIdModelByThrow,
  modelController.findById,
);

router.put(
  "/:modelId",
  authenticateMiddleware.isLogin,
  authMiddleware.isMyRole(ERoles.Admin),
  commonMiddleware.isIdValid("modelId"),
  commonMiddleware.isBodyValid(modelSchema.update),
  carMiddleware.findByIdModelByThrow,
  modelController.updateById,
);

router.delete(
  "/:modelId",
  authenticateMiddleware.isLogin,
  authMiddleware.isMyRole(ERoles.Admin),
  commonMiddleware.isIdValid("modelId"),
  carMiddleware.findByIdModelByThrow,
  modelController.deleteById,
);

export const modelRouter = router;
