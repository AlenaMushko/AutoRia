import { cronSendEmailUsers } from "./cronSendEmailUsers";
import { removeOldTokens } from "./remove-tokens.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  cronSendEmailUsers.start();
};

