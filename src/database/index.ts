import mongoose from "mongoose";

mongoose.connect("mongodb+srv://skyTest:skyTest@cluster0-umqet.mongodb.net/test?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

export default mongoose;
