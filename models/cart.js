const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");

const cartSchema = new Schema(
  {
    ingredientId: {
      type: String,
    },
    measure: {
      type: String,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Cart = model("cart", cartSchema);

const cartJoiSchema = Joi.object({
  ingredientId: Joi.string().required(),
  measure: Joi.string().required(),
});

module.exports = {
  Cart,
  cartJoiSchema,
};
