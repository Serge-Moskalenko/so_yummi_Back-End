const { HttpError, ctrlWrapper } = require("../helpers");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `Email ${email} in use`);
  }
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  const defaultAvatar =
    "https://res.cloudinary.com/do316uvkf/image/upload/v1680493993/avatars/ccsh3dpzpsloytws5qa3.jpg";
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatar: defaultAvatar,
  });
  const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "24h" });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      favorite: newUser.favorite,
      shoppingList: newUser.shoppingList,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isValidPassword = bcryptjs.compareSync(password, user.password);
  if (!isValidPassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const current = async (req, res) => {
  const user = req.user;
  res.status(200).json({ user });
};

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const data = await User.findByIdAndUpdate(
    _id,
    { ...req.body, ...req.file },
    { new: true }
  );
  try {
    if (req.file) {
      await User.findByIdAndUpdate(_id, { avatar: req.file.path });
    }
  } catch (error) {
    throw error;
  }
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "User profile updated successfully" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateUser: ctrlWrapper(updateUser),
};
