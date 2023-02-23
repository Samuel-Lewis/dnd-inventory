import { query, where, arrayUnion, DocumentSnapshot } from "firebase/firestore";

import { firebase } from "..";
import {
  Inventory,
  InventoryItemEntry,
  InventoryKey,
} from "../models/Inventory";
import { ItemRef } from "../models/Item";
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

  public addItem(inventory: InventoryKey, itemDetails: InventoryItemEntry) {
    return this.updateDoc(inventory, {
      items: arrayUnion(itemDetails),
    });
  }

  public async updateItemQuantity(
    inventory: DocumentSnapshot<Inventory>,
    itemRef: ItemRef,
    newQuantity: number
  ) {
    const allItems = inventory.data()?.items ?? [];
    const childIndex = allItems.findIndex((i) => i.itemRef.id === itemRef.id);

    if (childIndex === -1) {
      console.warn("Item not found in inventory", { itemRef, inventory });
      return;
    }

    allItems[childIndex].quantity = newQuantity;

    return this.updateDoc(inventory.id, {
      items: allItems.filter((i) => i.quantity > 0),
    });
  }
}

export const inventoryConnection = new InventoryConnection(
  firebase.firestore,
  "inventory"
);
