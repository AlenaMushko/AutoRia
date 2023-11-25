import { Document } from "mongoose";

import { EAccounts } from "../enums";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  _roleId: string;
  _dealershipId?: string | null;
  account: EAccounts;
  verify: boolean;
  lastVisited: Date;
  actionToken?: string;
}

export interface IRole extends Document {
  name: string;
  permission: {
    [key: string]: boolean;
  };
}
