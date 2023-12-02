import { getPersons } from "~/server/data/persons";

export default defineEventHandler(async (event) => {
  const params = getQuery(event);
  const q = params.q;
  return await getPersons(q?.toLowerCase());
});
