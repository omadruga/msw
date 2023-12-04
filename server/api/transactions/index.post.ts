import { Transaction } from "@prisma/client";
import {
  createTransaction,
  updateTransaction,
} from "../../data/transactions.js";

export default defineEventHandler(async (event: any) => {
  const { id, account, date, amount, description, reacurring, parcels } =
    await readBody(event);

  var data: Transaction = {
    amount: parseFloat(amount),
    date,
    description,
    reacurring,
    parcels: parseInt(parcels),
  };

  if (id) {
    return updateTransaction(id, data, account);
  }

  data.currentParcel = 1;
  return createTransaction(data, account);
});
