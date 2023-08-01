import type { NextApiRequest, NextApiResponse } from "next";

import { toUniqueSlug } from "@samuel-lewis/utils";

import { Item, ItemSchema, ItemTableKey } from "~/api/models/Item";
import { getApp } from "~/pages/api/_helpers/app";

import { getUserFromCookie } from "../_helpers/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ error: "Method not allowed" });
    return;
  }

  const user = getUserFromCookie(req, res);
  if (!user) {
    return;
  }

  const result = ItemSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send({ error: result.error });
    return;
  }

  const item: Item = result.data;

  const { database } = await getApp();

  const key = toUniqueSlug(item.name, { maxLength: 20 });
  const doc = database.collection(ItemTableKey).doc(key);
  const writeResult = await doc.set(item);

  res.status(200).send({ doc, writeResult });
}
