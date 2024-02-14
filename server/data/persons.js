import prisma from "./prisma";

export async function getPersons(q) {
  if (!q) return await prisma.Person.findMany();
  return await prisma.Person.findMany({
    where: {
      OR: [
        {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
    },
  });
}

export async function createPerson(name) {
  try {
    return await prisma.Person.create({
      data: {
        name,
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function updatePerson(id, name) {
  return await prisma.Person.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function deletePerson(id) {
  const result = await prisma.Person.delete({
    where: {
      id,
    },
  });
  return result;
}
