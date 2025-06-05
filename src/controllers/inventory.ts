import { NextFunction, Request, Response } from "express";
import { SKU } from "../models/types";
import { store } from "../services/store";

export async function createOrUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { code, size, qty, price } = req.body as SKU;

    if (!code || !size) {
      return res
        .status(400)
        .json({ error: "code & size of the item are required" });
    }

    const catalog = await store.read();

    catalog[`${code}|${size}`] = { code, size, qty, price };
    await store.write(catalog);
    return res.status(200).json({ message: "Item saved successfully" });
  } catch (error) {
    next(error);
  }
}

export async function createOrUpdateMany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const items = req.body as SKU[];
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items found" });
    }

    const catalog = await store.read();
    for (const { code, size, qty, price } of items) {
      catalog[`${code}|${size}`] = { code, size, qty, price };
    }

    await store.write(catalog);
    return res.status(200).json({ message: "Items saved successfully" });
  } catch (error) {
    next(error);
  }
}
