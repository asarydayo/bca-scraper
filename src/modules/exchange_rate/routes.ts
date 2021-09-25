import { Router } from "express";
const router = Router();

import indexing from "./useCases/indexing";
import getAll from "./useCases/getAll";
import destroyByDate from "./useCases/destroyByDate";
import create from "./useCases/create";
import update from "./useCases/update";

import createValidation from "./validation/create";
import updateValidation from "./validation/update";

import validate from "common/middlewares/validationMiddleware";

// Get All Currency
router.get("/indexing", indexing);

router.get("/", getAll);

router.get("/:kurs", getAll);

// Create a Currency
router.post("/", [...createValidation, validate], create);

// Delete a Currency
router.delete("/:date", destroyByDate);

// Update a Currency
router.put("/", [...updateValidation, validate], update);

export default router;
