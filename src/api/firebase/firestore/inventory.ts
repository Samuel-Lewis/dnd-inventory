import {
  query,
  where,
  arrayUnion,
  DocumentSnapshot,
  limit,
  orderBy,
} from "firebase/firestore";

import { toUniqueSlug } from "@samuel-lewis/utils";

import {
  Inventory,
  InventoryItemEntry,
  InventoryKey,
} from "~/api/models/Inventory";
import { UserRef } from "~/api/models/User";

import { firebase } from "..";

import { FirestoreConnection } from "./connection";

class InventoryConnection extends FirestoreConnection<Inventory> {
  public ownedInventoriesQuery = (localUserIdRef?: UserRef | null) => {
    if (!localUserIdRef) {
      return null;
    }
    return query(this.collectionRef, where("owner", "==", localUserIdRef));
  };

  public allInventoriesQuery = () => {
    return this.collectionRef;
  };

  public recentInventoriesQuery = (requestLimit = 5) => {
    return query(
      this.collectionRef,
      orderBy("name", "desc"),
      limit(requestLimit)
    );
  };

  public override create(item: Inventory) {
    const keyHint = item.name;
    return super.create(item, keyHint);
  }

  public addItem(inventory: InventoryKey, itemDetails: InventoryItemEntry) {
    const subKey = itemDetails.subKey ?? toUniqueSlug(itemDetails.itemRef.id);
    return this.updateDoc(inventory, {
      items: arrayUnion({ subKey, ...itemDetails }),
    });
  }

  public async updateItemQuantity(
    inventory: DocumentSnapshot<Inventory>,
    subKey: string,
    newQuantity: number
  ) {
    const allItems = inventory.data()?.items ?? [];
    const childIndex = allItems.findIndex((i) => i.subKey === subKey);

    if (childIndex === -1) {
      console.warn("Item not found in inventory", {
        subKey,
        inventory: inventory.id,
      });
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
