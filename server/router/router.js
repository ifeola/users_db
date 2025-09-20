import { Router } from "express";
import { getUsers, postUser } from "../controller/controller.js";

const router = Router();

router.post("/users", postUser);
router.get("/users", getUsers);

export default router;
