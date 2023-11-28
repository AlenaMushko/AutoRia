import { Router } from "express";

import { carController } from "../controllers";
import {
  authenticateMiddleware,
  carMiddleware,
  commonMiddleware,
} from "../middlewares";
import { fileMiddleware } from "../middlewares/file.middleware";
import { carSchema } from "../validations/carValidation";

const router = Router();
router.use(authenticateMiddleware.isLogin);

router.get("/owner", authenticateMiddleware.isLogin, carController.getAllOwner);

router.post(
  "/",
  authenticateMiddleware.isLogin,
  carMiddleware.userAccount,
  commonMiddleware.isBodyValid(carSchema.create),
  carController.create,
);

router.post(
  "/:carId/img",
  authenticateMiddleware.isLogin,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.findByIdByThrow,
  fileMiddleware.isImgValid,
  carController.uploadPhoto,
);

router.get(
  "/:carId",
  authenticateMiddleware.isLogin,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.findByIdByThrow,
  carController.findById,
);

router.put(
  "/:carId",
  authenticateMiddleware.isLogin,
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(carSchema.update),
  carMiddleware.findByIdByThrow,
  carMiddleware.isStatus,
  carController.updateById,
);

router.delete(
  "/:carId",
  authenticateMiddleware.isLogin,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.findByIdByThrow,
  carController.deleteById,
);

export const carRouter = router;
