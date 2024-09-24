import { db } from "./server.js";

db.query(`CREATE TABLE IF NOT EXISTS phase(
id SERIAL PRIMARY KEY,
user_name TEXT,
game_score INT
)`);

async function queryDatabase() {
  try {
    const res = await db.query("SELECT * FROM phase");
    console.log(res.rows);
  } catch (err) {
    console.error("Error executing query", err);
  }
}

queryDatabase();
