import request from "supertest";
import app from "../src/app";
import { resetCatalog } from "./helpers";

beforeEach(resetCatalog);

describe("Inventory API", () => {
  it("create or update a single item", async () => {
    const res = await request(app)
      .post("/inventory")
      .send({ code: "TSHIRT-1", size: "M", qty: 10, price: 19.99 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: "Item saved successfully",
    });
  });

  it("create or update multiple items", async () => {
    const res = await request(app)
      .post("/inventory/bulk")
      .send([
        { code: "TSHIRT-1", size: "S", qty: 5, price: 18 },
        { code: "HOODIE-9", size: "L", qty: 2, price: 29 },
      ]);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: "Items saved successfully",
    });
  });
});
