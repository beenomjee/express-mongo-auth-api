import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

const createCookieOfToken = (_id, email) => [
  "jwt",
  jsonwebtoken.sign({ _id, email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  }),
  {},
];

const isPassMatch = async (encryptedPass, password) => {
  password = await bcrypt.compare(password, encryptedPass);
  return password;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export { createCookieOfToken, hashPassword, isPassMatch };
