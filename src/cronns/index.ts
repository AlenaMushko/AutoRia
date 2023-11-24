import { cronSendEmailUsers } from "./cronSendEmailUsers";

export const cronRunner = () => {
  cronSendEmailUsers.start();
};
