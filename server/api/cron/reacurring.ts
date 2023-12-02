import { processReacurring } from "~/server/data/transactions";

export default defineEventHandler(async (event: any) => {
  processReacurring();
  return {
    status: "OK",
  };
});
