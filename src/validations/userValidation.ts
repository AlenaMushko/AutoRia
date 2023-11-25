import Joi from "joi";

import { RegexConstants } from "../constants";

export class userSchema {
  static userName = Joi.string().min(3).max(30).messages({
    "string.base": `"username" should be a type of 'text'`,
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long",
  });
  static email = Joi.string().email().regex(RegexConstants.EMAIL).messages({
    "string.email": "{{#label}} must be a valid email",
    "any.required": "{{#label}} is required!!",
    "string.pattern.base":
      "{{#label}} should start with alphanumeric, underscores, dots, or hyphens, followed by '@', then alphanumeric, dots or hyphens, and end with 2 to 4 alphabet characters.",
  });
  static password = Joi.string().regex(RegexConstants.PASSWORD).messages({
    "string.pattern.base":
      "{{#label}} must be 3 to 20 characters, contain at least one lowercase letter, one uppercase letter, and one number.",
    "any.required": "{{#label}} is required!!",
  });
  static _roleId = Joi.string()
    .valid("customer", "seller", "manager", "admin")
    .messages({
      "any.only":
        "{{#label}} must be either 'customer', 'premium', 'manager', 'admin' ",
    });
  static _dealershipId = Joi.string();
  static account = Joi.string().valid("base", "premium").messages({
    "any.only": "{{#label}} must be either 'base' or 'seller'",
  });
  static lastVisited = Joi.date().optional();

  static page = Joi.number().integer().min(1).max(500).default(1).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}} $",
    "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
  });

  static limit = Joi.number().integer().min(1).max(50).default(9).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}} $",
    "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
  });

  static sortedBy = Joi.string().default("name").messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}} $",
    "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
  });

  static create = Joi.object({
    name: this.userName.required(),
    email: this.email.required(),
    password: this.password.required(),
    _roleId: this._roleId,
    _dealershipId: this._dealershipId,
    account: this.account,
  });

  static updateUserSchema = Joi.object({
    name: this.userName.required(),
    email: this.email.required(),
    password: this.password.required(),
    _roleId: this._roleId,
    _dealershipId: this._dealershipId,
    account: this.account,
  }).or("name", "email", "password", "_roleId", "_dealershipId", "account");

  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
    lastVisited: this.lastVisited,
  });

  static activated = Joi.object({
    email: this.email.required(),
  });
  static resetPassword = Joi.object({
    password: this.password.required(),
  });

  static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });

  static queryUserSchema = Joi.object({
    page: this.page,
    limit: this.limit,
    sortedBy: this.sortedBy,
  });
}
