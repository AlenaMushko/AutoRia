import { Router } from "express";
import { modelController } from "../controllers/model.controller";
import { ERoles } from "../enums";
import { authenticateMiddleware, authMiddleware, carMiddleware, commonMiddleware } from "../middlewares";
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
//
// router.get(
//   "/",
//   brandController.findAll,
// );
//
// router.get(
//   "/:brandId",
//   commonMiddleware.isIdValid("brandId"),
//   carMiddleware.findByIdBrandByThrow,
//   brandController.findById,
// );
//
// router.put(
//   "/:userId",
//   commonMiddleware.isIdValid("userId"),
//   commonMiddleware.isBodyValid(modelSchema.update),
//   userMiddleware.findByIdByThrow,
//   userController.updateById,
// );
//
//
// router.delete(
//   "/:brandId",
//   authenticateMiddleware.isLogin,
//   authMiddleware.isMyRole(ERoles.Admin),
//   commonMiddleware.isIdValid("brandId"),
//   carMiddleware.findByIdBrandByThrow,
//   brandController.deleteById,
// );

export const modelRouter = router;
