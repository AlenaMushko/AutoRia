import { ObjectId } from "mongoose";

import { IUser } from "./user.type";

export interface IMessage {
  message: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface ITokenPayload {
  _id: ObjectId;
}

export interface ITokensPair {
  userId?: ObjectId;
  name: string;
}

export interface IJwt {
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends IJwt, Document {
  _id: ITokenPayload;
  _userId?: ObjectId | IUser;
}

export interface IActivated extends Document {
  _id: ITokenPayload;
  accessToken: string;
  userEmail: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
