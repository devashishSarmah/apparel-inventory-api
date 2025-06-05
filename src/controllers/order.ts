import { NextFunction, Request, Response } from "express";
import { store } from "../services/store";
import { Catalog, CustomerOrder } from "../models/types";

function quote(
  catalog: Catalog,
  order: CustomerOrder
): { canFulfill: boolean; total?: number; message?: string } {
  let total = 0;
  for (const { code, size, qty } of order.items) {
    const sku = catalog[`${code}|${size}`];
    if (!sku || sku.qty < qty)
      return {
        canFulfill: false,
        message: `Not enough inventory for ${code} ${size}. Available quantity: ${sku.qty}`,
      };
    total += sku.price * qty;
  }
  return { canFulfill: true, total, message: "Order can be fulfilled" };
}

export async function checkOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order = req.body as CustomerOrder;
    const catalog = await store.read();
    const result = quote(catalog, order);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
