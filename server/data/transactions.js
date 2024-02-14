import prisma from "./prisma";

export async function getTransactions(where) {
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
  if (where) {
    return await prisma.Transaction.findMany({
      include,
      where,
      orderBy: [{ date: "desc" }],
    });
  }
  return await prisma.Transaction.findMany({
    include,
    orderBy: [{ date: "desc", amount: "desc" }],
  });
}

export async function createTransaction(data, account) {
  data.account = { connect: { id: account } };

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

export async function updateTransaction(id, data, account) {
  data.account = { connect: { id: account } };

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

export async function processReacurring() {
  const today = new Date();
  const oneMonthEarlier = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );

  const transactions = await prisma.Transaction.findMany({
    where: {
      reacurring: true,
      OR: [
        {
          parcels: {
            gt: 0,
          },
          currentParcel: {
            lt: prisma.Transaction.fields.parcels,
          },
        },
        {
          parcels: {
            lt: 0,
          },
        },
      ],

      // last month only
      date: {
        gte: oneMonthEarlier,
      },
    },
  });

  let newTs = [];
  transactions.forEach((t) => {
    let newT = {};
    newT.accountId = t.accountId;
    newT.amount = t.amount;
    newT.description = t.description;
    newT.reacurring = t.reacurring;
    newT.parcels = t.parcels;
    newT.currentParcel = t.currentParcel > 0 ? t.currentParcel + 1 : null;
    newT.date = addMonths(t.date, 1);
    newTs.push(newT);
  });

  await prisma.Transaction.createMany({
    data: newTs,
  });
}

function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}
