import { EEmailAction } from "../enums";

export const templates = {
  [EEmailAction.REGISTER]: {
    templateName: "register",
    subject: "Hello, great to see you in our app",
  },
  [EEmailAction.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "Do not worry, we control your password",
  },
  [EEmailAction.RESET_PASSWORD]: {
    templateName: "reset-password",
    subject: "Congratulations you successfully resetting your password",
  },
  [EEmailAction.WELCOME]: {
    templateName: "welcome",
    subject: "Congratulations, you have successfully verified",
  },
  [EEmailAction.CRON_HELLO]: {
    templateName: "cron-hello",
    subject: "Hello, we mees you",
  },
};
