import User from "../db/models/User.js";
import dotenv from "dotenv";
import {
  createCookieOfToken,
  hashPassword,
  isPassMatch,
} from "../utils/users.utils.js";

dotenv.config();

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "All Required Fields are not provided!" });

    let user = await User.findOne({ email: email });

    if (!user || !(await isPassMatch(user.password, password)))
      return res.status(400).json({ message: "Invalid Credentials!" });
    user = await User.findOne({ email: email }).select("-password");
    return res
      .cookie(...createCookieOfToken(user._id, user.email))
      .status(202)
      .json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const signupUser = async (req, res) => {
  try {
    let { name, email, password, age, phoneNo } = req.body;
    if (!name || !email || !password || !age || !phoneNo)
      return res
        .status(400)
        .json({ message: "All Required Fields are not provided!" });

    let user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ message: "User already exist!" });

    password = await hashPassword(password);
    await User.create({ name, email, password, age, phoneNo });
    user = await User.findOne({ email: email }).select("-password");
    return res
      .cookie(...createCookieOfToken(user._id, user.email))
      .status(201)
      .json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let { name, password, age, phoneNo, newPassword } = req.body;
    if (!name || !password || !age || !phoneNo || !newPassword)
      return res
        .status(400)
        .json({ message: "All Required Fields are not provided!" });

    if (!(await isPassMatch(req.body.user.password, password)))
      return res.status(400).json({ message: "Wrong Password Provided!" });

    password = await hashPassword(newPassword);
    let user = await User.findByIdAndUpdate(
      req.body.user._id,
      { name, password, age, phoneNo },
      { new: true }
    ).select("-password");
    return res.status(202).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    return res
      .clearCookie("jwt")
      .status(202)
      .json({ message: "Logout Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.user._id);
    return res
      .clearCookie("jwt")
      .status(202)
      .json({ message: "Delete User Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { loginUser, updateUser, logoutUser, deleteUser, signupUser };
