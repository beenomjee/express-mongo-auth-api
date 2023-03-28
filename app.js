import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.routes.js";
import { connect } from "./db/utils.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.all("*", (req, res, next) => {
  console.log(req.url, "-", req.method);
  next();
});
app.use("/api/v1/users", usersRoutes);
const listen = async (app, port) => {
  try {
    await app.listen(port);
    console.log("Server listening on port " + port);
    connect();
  } catch (error) {
    console.log("Something went wrong");
    console.log(error.message);
    process.exit(1);
  }
};
listen(app, port);
