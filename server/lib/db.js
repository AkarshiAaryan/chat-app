import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI not set in environment");
    await mongoose.connect(`${uri}/chat-app`, {
      // useNewUrlParser and useUnifiedTopology are defaults in Mongoose 7+
    });

    mongoose.connection.on("connected", () => {
      console.log("Database Connected");
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
