import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export async function getDashboard() {
  const data = await prisma.Transaction.findMany({
    include: {
      account: true,
    },
    orderBy: {
      date: "desc",
    },
  });
  return data;
}
