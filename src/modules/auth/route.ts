import { Router } from "express";
import auth from "common/middlewares/auth";
const router = Router();

import login from "./login";
import me from "./me";

router.post("/login", login);
router.get("/me", [auth], me);

export default router;
