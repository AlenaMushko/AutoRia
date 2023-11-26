import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

import { connection } from "../../../mongo-client";
import { ApiError } from "../../errors";

// public isQueryValid(validator: ObjectSchema) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const query = req.query as IQuery;
//       const { error, value } = validator.validate(query);
//
//       if (error) {
//         throw new ApiError("Query is not valid", 400);
//       }
//
//       req.query = value;
//
//       next();
//     } catch (e) {
//       next(e);
//     }
//   };
// }

// public async findWithPagination(
//   query: IQuery,
// ): Promise<IPaginationResponse<IUser>> {
//   try {
//     const queryStr = JSON.stringify(query);
//     const queryObg = JSON.parse(
//       //Ця операція використовує регулярний вираз для знаходження всіх входжень "gte", "lte", "gt" та "lt" в рядку queryStr
//       queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
//     );
//     //$gte: Greater Than or Equal (Більше або Рівно)
//     //$lte: Less Than or Equal (Менше або Рівно)
//     //$gt: Greater Than (Більше)
//     //$lt: Less Than (Менше)
//     const { page, limit, sortedBy, ...searchObj } = queryObg;
//
//     const skip = +limit * (+page - 1);
//
//     const [users, allUsers] = await Promise.all([
//       userRepository.searchByQuery(searchObj, skip, sortedBy, limit),
//       userRepository.count(searchObj),
//     ]);
//
//     return {
//       page: +page,
//       perPage: +limit,
//       allItems: allUsers,
//       foundItems: users.length,
//       data: users,
//     };
//   } catch (e) {
//     throw new ApiError(e.message, e.status);
//   }
// }

// public async count(searchObj: {
//   [key: string]: string | number;
// }): Promise<number> {
//   return await User.count(searchObj);
// }
// public async searchByQuery(
//   searchObj: {
//   [key: string]: string;
// },
// skip: number,
//   sortedBy: string,
//   limit: string,
// ): Promise<IUser[]> {
//   try {
//     return await User.find(searchObj).skip(skip).limit(+limit).sort(sortedBy);
//   } catch (e) {
//     throw new ApiError(e.message, e.status);
//   }
// }

async function getAllUsers(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
// async function getAllUsers(): Promise<IPaginationResponse<IUser>> {
  try {
    //   commonMiddleware.isQueryValid(carSchema.queryCarSchema),
    const {page=1, limit=2, sortedBy="createdAt", ...searchObj} = event.queryStringParameters;
    const skip = (+page - 1) * +limit;

    const users =  await connection.collection('users').find(searchObj).sort(sortedBy).skip(skip).limit(+limit).toArray();


    return {
      statusCode: 200,
      body: JSON.stringify({  data: users }),
    };  } catch (err) {
    throw new ApiError(err.message, err.status);
  }
}

export const handler = getAllUsers;
