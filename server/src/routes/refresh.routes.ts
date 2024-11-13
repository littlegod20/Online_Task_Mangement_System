import express from "express";
import { refresh } from "../controllers/authentication/authentication.controller";

const router = express.Router()

router.get("/", refresh);


export default router