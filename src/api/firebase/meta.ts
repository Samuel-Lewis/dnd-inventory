import { serverTimestamp, Timestamp } from "firebase/firestore";

import { DocMeta } from "~/api/models/Meta";

export const newMeta = (): DocMeta => ({
  createdAt: Timestamp.now(),
  updatedAt: serverTimestamp(),
});
