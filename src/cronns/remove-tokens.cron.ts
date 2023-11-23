import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ApiError } from "../errors";
import { Token } from "../models";

dayjs.extend(utc);
const oldTokensRemover = async (): Promise<void> => {
  try {
    const previousMonth = dayjs().utc().subtract(1, "month").toDate();

    await Token.deleteMany({ createdAt: { $lte: previousMonth } });
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};

export const removeOldTokens = new CronJob("0 0 * * *", oldTokensRemover);
