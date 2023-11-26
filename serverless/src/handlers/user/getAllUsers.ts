import { APIGatewayProxyEvent } from "aws-lambda";

import { connection } from "../../../mongo-client";
import { ApiError } from "../../errors";
import { validateQuery } from "../../services/isQueryValid";
import { IPaginationResponse, IQuery, IUser } from "../../types/user.type";
import { querySchema } from "../../validations/queryValidation";

async function getAllUsers(event: APIGatewayProxyEvent): Promise<IPaginationResponse<IUser>> {
  try {
    const query = event.queryStringParameters as IQuery;

    if (query) {
      validateQuery(query, querySchema.querySchema);
    }

    const queryStr = JSON.stringify(query);
    const queryObg = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
    );


    const { page = 1, limit = 2, sortedBy = "createdAt", ...searchObj } = queryObg;
    const skip = (+page - 1) * +limit;

    const [users, allUsers] = await Promise.all([
      await connection.collection("users").find(searchObj).sort(sortedBy).skip(skip).limit(+limit).toArray(),
      await connection.collection("users").countDocuments(searchObj)
    ]);

    return {
      page: +page,
      perPage: +limit,
      allItems: allUsers,
      foundItems: users.length,
      data: users
    };
  } catch (err) {
    throw new ApiError(err.message, err.status);
  }
}

export const handler = getAllUsers;
