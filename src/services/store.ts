import { promises as fs } from "fs";
import { join } from "path";
import type { Catalog } from "../models/types";

const FILE = join(__dirname, "../../data/apparel-catalog.json");

async function read(): Promise<Catalog> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return {};
  }
}

async function write(catalog: Catalog) {
  const tmp = FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(catalog, null, 2)); // atomic swap
  await fs.rename(tmp, FILE);
}

export const store = { read, write };
