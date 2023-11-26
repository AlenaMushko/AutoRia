import {  ObjectId, WithId } from "mongodb";
import { APIGatewayEvent } from "aws-lambda";
import { JwtPayload } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";

import { connection } from "../../mongo-client";
import { ApiError } from "../errors";
import { IUser } from "../types/user.type";

const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

export async function isLogin( event: APIGatewayEvent,
): Promise<WithId<IUser>> {
  try {
    const authorization = event.headers.authorization;

    if (!authorization) {
      throw new ApiError("Authorization header missing", 401);
    }

    const [bearer, token] = authorization.split(" ");
    if (!bearer || !token) {
      throw new ApiError("Not authorized", 401);
    }

    const { userId } = jwt.verify(token, tokenSecret) as JwtPayload;

    const [user, tokenModel] = await Promise.all([
      await connection.collection('users').findOne({_id: new ObjectId(userId)}),
      await connection.collection('tokens').findOne({_userId: new ObjectId(userId)})
    ])

    if (!user || !tokenModel) {
      throw new ApiError("Token not valid", 401);
    }

    return user as WithId<IUser>;
  } catch (err) {
    throw new ApiError(err.message, err.status);
  }
}
