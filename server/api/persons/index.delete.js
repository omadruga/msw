import { deletePerson } from "../../data/persons.js";
export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  const result = deletePerson(id);
  return result;
});
