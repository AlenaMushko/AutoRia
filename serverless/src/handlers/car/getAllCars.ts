import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { ICar } from "../../../../src/types";
import { connection } from "../../../mongo-client";
import { ApiError } from "../../errors";
import { isLogin } from "../../services/isLogin";
import { validateQuery } from "../../services/isQueryValid";
import { IPaginationResponse, IQueryPage } from "../../types/user.type";
import { querySchema } from "../../validations/queryValidation";

async function getAllCars(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  try {
    const user = await isLogin(event);
    const query = event.queryStringParameters as Partial<IQueryPage>;
    let cars;
    let allCars;

    if (query) {
      validateQuery(query, querySchema.queryAll);
    }

    const queryStr = JSON.stringify(query);
    const queryObg = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    );

    const {
      page = 1,
      limit = 2,
      sortedBy = "createdAt",
      ...searchObj
    } = queryObg || {};
    const skip = (+page - 1) * +limit;

    if (user?.account === "premium") {
      [cars, allCars] = await Promise.all([
        await connection
          .collection("cars")
          .find(searchObj)
          .sort(sortedBy)
          .skip(skip)
          .limit(+limit)
          .toArray(),
        await connection.collection("cars").countDocuments(searchObj),
      ]);
    } else {
      console.log("base ====");
      [cars, allCars] = await Promise.all([
        await connection
          .collection("cars")
          .find()
          .skip(skip)
          .limit(+limit)
          .toArray(),
        await connection.collection("cars").countDocuments(),
      ]);
    }

    const res = {
      page: +page,
      perPage: +limit,
      allItems: allCars,
      foundItems: cars.length,
      data: cars,
    } as IPaginationResponse<ICar>;

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (err) {
    throw new ApiError(err.message, err.status);
  }
}

export const handler = getAllCars;
