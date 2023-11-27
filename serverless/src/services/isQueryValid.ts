import { ObjectSchema } from "joi";

import { ApiError } from "../errors";
import { IQueryPage } from "../types/user.type";

export function validateQuery(
  query: Partial<IQueryPage>,
  validator: ObjectSchema,
) {
  const { error } = validator.validate(query);
  if (error) {
    throw new ApiError("Query is not valid", 400);
  }
}
