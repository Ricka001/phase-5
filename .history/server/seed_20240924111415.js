import { db } from "./server.js";

db.query(`CREATE TABLE IF NOT EXISTS phase(
id SERIAL PRIMARY KEY,
user_name TEXT,
game_score INT
)`);
