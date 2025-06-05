import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const doc = YAML.load("./openapi.yaml");
export const swaggerRouter = Router().use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(doc)
);
