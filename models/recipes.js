const mongoose = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers/index");
const schema = mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },

    area: {
      type: String,
      default: "",
    },
    instructions: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    thumb: {
      type: String,
      default: "",
    },
    preview: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    popularity: {
      type: Number,
      default: 0,
    },

    favorites: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    youtube: {
      type: String,
      default: "",
    },

    tags: {
      type: Array,
      default: [],
    },

    ingredients: {
      type: Array,
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

schema.post("save", handleMongooseError);

const Recipes = mongoose.model("recipe", schema);
const addRecipeJoiSchema = Joi.object({});
module.exports = { Recipes, addRecipeJoiSchema };
