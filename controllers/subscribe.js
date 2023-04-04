const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");
const { User } = require("../models/user");

const subscribeUser = async (req, res) => {
  const { email } = req.body;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Missing required field email");
  }
  const subscribeEmail = {
    to: email,
    subject: "Subscribe to So Yummy",
    text: "Thank you for subscribing ❤️",
  };
  await sendEmail(subscribeEmail);
  res.status(200).json({ message: "Successfully" });
};

module.exports = {
  subscribeUser: ctrlWrapper(subscribeUser),
};
