import { NextFunction, Request, Response } from "express";

import { avatarConfig } from "../config";
import { ApiError } from "../errors";

class FileMiddleware {
  public async isAvatarValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (Array.isArray(req.files.avatar)) {
        throw new ApiError(
          "Avatar is not allowed to be an array of images",
          400,
        );
      }
      const { mimetype, size } = req.files.avatar;
      if (size > avatarConfig.MAX_SIZE) {
        throw new ApiError("File is too big", 400);
      }

      if (!avatarConfig.MIMETYPES.includes(mimetype)) {
        throw new ApiError("File has invalid format", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isImgValid(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.files.img;
      const files = Array.isArray(file) ? file : [file];

      files.forEach((file) => {
        const { mimetype, size } = file;

        if (size > avatarConfig.MAX_SIZE) {
          throw new ApiError("File is too big", 400);
        }

        if (!avatarConfig.MIMETYPES.includes(mimetype)) {
          throw new ApiError("File has invalid format", 400);
        }
      });

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
