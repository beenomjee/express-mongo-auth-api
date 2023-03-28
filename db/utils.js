import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to Mongoose!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export { connect };
