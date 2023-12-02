import { createPerson, updatePerson } from "../../data/persons.js";
export default defineEventHandler(async (event) => {
  const { id, name, person } = await readBody(event);
  if (id) {
    return updatePerson(id, name, person);
  }
  return createPerson(name, person);
});
