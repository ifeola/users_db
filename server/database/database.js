import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const database = await mysql.createPool({
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	waitForConnections: true,
	connectionLimit: 10, // pool for efficiency
	queueLimit: 0,
});

export default database;
