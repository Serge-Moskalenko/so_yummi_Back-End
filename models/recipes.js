const mongoose = require("mongoose");
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
    },

    favorites: {
      type: Array,
    },
    likes: {
      type: Array,
    },
    youtube: {
      type: String,
      default: "",
    },

    tags: {
      type: Array,
    },

    ingredients: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

schema.post("save", handleMongooseError);

const Recipes = mongoose.model("recipe", schema);
module.exports = { Recipes };
