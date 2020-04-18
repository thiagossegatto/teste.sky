import mongoose from "mongoose";
import "dotenv/config";

// if (process.env.MONGO_URI) {
  console.log(process.env.MONGO_URI);
  mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  });

  mongoose.Promise = global.Promise;
// }
export default mongoose;
