import { User } from "../models";
import { IToken, IUser } from "../types";

class UserRepository {
  public async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async findById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async findOne(tokenObj: IToken): Promise<IUser> {
    return await User.findOne({
      _id: tokenObj._userId,
    });
  }

  public async updateById(userId: string, value: IUser): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, { ...value }, { new: true });
  }

  public async updateByIdPatch(
    userId: string,
    value: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, { ...value }, { new: true });
  }

  public async deleteById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
    return;
  }
}

export const userRepository = new UserRepository();
