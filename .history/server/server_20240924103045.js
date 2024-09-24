import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});

const dbConnectionString = process.env.DATABASE_URL;

export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

app.get("/review", (req, res) => {
  res.json({ message: "you are looking tut! tut!" });
});
