import { createAccount, updateAccount } from "../../data/accounts.js";

export default defineEventHandler(async (event: any) => {
  const { id, person, name } = await readBody(event);
  if (id) {
    return updateAccount(id, person, name);
  }
  return createAccount(person, name);
});
