import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as path from "path";

import { configs } from "../config";
import { templates } from "../constants";
import { EEmailAction } from "../enums";
import { ApiError } from "../errors";

class EmailService {
  private transporter: Transporter<SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply ",
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });

    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "layouts",
        ),
        partialsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "partials",
        ),
      },
      viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
      extName: ".hbs",
    };

    this.transporter.use("compile", hbs(hbsOptions));
  }

  public async sendEmail(
    email: string | string[],
    emailAction: EEmailAction,
    context: Record<string, string | number> = {},
  ) {
    try {
      const { subject, templateName } = templates[emailAction];
      const mailOptions = {
        to: email,
        subject: subject,
        template: templateName,
        context,
      };

      return await this.transporter.sendMail(mailOptions);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async welcomeEmail(
    email: string | string[],
    emailAction: EEmailAction,
    context: Record<string, string | number> = {},
  ) {
    try {
      const { subject, templateName } = templates[emailAction];
      const mailOptions = {
        to: email,
        subject: subject,
        template: templateName,
        context,
      };

      return await this.transporter.sendMail(mailOptions);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(
    email: string,
    emailAction: EEmailAction,
    context: Record<string, string | number> = {},
  ) {
    try {
      const { subject, templateName } = templates[emailAction];
      const mailOptions = {
        to: email,
        subject: subject,
        template: templateName,
        context,
      };

      return await this.transporter.sendMail(mailOptions);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async resetPassword(
    email: string,
    emailAction: EEmailAction,
    context: Record<string, string | number> = {},
  ) {
    try {
      const { subject, templateName } = templates[emailAction];
      const mailOptions = {
        to: email,
        subject: subject,
        template: templateName,
        context,
      };

      return await this.transporter.sendMail(mailOptions);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async cronHello(
    email: string | string[],
    emailAction: EEmailAction,
    context: Record<string, string | number> = {},
  ) {
    try {
      const { subject, templateName } = templates[emailAction];

      const mailOptions = {
        to: email,
        subject: subject,
        template: templateName,
        context,
      };

      return await this.transporter.sendMail(mailOptions);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const emailService = new EmailService();
