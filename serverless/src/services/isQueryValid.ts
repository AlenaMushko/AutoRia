import { ObjectSchema } from "joi";
import { ApiError } from "../errors";
import { IQuery } from "../types/user.type";

export function validateQuery(query: IQuery, validator: ObjectSchema) {
  const { error } = validator.validate(query);
  if (error) {
    throw new ApiError("Query is not valid", 400);
  }
}
