import prisma from "./prisma";

export async function getAccounts() {
  return await prisma.Account.findMany({
    include: {
      person: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function createAccount(person, name) {
  try {
    return await prisma.Account.create({
      data: {
        person: { connect: { id: person } },
        name,
      },
    });
  } catch (e) {
    throw createError({
      statusCode: e.statusCode,
      message: "Erro ao cadastrar Conta",
      data: {
        statusCode: e.response?.status,
        responseBody: e.data,
      },
    });
  }
}

export async function updateAccount(id, person, name) {
  return await prisma.Account.update({
    where: {
      id,
    },
    data: {
      person: { connect: { id: person } },
      name,
    },
  });
}

export async function deleteAccount(id) {
  const result = await prisma.Account.delete({
    where: {
      id,
    },
  });
  return result;
}
