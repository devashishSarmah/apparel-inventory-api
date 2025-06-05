import { promises as fs } from "fs";
import { join } from "path";
export const catalogFile = join(__dirname, "../data/apparel-catalog.json");
export async function resetCatalog() {
  await fs.writeFile(catalogFile, "{}");
}
