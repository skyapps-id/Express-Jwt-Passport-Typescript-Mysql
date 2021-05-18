import Joi from "joi";

export const signUp = Joi.object().keys({ 
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signIn = Joi.object().keys({ 
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
