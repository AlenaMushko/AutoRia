import { APIGatewayProxyEvent } from "aws-lambda";
import { connection } from "../../../mongo-client";
import { ApiError } from "../../errors";
import { isLogin } from "../../services/isLogin";
import { validateQuery } from "../../services/isQueryValid";
import { IPaginationResponse, IQuery, IUser } from "../../types/user.type";
import { querySchema } from "../../validations/queryValidation";

async function getAllCars(event: APIGatewayProxyEvent): Promise<IPaginationResponse<IUser>> {
  try {
    const user = await isLogin(event);
    const query = event.queryStringParameters as IQuery;
    let cars;
    let allCars;

    if (query) {
      validateQuery(query, querySchema.querySchema);
    }

    const queryStr = JSON.stringify(query);
    const queryObg = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
    );
    //$gte: Greater Than or Equal (Більше або Рівно)
    //$lte: Less Than or Equal (Менше або Рівно)
    //$gt: Greater Than (Більше)
    //$lt: Less Than (Менше)
    const { page = 1, limit = 2, sortedBy = "createdAt", ...searchObj } = queryObg;
    const skip = (+page - 1) * +limit;

    if (user?.account === "premium") {
      [cars, allCars] = await Promise.all([
        await connection.collection("cars").find(searchObj).sort(sortedBy).skip(skip).limit(+limit).toArray(),
        await connection.collection("cars").countDocuments(searchObj)
      ]);
    } else{
      [cars, allCars] = await Promise.all([
        await connection.collection("cars").find().skip(skip).limit(+limit).toArray(),
        await connection.collection("cars").countDocuments()
      ]);
    }

    return {
      page: +page,
      perPage: +limit,
      allItems: allCars,
      foundItems: cars.length,
      data: cars
    };
  } catch (err) {
    throw new ApiError(err.message, err.status);
  }
}

export const handler = getAllCars;
