import dotenv from "dotenv";
import express, { Express } from "express";
import weatherRouter from "./routes/weather.route";

dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();

app.use(express.json());

app.use("/api/weather", weatherRouter);

export async function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
}