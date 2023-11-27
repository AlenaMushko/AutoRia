import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { connection } from "../../../mongo-client";
import { ApiError } from "../../errors";

dayjs.extend(utc);

async function cronOldTokensRemover(): Promise<void> {
  try {
   const cars = await connection
        .collection("cars")
        .find()
        .toArray();

    console.log(cars);
  } catch (err) {
    throw new ApiError(err.message, err.status);
  }
}

export const handler = cronOldTokensRemover;
