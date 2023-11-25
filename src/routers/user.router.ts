import { Router } from "express";

import { userController } from "../controllers";
import { ERoles } from "../enums";
import {
  authenticateMiddleware,
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { userSchema } from "../validations";

const router = Router();
router.use(authenticateMiddleware.isLogin);

// router.get(
//   "/",
//   commonMiddleware.isQueryValid(userSchema.queryUserSchema),
//   userController.findAll,
// );

router.post(
  "/",
  authMiddleware.isMyRole(ERoles.Admin),
  commonMiddleware.isBodyValid(userSchema.create),
  userController.create,
);

// router.post(
//   "/:userId/avatar",
//   commonMiddleware.isIdValid("userId"),
//   fileMiddleware.isAvatarValid,
//   userController.uploadAvatar,
// );
//
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.findByIdByThrow,
  userController.findById,
);

router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(userSchema.updateUserSchema),
  userMiddleware.findByIdByThrow,
  userController.updateById,
);

router.delete(
  "/:userId",
authMiddleware.isMyRole(ERoles.Admin),
  commonMiddleware.isIdValid("userId"),
  userMiddleware.findByIdByThrow,
  userController.deleteById,
);

export const userRouter = router;
