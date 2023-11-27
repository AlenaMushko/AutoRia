import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { connection } from "../../../mongo-client";
import { ApiError } from "../../errors";

dayjs.extend(utc);

async function cronOldTokensRemover(): Promise<void> {
  try {
    const previousWeek = dayjs().utc().subtract(7, "day").toDate();

    await connection
      .collection("tokens")
      .deleteMany({ createdAt: { $lte: previousWeek } });
  } catch (err) {
    throw new ApiError(err.message, err.status);
  }
}

export const handler = cronOldTokensRemover;
