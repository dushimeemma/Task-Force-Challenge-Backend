import Joi from 'joi';

export const TodoSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      'any.required': 'title is required',
      'string.empty': 'title can not be empty',
    }),
    description: Joi.string().required().messages({
      'any.required': 'description is required',
      'string.empty': 'description can not be empty',
    }),
    priority: Joi.number().required().messages({
      'any.required': 'priority is required',
      'number.empty': 'priority can not be empty',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};

export const SignupSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'name is required',
      'string.empty': 'Name can not be empty',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'email is required',
      'string.empty': 'Email can not be empty',
    }),
    password: Joi.string()
      .required()
      .regex(/^[a-z]{4,}\d+/i)
      .messages({
        'any.required': 'password is required',
        'string.pattern.base':
          'Password must be at least 5 characters including 4 letters and numbers',
        'string.empty': 'Password can not be empty',
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};

export const LoginSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'email is required',
      'string.empty': 'Email can not be empty',
    }),
    password: Joi.string().required().messages({
      'any.required': 'password is required',
      'string.empty': 'Password can not be empty',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
