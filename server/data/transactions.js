import prisma from "./prisma";
import { Prisma } from "@prisma/client";
import { useDayjs } from "#dayjs";

export async function getTransactions(where) {
  const include = {
    account: {
      include: {
        person: {
          select: {
            name: true,
          },
        },
      },
    },
    buyer: true,
  };
  if (where) {
    return await prisma.Transaction.findMany({
      include,
      where,
      orderBy: [{ date: "desc" }],
    });
  }
  return await prisma.Transaction.findMany({
    include,
    orderBy: [{ date: "desc" }],
  });
}

export async function createTransaction(data, account, person) {
  data.account = { connect: { id: account } };
  data.buyer = { connect: { id: person } };

  try {
    const result = await prisma.Transaction.create({
      data: data,
    });

    return result;
  } catch (e) {
    console.log(e);
    throw createError({
      statusCode: e.statusCode,
      message: "Erro ao cadastrar Transação",
      data: {
        statusCode: e.response?.status,
        responseBody: e.data,
      },
    });
  }
}

export async function updateTransaction(id, data, account, person) {
  data.account = { connect: { id: account } };
  data.buyer = { connect: { id: person } };

  try {
    const result = await prisma.Transaction.update({
      where: {
        id,
      },
      data,
    });

    return result;
  } catch (e) {
    console.log(e);
    throw createError({
      statusCode: e.statusCode,
      message: "Erro ao cadastrar Transação",
      data: {
        statusCode: e.response?.status,
        responseBody: e.data,
      },
    });
  }
}

export async function deleteTransaction(id) {
  const result = await prisma.Transaction.delete({
    where: {
      id,
    },
  });
  return result;
}

export async function getProjection() {
  const include = {
    account: {
      include: {
        person: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
  };
  let sum1 = 0;
  let sum2 = 0;
  const transactions = await prisma.Transaction.findMany({
    include,
    orderBy: [{ date: "desc" }],
  });
  transactions.forEach((t) => {
    if (t.payoff) {
      sum1 -= t.amount;
      sum2 += t.amount;
    } else {
      if (t.account.person.id == 1) {
        sum1 += t.amount;
      } else {
        sum2 += t.amount;
      }
    }
  });
  let total = (sum1 - sum2) / 2;
  return [
    { person: "Gu", total: total },
    { person: "Jaque", total: total * -1 },
  ];
}

export async function createPayoff(data) {
  data.payoff = true;
  try {
    const result = await prisma.Transaction.create({
      data: data,
    });

    return result;
  } catch (e) {
    console.log(e);
    throw createError({
      statusCode: e.statusCode,
      message: "Erro ao cadastrar Transação",
      data: {
        statusCode: e.response?.status,
        responseBody: e.data,
      },
    });
  }
}

export async function updatePayoff(id, data) {
  data.payoff = true;

  try {
    const result = await prisma.Transaction.update({
      where: {
        id,
      },
      data,
    });

    return result;
  } catch (e) {
    console.log(e);
    throw createError({
      statusCode: e.statusCode,
      message: "Erro ao cadastrar Transação",
      data: {
        statusCode: e.response?.status,
        responseBody: e.data,
      },
    });
  }
}
