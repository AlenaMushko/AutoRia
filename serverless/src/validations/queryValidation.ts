import Joi from "joi";

import { ERegion, EStatus } from "../../../src/enums";

const currentYear = new Date().getFullYear();
export class querySchema {
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

  static sortedBy = Joi.string().default("price").messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}} $",
    "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
  });

  static brand = Joi.string().min(3).max(30).messages({
    "string.base": `"brand" should be a type of 'text'`,
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long",
  });
  static model = Joi.string().min(3).max(30).messages({
    "string.base": `"model" should be a type of 'text'`,
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long",
  });
  static year = Joi.number().integer().min(1995).max(currentYear).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}}  must be at least {{#limit}} year",
    "string.max": "{{#label}} must be less than or equal to {{#limit}} year",
  });
  static isNew = Joi.string().valid("true", "false");
  static region = Joi.string()
    .valid("all", ...Object.values(ERegion))
    .messages({
      "any.only": `"region" must be one of the following values: all, ${Object.values(
        ERegion,
      ).join(", ")}`,
    });
  static count = Joi.number().integer().min(0).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}}",
  });
  static status = Joi.string()
    .valid(EStatus.Review, EStatus.Sold, EStatus.Active, EStatus.Inactive)
    .default(EStatus.Review);

  static queryAll = Joi.object({
    page: this.page,
    limit: this.limit,
    sortedBy: this.sortedBy,
    brand: this.brand,
    year: this.year,
    newCar: this.isNew,
    region: this.region,
    status: this.status,
    count: this.count,
  });

  static queryRegion = Joi.object({
    brand: this.brand,
    model: this.model,
    region: this.region,
  });

  static queryCount = Joi.object({
    count: this.count,
  });
}
