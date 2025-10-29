import { Router } from "express";
import { getCount } from "../controllers/misc.controller.js";

const miscRouter = Router();

miscRouter.get("/stats", getCount);

export default miscRouter;
