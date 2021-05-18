import Joi from "joi";

export const create = Joi.object().keys({ 
  content: Joi.string().required(),
  userId: Joi.number().required(),
  postId: Joi.number().required(),
});

export const getAll = Joi.object().keys({ 
  page: Joi.number(),
  limit: Joi.number(),
});

export const getOne = Joi.object().keys({ 
  id: Joi.number(),
});

export const update = Joi.object().keys({ 
  content: Joi.string().required(),
});

export const destroy = Joi.object().keys({ 
  id: Joi.number(),
});