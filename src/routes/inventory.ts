import { Router } from "express";
import { createOrUpdate, createOrUpdateMany } from "../controllers/inventory";

export const inventoryRouter = Router();

inventoryRouter.post("/", createOrUpdate);
inventoryRouter.post("/bulk", createOrUpdateMany);
