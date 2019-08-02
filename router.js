import express from "express";
import routes from "./routes";
import {
  home,
  getAddWords,
  postAddWords,
  postReport,
  generateWords,
  postAdmin,
  getAdmin
} from "./controller";

const router = express.Router();

router.get(routes.home, home);
router.post(routes.home, generateWords);
router.get(routes.addWords, getAddWords);
router.post(routes.addWords, postAddWords);
router.post(routes.report, postReport);

router.get(routes.admin, getAdmin);
router.post(routes.admin, postAdmin);

export default router;
