import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { EEmailAction } from "../enums";
import { ApiError } from "../errors";
import { User } from "../models";
import { emailService } from "../services/email.service";

dayjs.extend(utc);

const rememberUsersAboutApp = async (): Promise<void> => {
  try {
    const previousMonth = dayjs().utc().subtract(1, "months").toDate();

    const users = await User.find({ lastVisited: { $lte: previousMonth } });
    for (const user of users) {
      await emailService.cronHello(user.email, EEmailAction.CRON_HELLO, {
        name: user.name + ", " || " ",
      });
    }
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};

export const cronSendEmailUsers = new CronJob(
  "0 0 * * *",
  rememberUsersAboutApp,
);
