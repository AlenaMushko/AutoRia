import Joi from "joi";

export class brandSchema {
  static brandName = Joi.string().min(3).max(30).messages({
    "string.base": `"brand" should be a type of 'text'`,
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long",
  });

  static create = Joi.object({
    name: this.brandName.required(),
  });
}
