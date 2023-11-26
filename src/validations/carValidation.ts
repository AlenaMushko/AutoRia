import Joi from "joi";

import { ECurrency, ERegion, EStatus } from "../enums";

const currentYear = new Date().getFullYear();

export class carSchema {
  static _userId = Joi.string();
  static type = Joi.string().min(3).max(30).messages({
    "string.base": `"type" should be a type of 'text'`,
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long",
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
  static isNew = Joi.boolean();
  static region = Joi.string()
    .valid(...Object.values(ERegion))
    .messages({
      "any.only": `"region" must be one of the following values: ${Object.values(
        ERegion,
      ).join(", ")}`,
    });
  static city = Joi.string().min(3).max(30).messages({
    "string.base": `"city" should be a type of 'text'`,
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long",
  });
  static price = Joi.number().integer().min(1).max(1000000).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}} $",
    "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
  });
  static currency = Joi.string().valid(
    ECurrency.EUR,
    ECurrency.UAN,
    ECurrency.USD,
  );
  static count = Joi.number().integer().min(0).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}}",
  });
  static status = Joi.string()
    .valid(EStatus.Review, EStatus.Sold, EStatus.Active, EStatus.Inactive)
    .default(EStatus.Review);
  static description = Joi.string().min(3).max(500).messages({
    "string.base": `"description" should be a type of 'text'`,
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long",
  });
  static countSendLetters = Joi.number().integer().min(0).max(4).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}}",
    "string.max": "{{#label}}  must be less than or equal to {{#limit}}",
  });

  // static page = Joi.number().integer().min(1).max(500).default(1).messages({
  //   "number.base": "{{#label}} must be a number",
  //   "string.min": "{{#label}} must be at least {{#limit}} $",
  //   "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
  // });
  //
  // static limit = Joi.number().integer().min(1).max(50).default(9).messages({
  //   "number.base": "{{#label}} must be a number",
  //   "string.min": "{{#label}} must be at least {{#limit}} $",
  //   "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
  // });
  //
  // static sortedBy = Joi.string().default("price").messages({
  //   "number.base": "{{#label}} must be a number",
  //   "string.min": "{{#label}} must be at least {{#limit}} $",
  //   "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
  // });

  static create = Joi.object({
    _userId: this._userId,
    type: this.type.required(),
    brand: this.brand.required(),
    model: this.model.required(),
    year: this.year,
    description: this.description,
    newCar: this.isNew.required(),
    region: this.region.required(),
    city: this.city,
    price: this.price.required(),
    currency: this.currency.required(),
  });

  static update = Joi.object({
    description: this.description,
    region: this.region,
    city: this.city,
    price: this.price,
    currency: this.currency,
  }).or("description", "region", "city", "price", "currency");

  // static queryCarSchema = Joi.object({
  //   page: this.page,
  //   limit: this.limit,
  //   sortedBy: this.sortedBy,
  // });
}
