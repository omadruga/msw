import { getTransactions } from "~/server/data/transactions";

export default defineEventHandler(async (event) => {
  const params = getQuery(event);
  const account = params.account;
  if (account) {
    var where = {};
    if (account) {
      where.accountId = parseInt(account);
    }
    return await getTransactions(where);
  }
  return await getTransactions();
});
