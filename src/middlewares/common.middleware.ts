import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import mongoose from "mongoose";

import { ApiError } from "../errors";
import { IQuery } from "../types";

class CommonMiddleware {
  public isIdValid(fileId: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[fileId];

        if (!mongoose.isObjectIdOrHexString(id)) {
          throw new ApiError("Not valid Id", 400);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);

        if (error) {
          const errorMessage = error.message;
          throw new ApiError(errorMessage, 400);
        }

        req.body = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isQueryValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const query = req.query as IQuery;
        const { error, value } = validator.validate(query);

        if (error) {
          throw new ApiError("Query is not valid", 400);
        }

        req.query = value;

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
