import { getProjection } from "~/server/data/transactions";

export default defineEventHandler(async (event) => {
  return await getProjection();
});
