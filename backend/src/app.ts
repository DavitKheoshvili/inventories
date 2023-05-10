import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors';
import { generateData } from "./db";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port: number | string = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/generate_random_data", (req: Request, res: Response) => {
  generateData();
  res.status(200).json({ message: "Generated" });
})

import inventoriesRouter from "./routes/inventories";
app.use("/inventories", inventoriesRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Sorry, can't find that!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
