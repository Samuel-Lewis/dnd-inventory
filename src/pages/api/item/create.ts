import type { NextApiRequest, NextApiResponse } from "next";

import { getApp } from "~/pages/api/_helpers/app";

import { getUserFromCookie } from "../_helpers/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = getUserFromCookie(req, res);
  if (!user) {
    return;
  }

  const { app, database: db } = await getApp();
  const state = await db.collection("inventory").add({
    name: "Tokyo",
    country: "Japan",
    owner: user.uid,
  });

  res.status(200).send({ name: app.name, doc: state });
}
