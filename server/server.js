import express from "express";
import dotenv from "dotenv";
import database from "./database/database.js";
import router from "./router/router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/v1", router);

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
