import prisma from "./prisma";
import { Prisma } from "@prisma/client";

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
