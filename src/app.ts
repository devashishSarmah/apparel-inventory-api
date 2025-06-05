import express from "express";
import { inventoryRouter } from "./routes/inventory";
import { orderRouter } from "./routes/order";
import { swaggerRouter } from "./swagger";

const app = express();
app.use(express.json());
app.use("/inventory", inventoryRouter);
app.use("/order", orderRouter);
app.use("/docs", swaggerRouter);

export default app;
