const { Signup } = require("../service/sign");
const Joi = require("joi");
const validate = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z ]+$/)
    .required()
    .messages({
      "string.base": "Username must be a string",
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username must not exceed 30 characters",
      "string.pattern.base": "Username can only contain letters and spaces",
    }),

  useremail: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid format",
      "string.empty": "Email is required",
    }),

  userpassword: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 6 characters long and include an uppercase letter, a number, and a special character",
      "string.empty": "Password is required",
    }),
});

module.exports = {
  Signup: async (req, res) => {
    try {
      const validinput = await validate.validateAsync(req.body);
      const response = await Signup(validinput);
      if (response.error) {
        return res.send({ error: response.error });
      }
      res.send({ response: response.response });
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
};
