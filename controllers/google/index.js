const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { google } = require("./google");
const { googleRedirect } = require("./googleRedirect");

module.exports = {
    google:ctrlWrapper(google),
    googleRedirect:ctrlWrapper(googleRedirect)
}