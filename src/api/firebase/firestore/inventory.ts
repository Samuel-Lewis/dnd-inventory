import { query, where } from "firebase/firestore";

import { firebase } from "..";
import { Inventory } from "../models/Inventory";
import { UserRef } from "../models/User";

import { FirestoreConnection } from "./connection";

class InventoryConnection extends FirestoreConnection<Inventory> {
  public ownedInventoriesQuery = (localUserIdRef?: UserRef | null) => {
    if (!localUserIdRef) {
      return null;
    }
    return query(this.collectionRef, where("owner", "==", localUserIdRef));
  };

  public override create(item: Inventory) {
    const keyHint = item.name;
    return super.create(item, keyHint);
  }
}

export const inventoryConnection = new InventoryConnection(
  firebase.firestore,
  "inventory"
);
