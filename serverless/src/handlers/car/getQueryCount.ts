import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ObjectId } from "mongodb";

import { connection } from "../../../mongo-client";
import { ApiError, myError } from "../../errors";
import { isLogin } from "../../services/isLogin";

async function getQueryCount(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  try {
    const user = await isLogin(event);
    if (user?.account !== "premium") {
      throw new ApiError("To make inquiries, buy premium", 404);
    }

    const { carId }  = event.pathParameters || {};

    const car = await connection
      .collection("cars")
      .findOne({ _id: new ObjectId(carId) });
    if (!car) {
      throw new ApiError("Car not found", 404);
    }

    const res = {
      carId,
      count: car.count,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (err) {
    if (err instanceof ApiError) {
      return myError(err.message, err.status);
    } else{
      throw new ApiError(err.message, err.status);
    }
  }
}

export const handler = getQueryCount;
