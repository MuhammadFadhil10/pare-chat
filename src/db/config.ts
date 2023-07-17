import mongoose from "mongoose";

export default async (cb: () => void) => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);

    console.log("mongodb connected succesfully! 💻💻💻");

    cb();
  } catch (error: any) {
    console.log("error connectiong to mongodb: ", error.message);

    process.exit();
  }
};
