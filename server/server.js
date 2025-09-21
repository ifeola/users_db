import express from "express";
import dotenv from "dotenv";
import database from "./database/database.js";
import router from "./router/router.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client")));
app.use(express.json());

app.use("/api/v1", router);

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
