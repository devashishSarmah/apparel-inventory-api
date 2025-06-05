import { Router } from "express";
import { checkOrder } from "../controllers/order";

export const orderRouter = Router();

orderRouter.post("/check", checkOrder);
