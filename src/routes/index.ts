import { Router } from "express";
const router = Router();

import exchange_rate from "modules/exchange_rate/routes";
import currency from "modules/currency/routes";

router.use("/currency", currency);
router.use("/exchange_rate", exchange_rate);

export default router;
