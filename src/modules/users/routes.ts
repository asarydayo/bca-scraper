import { Router } from "express";
import auth from "common/middlewares/auth";
const router = Router();

import getAll from "./useCases/getAll";
import getOne from "./useCases/getOneByID";
import destroy from "./useCases/destroy";
import create from "./useCases/create";
import update from "./useCases/update";
import reset from "./useCases/resetPassword";

import createValidation from "./validation/create";
import updateValidation from "./validation/update";

import validate from "common/middlewares/validationMiddleware";

router.get("/", [auth], getAll);
router.post("/", [auth, ...createValidation, validate], create);
router.get("/:id", [auth], getOne);
router.delete("/:id", [auth], destroy);
router.put("/:id/reset", [auth], reset);
router.put("/:id", [auth, ...updateValidation, validate], update);

export default router;
