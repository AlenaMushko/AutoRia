import { EEmailAction } from "../enums";
import { ApiError } from "../errors";
import {EActionActivatedTokenTypes} from "../models";
import { authRepository, userRepository, tokenRepository } from "../repositories";
import {
  IActivated,
  IChangePassword,
  ICredentials,
  IJwt,
  ITokenPayload,
  IUser,
} from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import {roleRepository} from "../repositories/role.repository";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateVerifyToken(
        body.email,
        EActionActivatedTokenTypes.Activated,
      );

      const { password } = body;
      const hashadPassword = await passwordService.hash(password);

      const {_id} = await roleRepository.getOneByParams({name: body._roleId})

      Promise.all([
        await authRepository.register(body, hashadPassword, _id),
        await authRepository.actionToken(
          body,
          actionToken,
          EActionActivatedTokenTypes.Activated,
        ),
      ]);

      await emailService.sendEmail(body.email, EEmailAction.REGISTER, {
        name: body.name + ", " || " ",
        actionToken,
    });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activatedUser(
    activated: IActivated,
    user: IUser,
  ): Promise<void> {
    Promise.all([
      await authRepository.verifyUser(user),
      await authRepository.deleteActivated(activated._id),
    ]);

    await emailService.welcomeEmail(user.email, EEmailAction.WELCOME, {
      name: user.name + ", " || " ",
    });
  }

  public async login(body: ICredentials): Promise<IJwt> {
    try {
      const { email } = body;
      const user = await authRepository.findOne(email);

      const tokensPair = tokenService.generateTokenPairs({
        userId: user._id,
        name: user.name,
      });
      Promise.all([
        await tokenRepository.createToken({ ...tokensPair, _userId: user._id }),
        await userRepository.updateByIdPatch(user._id, {
          lastVisited: new Date(),
        }),
      ]);

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(body: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateVerifyToken(
        body.email,
        EActionActivatedTokenTypes.ForgotPassword,
      );
      await authRepository.actionToken(
        body,
        actionToken,
        EActionActivatedTokenTypes.ForgotPassword,
      );

      await emailService.forgotPassword(
        body.email,
        EEmailAction.FORGOT_PASSWORD,
        {
          name: body.name + ", " || " ",
          actionToken,
        },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(user: IUser, body: IChangePassword) {
    try {
      const { oldPassword, newPassword } = body;

      const isMatched = passwordService.compare(oldPassword, user.password);
      if (!isMatched) {
        throw new ApiError("Invalid password", 400);
      }

      const hashedNewPassword = await passwordService.hash(newPassword);
      authRepository.forgotPassword(user, hashedNewPassword);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async resetPassword(
    body: IUser,
    newPassword: string,
    tokenId: ITokenPayload,
  ): Promise<void> {
    try {
      const hashadPassword = await passwordService.hash(newPassword);

      Promise.all([
        await authRepository.forgotPassword(body, hashadPassword),
        await authRepository.deleteActivated(tokenId),
      ]);

      await emailService.resetPassword(
        body.email,
        EEmailAction.RESET_PASSWORD,
        {
          name: body.name + ", " || " ",
          email: body.email,
          password: newPassword,
        },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activatedAgainUser(user: IUser): Promise<void> {
    try {
      await emailService.sendEmail(user.email, EEmailAction.REGISTER, {
        name: user.name + ", " || " ",
        actionToken: user.actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
