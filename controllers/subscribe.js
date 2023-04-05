const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const subscribeUser = async (req, res) => {
  const { email } = req.body;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Missing required field email");
  }
  const subscribeEmail = {
    to: email,
    subject: "Subscribe to So Yummy",
    templateId: "d-8170963616d44c489b78e58de7c6dbc6",
  };
  await sendEmail(subscribeEmail);
  res.status(200).json({ message: "Subscribe is successfully" });
};

module.exports = {
  subscribeUser: ctrlWrapper(subscribeUser),
};
