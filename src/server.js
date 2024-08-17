import { createRequire } from "module";
const require = createRequire(import.meta.url);
// import devDependencies;
import express from "express";
import moment from "moment";
// import internal function;
import { getAnswer } from "./function/conn.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`Current Time is : ${moment()}`);
});

app.post("/api", (req, res) => {
  let date = moment();
  let json = {
    day: date.date(),
    month: date.month() + 1,
    year: date.year(),
    hour: date.get("hour"),
    minute: date.get("minute"),
  };
  // let json = req.body;
  getAnswer(json).then((ans) => {
    res.send(`${JSON.stringify(ans)} and ${JSON.stringify(json)}`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
