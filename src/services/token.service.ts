import * as jwt from "jsonwebtoken";

import { configs } from "../config";
import { ApiError } from "../errors";
import { EActionActivatedTokenTypes } from "../models";
import { userRepository, tokenRepository  } from "../repositories";
import { IJwt, ITokenPayload, ITokensPair, IUser } from "../types";

const accessTokenSecret = configs.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = configs.REFRESH_TOKEN_SECRET;

class TokenService {
  //for login
  public generateTokenPairs(payload: ITokensPair): IJwt {
    try {
      const accessToken = jwt.sign(payload, accessTokenSecret, {
        expiresIn: "1h",
      });

      const refreshToken = jwt.sign(payload, refreshTokenSecret, {
        expiresIn: "30d",
      });

      return { accessToken, refreshToken };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  // token for register or forgot password
  public generateVerifyToken(email: string, tokenType: string): string {
    try {
      let secret;
      const payload = { email };

      switch (tokenType) {
        case EActionActivatedTokenTypes.Activated:
          secret = configs.ACTIVATED_TOKEN_SECRET;
          break;
        case EActionActivatedTokenTypes.ForgotPassword:
          secret = configs.FORGOT_TOKEN_SECRET;
          break;
      }

      return jwt.sign(payload, secret, { expiresIn: "7d" });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async logout(id: ITokenPayload): Promise<void> {
    try {
      await tokenRepository.logout(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  //for newPassword
  public async refreshToken(user: IUser, _id: ITokenPayload): Promise<IJwt> {
    try {
      const tokensPair = tokenService.generateTokenPairs({
        userId: user._id,
        name: user.name,
      });

      await Promise.all([
        await tokenRepository.logout(_id),
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
}

export const tokenService = new TokenService();
