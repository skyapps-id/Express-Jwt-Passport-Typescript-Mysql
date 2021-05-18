import Joi from "joi";

export const create = Joi.object().keys({ 
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const getAll = Joi.object().keys({ 
  page: Joi.number(),
  limit: Joi.number(),
});

export const getOne = Joi.object().keys({ 
  id: Joi.number(),
});

export const update = Joi.object().keys({ 
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const destroy = Joi.object().keys({ 
  id: Joi.number(),
});