import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { fail } from "common/responses";

export default function ValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send(fail(errors.array(), "Form validation failed"));
  }
  return next();
}
