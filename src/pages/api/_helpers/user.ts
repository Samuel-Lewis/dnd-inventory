import { getCookie } from "cookies-next";
import { User } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";

import { CookieNames } from "~/cookies";

export const getUserFromCookie = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userString = getCookie(CookieNames.USER, { req, res })?.toString();
  const user = userString ? JSON.parse(userString) : null;

  // TODO: Not sure if should access stsTokenManager
  // TODO: Verify access token?
  if (!user || !user.stsTokenManager.accessToken) {
    res.status(401).send({ error: "Unauthorized", user: anonymiseUser(user) });
    return null;
  }

  return user as User;
};

export const anonymiseUser = (user: User) => ({
  emailVerified: user.emailVerified,
  isAnonymous: user.isAnonymous,
  uid: user.uid,
  providerId: user.providerId,
});
