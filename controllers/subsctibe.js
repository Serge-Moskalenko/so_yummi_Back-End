const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");
const { User } = require("../models/user");

const subscribeUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.subscribe) {
    throw HttpError(400, "User has already been subscribed");
  }
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Missing required field email");
  }
  const subscribeEmail = {
    to: email,
    subject: "Subscribe to So Yummy",
    text: "and easy to do anywhere, even with Node.js",
  };
  await sendEmail(subscribeEmail);
  res.status(200).json({ message: "Successfully" });
};

module.exports = {
  subscribeUser: ctrlWrapper(subscribeUser),
};
