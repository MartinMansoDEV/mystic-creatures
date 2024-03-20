import * as Joi from 'joi';

export const appConfig = () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
});

export const appValidation = Joi.object({
  // Application
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().default(3000),
});
