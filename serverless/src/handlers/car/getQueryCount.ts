// import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
// import { ICar } from "../../../../src/types";
//
// import { connection } from "../../../mongo-client";
// import { queryConstants } from "../../constants";
// import { ApiError } from "../../errors";
// import { isLogin } from "../../services/isLogin";
// import { validateQuery } from "../../services/isQueryValid";
// import { IPaginationResponse, IQuery } from "../../types/user.type";
// import { querySchema } from "../../validations/queryValidation";
//
// async function getQueryPrice(
//   event: APIGatewayProxyEvent,
// ): Promise<APIGatewayProxyResult> {
//   try {
//     const user = await isLogin(event);
//     if (user?.account !== "premium") {
//       throw new ApiError('To make inquiries, buy premium', 404)
//     }
//
//     const query = event.queryStringParameters as Partial<IQuery>;
//     let cars;
//     let allCars;
//
//     if (query) {
//       validateQuery(query, querySchema.querySchema);
//     }
//
//     const queryStr = JSON.stringify(query);
//     const queryObg = JSON.parse(
//       queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
//     );
//     //$gte: Greater Than or Equal (Більше або Рівно)
//     //$lte: Less Than or Equal (Менше або Рівно)
//     //$gt: Greater Than (Більше)
//     //$lt: Less Than (Менше)
//
//     const {
//       page = queryConstants.PAGE,
//       limit = queryConstants.LIMIT,
//       sortedBy = "createdAt",
//       ...searchObj
//     } = queryObg || {};
//     const skip = (+page - 1) * +limit;
//
//     [cars, allCars] = await Promise.all([
//       await connection
//         .collection("cars")
//         .find(searchObj)
//         .sort(sortedBy)
//         .skip(skip)
//         .limit(+limit)
//         .toArray(),
//       await connection.collection("cars").countDocuments(searchObj),
//     ]);
//
//     const res = {
//       page: +page,
//       perPage: +limit,
//       allItems: allCars,
//       foundItems: cars.length,
//       data: cars,
//     } as IPaginationResponse<ICar>;
//
//     return {
//       statusCode: 200,
//       body: JSON.stringify(res),
//     };
//   } catch (err) {
//     throw new ApiError(err.message, err.status);
//   }
// }
//
// export const handler = getQueryPrice;
