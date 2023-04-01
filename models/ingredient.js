const mongoose = require("mongoose");
const { handleMongooseError } = require("../helpers");
const schema = mongoose.Schema(
  {
    ttl: {
      type: String,
      required: [true, "type ingredient is required"],
    },
    desc: {
      type: String,
      default: "",
    },
    t: {
      type: String,
      default: "",
    },
    tnb: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

schema.post("save", handleMongooseError);

const Ingredient = mongoose.model("ingredient", schema);
module.exports = { Ingredient };
