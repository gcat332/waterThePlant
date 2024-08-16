import express, { Request, Response } from "express";
import moment from "moment";

const app: any = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(`Hello, ${moment()}`);
});

app.post("/api", (req: Request, res: Response) => {
  let json: any = req.body;
  res.send(`body data : ${json}`);
  console.log(json);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
