import { Series } from "~/api/models/Series";

import { firebase } from "..";

import { ConnectionReturn, FirestoreConnection } from "./connection";

class SerriesConnection extends FirestoreConnection<Series> {}

export type SerriesConnectionReturnType = ConnectionReturn<Series>;
export const seriesConnection = new SerriesConnection(
  firebase.firestore,
  "series"
);
