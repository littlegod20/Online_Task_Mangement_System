import express from "express";
import { fetchUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/me",fetchUser);

export default router;
