import { firebase } from "..";
import { Inventory } from "../models/Inventory";

import { ConnectionReturn, FirestoreConnection } from "./connection";

class InventoryConnection extends FirestoreConnection<Inventory> {}

export type InventoryConnectionReturnType = ConnectionReturn<Inventory>;
export const inventoryConnection = new InventoryConnection(
  firebase.firestore,
  "inventory"
);
