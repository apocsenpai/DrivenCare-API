import Joi from "joi";

const signInSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "br"] },
    })
    .required(),
  password: Joi.string().required(),
});

export default signInSchema;