import express from "express";
import { inventoryRouter } from "./routes/inventory";
import { orderRouter } from "./routes/order";

const app = express();
app.use(express.json());

app.use("/inventory", inventoryRouter);
app.use("/order", orderRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
