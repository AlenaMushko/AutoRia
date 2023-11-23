import { ApiError } from "../errors";
import { Token } from "../models";
import { IToken, ITokenPayload } from "../types";

class TokenRepository {
  public async createToken(body: Partial<IToken>): Promise<IToken> {
    try {
      return await Token.create(body);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getByID(userId: ITokenPayload): Promise<IToken> {
    try {
      return await Token.findOne({ _userId: userId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async logout(_id: ITokenPayload): Promise<void> {
    try {
      await Token.deleteOne({ _id });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findOne(token: string): Promise<IToken> {
    try {
      return await Token.findOne({ accessToken: token });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const tokenRepository = new TokenRepository();
