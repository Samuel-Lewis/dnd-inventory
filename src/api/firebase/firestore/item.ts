import { firebase } from "..";
import { Item } from "../models/Item";

import { ConnectionReturn, FirestoreConnection } from "./connection";

class ItemConnection extends FirestoreConnection<Item> {}

export type ItemConnectionReturnType = ConnectionReturn<Item>;
export const itemConnection = new ItemConnection(firebase.firestore, "items");
