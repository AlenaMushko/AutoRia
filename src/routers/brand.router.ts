import { Router } from "express";
import { brandController } from "../controllers/brand.controller";
import { ERoles } from "../enums";
import { authenticateMiddleware, authMiddleware, carMiddleware, commonMiddleware } from "../middlewares";
import { brandSchema } from "../validations/brandValidation";

const router = Router();

router.post(
  "/",
  authenticateMiddleware.isLogin,
  authMiddleware.isMyRole(ERoles.Admin),
  commonMiddleware.isBodyValid(brandSchema.create),
  carMiddleware.isBrand,
  brandController.create,
);

router.get(
  "/",
  brandController.findAll,
);

router.get(
  "/:brandId",
  commonMiddleware.isIdValid("brandId"),
  carMiddleware.findByIdBrandByThrow,
  brandController.findById,
);

router.delete(
  "/:brandId",
  authenticateMiddleware.isLogin,
  authMiddleware.isMyRole(ERoles.Admin),
  commonMiddleware.isIdValid("brandId"),
  carMiddleware.findByIdBrandByThrow,
  brandController.deleteById,
);

export const brandRouter = router;
