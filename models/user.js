const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    avatar: {
      type: String,
    },
    favorite: [{ type: SchemaTypes.ObjectId, ref: "recipe" }],
    shoppingList: [{ type: SchemaTypes.ObjectId, ref: "cart" }],
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const userJoiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net"],
      },
    })
    .required(),
  password: Joi.string().min(6).alphanum().required(),
  token: Joi.string(),
});

const userJoiLoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net"],
      },
    })
    .required(),
  password: Joi.string().min(6).alphanum().required(),
  token: Joi.string(),
});

const updateUserJoiSchema = Joi.object({
  name: Joi.string(),
  avatar: Joi.string(),
});

const userJoiSubscribeSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net"],
      },
    })
    .required(),
});

module.exports = {
  User,
  userJoiRegisterSchema,
  userJoiLoginSchema,
  updateUserJoiSchema,
  userJoiSubscribeSchema,
};
