import { Router } from "express";
import { login, meController } from "../controller/auth";

const router = Router();

router.get("/me", meController);

router.post("/login", login);

export default router;
