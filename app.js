const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const swagger = require("swagger-ui-express");
const swaggerDoc=require("./swagger.json")
require("dotenv").config();

const usersRouter = require("./routes/api/users");
const favoriteRouter = require("./routes/api/favorite");
const subscribeRouter = require("./routes/api/subscribe");
const shoppingListRouter = require("./routes/api/shopping-list");

const app = express();
const recipesRouter = require("./routes/api/recipes");
const ingredientsRouter = require("./routes/api/ingredients");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swagger.serve, swagger.setup(swaggerDoc))

app.use(express.static("public"));

app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/auth", usersRouter);
app.use("/favorite", favoriteRouter);
app.use("/subscribe", subscribeRouter);
app.use("/shopping-list", shoppingListRouter);

app.use("/html", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json(message);
});

module.exports = app;
