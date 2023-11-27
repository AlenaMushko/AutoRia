import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { connection } from "../../../mongo-client";
import { queryConstants } from "../../constants";
import { ApiError } from "../../errors";
import { validateQuery } from "../../services/isQueryValid";
import { IPaginationResponse, IQueryPage, IUser } from "../../types/user.type";
import { querySchema } from "../../validations/queryValidation";

async function getAllUsers(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  try {
    const query = event.queryStringParameters as IQueryPage;

    if (!query) {
      const page = queryConstants.PAGE;
      const limit = queryConstants.LIMIT;
      const skip = (+page - 1) * +limit;

      const [users, allUsers] = await Promise.all([
        await connection
          .collection("users")
          .find()
          .skip(skip)
          .limit(+limit)
          .toArray(),
        await connection.collection("users").countDocuments(),
      ]);

      const res = {
        page,
        perPage: queryConstants.LIMIT,
        allItems: allUsers,
        foundItems: users.length,
        data: users,
      } as IPaginationResponse<IUser>;

      return {
        statusCode: 200,
        body: JSON.stringify(res),
      };
    }

    if (query) {
      validateQuery(query, querySchema.queryAll);
    }
    const queryStr = JSON.stringify(query);
    const queryObg = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    );

    const {
      page = queryConstants.PAGE,
      limit = queryConstants.LIMIT,
      sortedBy = "createdAt",
      ...searchObj
    } = queryObg || {};
    const skip = (+page - 1) * +limit;

    const [users, allUsers] = await Promise.all([
      await connection
        .collection("users")
        .find(searchObj)
        .sort(sortedBy)
        .skip(skip)
        .limit(+limit)
        .toArray(),
      await connection.collection("users").countDocuments(searchObj),
    ]);

    const res = {
      page: +page,
      perPage: +limit,
      allItems: allUsers,
      foundItems: users.length,
      data: users,
    } as IPaginationResponse<IUser>;

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (err) {
    throw new ApiError(err.message, err.status);
  }
}

export const handler = getAllUsers;
