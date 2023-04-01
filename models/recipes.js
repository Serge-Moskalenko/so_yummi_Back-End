const mongoose = require("mongoose");
const { handleMongooseError } = require("../helpers/index");
const schema = mongoose.Schema({}, { versionKey: false, timestamps: true });

schema.post("save", handleMongooseError);

const Recipes = mongoose.model("recipe", schema);
module.exports = { Recipes };
