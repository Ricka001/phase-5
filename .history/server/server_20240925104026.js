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

//You need a route to CREATE or ADD new data to the database
//! In your CREATE route, the request.body is an object that represents the form data coming from your client
app.post("/phase", function (req, res) {
  const bodyData = req.body;
  console.log(bodyData);
  res.json({
    message: "Body data received",
    location: `${bodyData.location}`,
  });
});

// this will get users and display
app.post("/get-user-data", async function (req, res) {
  const { username } = req.body;
  const query = await db.query(`SELECT * FROM phase WHERE user_name = $1`, [
    username,
  ]); //when we have a parameter($1, $2, $3), we need to specify the value in square brackets after the query is finished. That value is usually provided by the user when they submit a form --> in the body data of a form (req.body.animal)
  if (res.rows.length === 0) {
    return res.status(404).json({ error: "User not found!" });
  }
  res.json(query.rows[0]);
});
// db.query(`INSERT INTO phase (user_name,game_score,age) VALUES ($1,$2,$3)`, [
//   "phase",
//   "21",
//   "3",
// ]);

// retrieve data from app.js
app.post("/display-leader", async function (req, res) {
  const { username } = req.body;
  const query = await db.query(`SELECT game_score FROM phase = $1`, [
    leaderboard,
  ]); //when we have a parameter($1, $2, $3), we need to specify the value in square brackets after the query is finished. That value is usually provided by the user when they submit a form --> in the body data of a form (req.body.animal)
  if (res.rows.length === 0) {
    return res.status(404).json({ error: "No leader!" });
  }
  res.json(query.rows[0]);
});
