import request from "supertest";
import app from "../src/app";
import { resetCatalog } from "./helpers";

beforeEach(async () => {
  await resetCatalog();
  await request(app)
    .post("/inventory/bulk")
    .send([
      { code: "TSHIRT-1", size: "M", qty: 5, price: 20 },
      { code: "HOODIE-9", size: "L", qty: 2, price: 30 },
    ]);
});

describe("Order API", () => {
  it("returns canFulfill true with total and a message", async () => {
    const res = await request(app)
      .post("/order/check")
      .send({
        items: [
          { code: "TSHIRT-1", size: "M", qty: 3 },
          { code: "HOODIE-9", size: "L", qty: 1 },
        ],
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      canFulfill: true,
      total: 3 * 20 + 1 * 30,
      message: "Order can be fulfilled",
    });
  });

  it("returns canFulfill false when stock is insufficient", async () => {
    const res = await request(app)
      .post("/order/check")
      .send({
        items: [{ code: "HOODIE-9", size: "L", qty: 5 }],
      });
    expect(res.body).toEqual({
      canFulfill: false,
      message: `Not enough inventory for HOODIE-9 L. Available quantity: 2`,
    });
  });
});
