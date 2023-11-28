import { UploadedFile } from "express-fileupload";

import { configs } from "../config";
import { EEmailAction, EFileTypes } from "../enums";
import { ApiError } from "../errors";
import { EActionActivatedTokenTypes } from "../models";
import {
  authRepository,
  roleRepository,
  userRepository,
} from "../repositories";
import { IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { s3Service } from "./s3.service";
import { tokenService } from "./token.service";

class UserService {
  public async create(value: IUser): Promise<IUser> {
    try {
      const actionToken = tokenService.generateVerifyToken(
        value.email,
        EActionActivatedTokenTypes.Activated,
      );

      const hashadPassword = await passwordService.hash(value.password);

      const { _id } = await roleRepository.getOneByParams({
        name: value._roleId,
      });

      const [user] = await Promise.all([
        authRepository.register(value, hashadPassword, _id.toString()),
        authRepository.actionToken(
          value,
          actionToken,
          EActionActivatedTokenTypes.Activated,
        ),
      ]);

      await emailService.sendEmail(value.email, EEmailAction.REGISTER, {
        name: value.name + ", " || " ",
        actionToken,
      });
      return user;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateById(
    userId: string,
    user: IUser,
    value: Partial<IUser>,
  ): Promise<IUser> {
    try {
      const { _id } = await roleRepository.getOneByParams({
        name: value._roleId,
      });
      const _roleId: string = _id.toString();
      const lastVisited = new Date();
      const updatedValue = {
        ...value,
        _roleId,
        lastVisited,
        updatedAt: new Date(),
      };
      const updatedUser = Object.assign(user, updatedValue);

      return await userRepository.updateById(userId, updatedUser);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteById(userId: string): Promise<void> {
    try {
      await userRepository.deleteById(userId);
      return;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async emailToManager(user: IUser, text: string): Promise<void> {
    try {
      await emailService.emailToManager(
        configs.MANAGER_EMAIL,
        EEmailAction.MANAGER_EMAIL,
        {
          userId: user._id,
          userEmail: user.email,
          name: user.name,
          text: text,
        },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async emailToAdmin(user: IUser, text: string): Promise<void> {
    try {
      await emailService.emailToAdmin(
        configs.ADMIN_EMAIL,
        EEmailAction.ADMIN_EMAIL,
        {
          userId: user._id,
          userEmail: user.email,
          name: user.name,
          text: text,
        },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async uploadAvatar(
    avatarFile: UploadedFile,
    userId: string,
  ): Promise<IUser> {
    try {
      const user = await userRepository.findById(userId);
      if (user.avatar) {
        await s3Service.deleteFile(user.avatar);
      }

      const filePath = await s3Service.uploadSingleFile(
        avatarFile,
        EFileTypes.User,
        userId,
      );

      const updatedUser = await userRepository.updateByIdPatch(userId, {
        avatar: filePath,
      });

      return updatedUser;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
