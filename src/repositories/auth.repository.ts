import { ApiError } from "../errors";
import { Activated, User } from "../models";
import { IActivated, ITokenPayload, IUser } from "../types";

class AuthRepository {
  public async register(body: IUser, hashadPassword: string, _roleId: string): Promise<IUser> {
    try {
      return await User.create({
        ...body,
        password: hashadPassword,
        _roleId
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async actionToken(
    body: IUser,
    actionToken: string,
    tokenType: string,
  ): Promise<IActivated> {
    try {
      return (await Activated.create({
        accessToken: actionToken,
        userEmail: body.email,
        tokenType,
      })) as unknown as IActivated;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async verifyUser(user: IUser): Promise<void> {
    try {
      await User.findByIdAndUpdate(user._id, { verify: true, actionToken: "" });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findActivated(accessToken: string): Promise<IActivated> {
    try {
      return (await Activated.findOne({
        accessToken,
      })) as unknown as IActivated;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteActivated(_id: ITokenPayload): Promise<void> {
    try {
      await Activated.deleteOne({ _id });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async findOne(email: string): Promise<IUser> {
    try {
      return (await User.findOne({ email })) as unknown as IUser;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(
    body: IUser,
    newPassword: string,
  ): Promise<IUser> {
    try {
      return (await User.findByIdAndUpdate(
        body._id,
        { password: newPassword },
        { new: true },
      )) as unknown as IUser;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authRepository = new AuthRepository();
