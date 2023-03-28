import jsonwebtoken from "jsonwebtoken";
import User from "../db/models/User.js";

const auth = async (req, res, next) => {
  try {
    const { jwt } = req.cookies;
    const { _id, email } = jsonwebtoken.verify(jwt, process.env.SECRET_KEY);
    const user = await User.findOne({ email, _id });
    if (!user) return res.status(400).json({ message: "Page Not Found!" });
    req.body.user = user;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Page Not Found!" });
  }
};
export default auth;
