import { Document, WithId } from "mongodb";

import { EAccounts } from "../../../src/enums";

export interface IQuery {
  page: number;
  limit: number;
  sortedBy: string;

  [key: string]: string | number;
}

export interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  allItems: number;
  foundItems: number;
  data: WithId<Document>[];
}

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

export interface IUserToken {
  userId: string;
  email: string;
}
