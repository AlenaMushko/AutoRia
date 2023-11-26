import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { IUser } from "../types";

class UserController {
  // public async findAll(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<Response<IUser[]>> {
  //   try {
  //     const users = await userService.findWithPagination(
  //       req.query as unknown as IQuery,
  //     );
  //
  //     return res.status(200).json({data: users});
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const newUser = await userService.create(req.body);

      return res
        .status(201)
        .json({ message: "User is created", data: newUser });
    } catch (error) {
      next(error);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const user = res.locals.user;

      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const user = res.locals.user;
      const value = req.body;
      const updatedUser = await userService.updateById(userId, user, value);

      return res
        .status(200)
        .json({ message: "User is updated", data: updatedUser });
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      await userService.deleteById(userId);

      return res.status(200).json({ message: `User id=${userId} is deleted` });
    } catch (e) {
      next(e);
    }
  }

  public async emailToManager(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const user = res.locals.user;
      await userService.emailToManager(user, req.body.text);
      return res.status(200).json({ message: 'email is sending for manager' });
    } catch (e) {
      next(e);
    }
  }

  public async emailToAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const user = res.locals.user;
      await userService.emailToAdmin(user, req.body.text);
      return res.status(200).json({ message: 'email is sending for manager' });
    } catch (e) {
      next(e);
    }
  }

  public async buyPremium(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const user = res.locals.user;
      await userService.emailToAdmin(user, req.body.text);
      return res.status(200).json({ message: 'email is sending for manager' });
    } catch (e) {
      next(e);
    }
  }

  //
  // public async uploadAvatar(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<Response<IUser>> {
  //   try {
  //     const { userId } = req.params;
  //     const avatar = req.files.avatar as UploadedFile;
  //
  //     const user = await userService.uploadAvatar(avatar, userId);
  //
  //     const presenterUser = userPresenter.present(user);
  //
  //     return res.status(200).json({data: presenterUser});
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export const userController = new UserController();
