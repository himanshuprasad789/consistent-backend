const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;
const habitRoute = require("./src/routes/HabitRoute");
const router = require("./src/routes/userRoute");
const verifyToken = require("./src/middleware/authMiddleware");

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get("/", (req, res) => {
  res.json({ routes: ["/habits", "/users"] });
});

app.use("/auth", router);
app.use("/habits", verifyToken, habitRoute);
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to db");

    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
