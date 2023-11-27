import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { connection } from "../../../mongo-client";
import { ApiError } from "../../errors";
import { isLogin } from "../../services/isLogin";
import { validateQuery } from "../../services/isQueryValid";
import { querySchema } from "../../validations/queryValidation";

async function getQueryPrice(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  try {
    const user = await isLogin(event);
    if (user?.account !== "premium") {
      throw new ApiError("To make inquiries, buy premium", 404);
    }

    const query = event.queryStringParameters;
    if (query) {
      validateQuery(query, querySchema.queryRegion);
    }

    const brand = await connection
      .collection("brands")
      .find({ name: query.brand })
      .toArray();
    const model = await connection
      .collection("models")
      .find({ name: query.model })
      .toArray();
    const _brandId = brand[0]._id;
    const _modelId = model[0]._id;

    let cars = [];

    if (query.region === "all") {
      cars = await connection
        .collection("cars")
        .find({
          _brandId,
          _modelId,
        })
        .toArray();
    } else {
      cars = await connection
        .collection("cars")
        .find({
          _brandId,
          _modelId,
          region: query.region,
        })
        .toArray();
    }

    const priseArr: number[] = cars.map(
      (car) => +car.priceUAN.replace(" UAN", ""),
    );
    const sum = priseArr.reduce((acc: number, prise: number) => {
      return acc + +prise;
    }, 0);

    const avaragePrice = sum / priseArr.length;

    const res = {
      brand: query.brand,
      model: query.model,
      avaragePrice: avaragePrice + " " + "UAN",
      searchQuery: query.region,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (err) {
    throw new ApiError(err.message, err.status);
  }
}

export const handler = getQueryPrice;
