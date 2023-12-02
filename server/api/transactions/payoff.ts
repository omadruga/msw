import { Transaction } from "@prisma/client";
import { createPayoff, updatePayoff } from "../../data/transactions.js";

export default defineEventHandler(async (event: any) => {
  console.log("transaction post event");

  const { id, date, amount } = await readBody(event);

  var data: Transaction = {
    amount: parseFloat(amount),
    description: "Jaque pagou R$ " + amount + " ao Gustavo",
    date,
  };

  if (id) {
    return updatePayoff(id, data);
  }
  return createPayoff(data);
});
