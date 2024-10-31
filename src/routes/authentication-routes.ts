import express from "express";
import { login, signUp } from "../controllers/authentication-controllers";

import { emailValidator } from "../middlewares/validators";

const router = express.Router();

router.post("/signup", emailValidator, signUp);
router.post("/login", login);

export default router;
