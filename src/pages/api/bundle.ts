import { promises as fs } from "fs";
import path from "path";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bundleDir = path.join(process.cwd(), "bundles");
  const fileContents = await fs.readFile(bundleDir + "/srd_bundle", "utf8");
  res.status(200).send(fileContents);
}
