const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRouter = require("./router/userRouter");
const db = require("./config/dbConnection");

const app = express();
db.connect();
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.use("/api", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running port ${PORT}`));
