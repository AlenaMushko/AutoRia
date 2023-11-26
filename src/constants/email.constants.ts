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
  [EEmailAction.PROFANITY]: {
    templateName: "profanity-car",
    subject: "The description contains inappropriate words. Please fix it",
  },
  [EEmailAction.PROFANITY_LAST]: {
    templateName: "profanity-car-last",
    subject: "The description contains inappropriate words. Please fix it",
  },
  [EEmailAction.PROFANITY_DELETE]: {
    templateName: "profanity-car-delete",
    subject: "The description contains inappropriate words.",
  },
  [EEmailAction.MANAGER]: {
    templateName: "manager-deleteCar",
    subject: "The car is inactive",
  },
  [EEmailAction.MANAGER_EMAIL]: {
    templateName: "manager-email",
    subject: "email from autoRia",
  },
  [EEmailAction.ADMIN_EMAIL]: {
    templateName: "admin-email",
    subject: "email from autoRia",
  }
};
