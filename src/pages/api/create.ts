import type { NextApiRequest, NextApiResponse } from "next";

import { getApp } from "./_helpers/app";
import { getUserFromCookie } from "./_helpers/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getUserFromCookie(req, res);
  if (!token) {
    return;
  }

  const { app, database: db } = await getApp();
  const tu = await db.doc("TODO").get();

  res.status(200).send({ name: app.name, doc: tu.data()?.name });
}
