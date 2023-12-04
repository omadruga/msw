import { getDashboard } from "~/server/data/dashboard";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = query.page ? parseInt(query.page as string) : 1;
  console.log(page);
  let today = new Date(),
    start,
    end;
  if (page == 1) {
    start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  } else {
    start = new Date(today.getFullYear(), today.getMonth() - page, 1);
    end = new Date(today.getFullYear(), today.getMonth() - page + 1, 0);
  }
  console.log(start);
  console.log(end);
  return { data: await getDashboard(start, end) };
});
