import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

//I need to set up a port for my app to listen
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});

//I need to set up my database pool using the connection string from the .env file
const dbConnectionString = process.env.DATABASE_URL;

export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

app.get("/phase", (req, res) => {
  res.json({ message: "you are looking tut! tut!" });
});

//I need to set up a root route
//You need two routes minimum
// end point
app.get("/phase", async (req, res) => {
  const query = await db.query(`SELECT * FROM phase`);
  //we can wrangle the query response to get the rows property only.
  res.json(query.rows);
  console.log(query);
});

//You need a route to READ the database data
app.get("/phase", async (req, res) => {
  const query = await db.query(`SELECT * FROM uploads`);
  //we can wrangle the query response to get the rows property only.
  res.json(query.rows);
  console.log(query);
});

app.post("/review", function (req, res) {
  const bodyData = req.body;
  console.log(bodyData);
  res.json({
    message: "Body data received",
    location: `${bodyData.location}`,
  });
});
