const { HttpError, ctrlWrapper } = require("../helpers");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { Recipes } = require("../models/recipes");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `Email ${email} in use`);
  }
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  const defaultAvatar =
    "https://res.cloudinary.com/do316uvkf/image/upload/v1680493837/szccttwukvqfijjovgz5.jpg";
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatar: defaultAvatar,
  });
  const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "24h" });
  newUser.token = token;
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
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
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
  if (!data) {
    throw HttpError(404, "Not found");
  }
  try {
    if (req.file) {
      await User.findByIdAndUpdate(_id, { avatar: req.file.path });
    }
  } catch (error) {
    throw error;
  }

  res.status(200).json({ message: "User profile updated successfully" });
};

const authDayInSoYummy = async (req, res) => {
  const { createdAt } = req.user;
  if (!createdAt) {
    throw HttpError(401);
  }
  const newDate = new Date();
  const result = await User.aggregate([
    {
      $group: {
        _id: null,
        averageTime: {
          $avg: {
            $dateDiff: {
              startDate: createdAt,
              endDate: newDate,
              unit: "day",
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        numDays: {
          $trunc: ["$averageTime", 1],
        },
      },
    },
  ]);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const authFavoritesRecipes = async (req, res) => {
  const { favorite } = req.user;

  res.json(favorite.length);
};

const authOwnRecipes = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw HttpError(401);
  }
  const result = await Recipes.find({ owner: { $eq: user._id } }).count();
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateUser: ctrlWrapper(updateUser),
  authDayInSoYummy: ctrlWrapper(authDayInSoYummy),
  authFavoritesRecipes: ctrlWrapper(authFavoritesRecipes),
  authOwnRecipes: ctrlWrapper(authOwnRecipes),
};
