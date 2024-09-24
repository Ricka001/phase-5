import { db } from "./server.js";

db.query(`CREATE TABLE IF NOT EXISTS phase(
id SERIAL PRIMARY KEY,
user_name TEXT,
age INT,
game_score INT
)`);
// db.query(`INSERT INTO uploads (user_name, content) VALUES ('Anthony','R')`);

// db.query(
//   `INSERT INTO uploads (user_name,user_surname,user_location,content) VALUES ($1,$2,$3)`,
//   ["phase", "21", "Leicester", "Male was jumping on the bed"]
// );

// async function queryDatabase() {
//   try {
//     const res = await db.query("SELECT * FROM phase");
//     console.log(res.rows);
//   } catch (err) {
//     console.error("Error executing query", err);
//   }
// }

// queryDatabase();
