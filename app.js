const express = require("express");

const mongoose = require("mongoose");

const userRoutes = require("./routers/userRouter");
const cardRoutes = require("./routers/cardRouter");

const { PORT = 3000 } = process.env;
mongoose.connect("mongodb://localhost:27017/mestodb");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "625aa56746411c03d82ddcdc", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

app.listen(PORT);

// id "625aa56746411c03d82ddcdc"
