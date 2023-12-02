import { Transaction } from "@prisma/client";
import {
  createTransaction,
  updateTransaction,
} from "../../data/transactions.js";

export default defineEventHandler(async (event: any) => {
  console.log("transaction post event");

  const { id, person, account, date, amount, description } = await readBody(
    event
  );

  var data: Transaction = {
    amount: parseFloat(amount),
    date,
    description,
  };

  if (id) {
    return updateTransaction(id, data, account, person);
  }
  return createTransaction(data, account, person);
});
