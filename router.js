import express from "express";
import routes from "./routes";
import { home, getAddWords, postAddWords, postReport } from "./controller";

const router = express.Router();

router.get(routes.home, home);
router.get(routes.addWords, getAddWords);
router.post(routes.addWords, postAddWords);
router.post(routes.report, postReport);

export default router;
