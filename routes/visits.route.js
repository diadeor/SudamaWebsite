import { Router } from "express";
import { updateVisit, getVisits } from "../controllers/visits.controller.js";

const visitRouter = Router();

visitRouter.get("/", getVisits);
visitRouter.post("/update", updateVisit);

export default visitRouter;
