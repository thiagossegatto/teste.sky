import express from "express";
import cors from "cors";

import routes from "./routes";
import isContentJson from "./routes/isContentJson";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(isContentJson);
app.use(express.json());
app.use(routes);

const port = process.env.PORT || "4000";
app.listen(port, (err) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});
