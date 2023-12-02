import { processReacurring } from "~/server/data/transactions";

export default defineEventHandler(async (event: any) => {
  await processReacurring();
  return {
    status: "OK",
  };
});
