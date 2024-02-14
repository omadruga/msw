import prisma from "./prisma";

export async function getDashboard(start, end) {
  const data = await prisma.Transaction.findMany({
    include: {
      account: true,
    },
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return data;
}
