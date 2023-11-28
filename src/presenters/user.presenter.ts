import { configs } from "../config";
import { IPresenter, IUser } from "../types";

class UserPresenter implements IPresenter<IUser, Partial<IUser>> {
  present(data: IUser): Partial<IUser> {
    return {
      _id: data._id,
      name: data.name,
      email: data.email,
      _roleId: data._roleId,
      _dealershipId: data._dealershipId,
      account: data.account,
      lastVisited: data.lastVisited,
      avatar: `${configs.AWE_S3_URL}/${data.avatar}`,
    };
  }
}

export const userPresenter = new UserPresenter();
