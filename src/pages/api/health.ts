import type { NextApiRequest, NextApiResponse } from "next";

import { getApp } from "./_helpers/app";
import { anonymiseUser, getUserFromCookie } from "./_helpers/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = getUserFromCookie(req, res);
  const { app, database: db } = await getApp();

  res.status(200).send({
    app: app.name,
    databaseConnected: !!db,
    user: user ? anonymiseUser(user) : null,
  });
}
