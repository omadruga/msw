import { processReacurring } from "~/server/data/transactions";

export default function eventHandler(req, res) {
  processReacurring();
  //return res.send("Done");
}
