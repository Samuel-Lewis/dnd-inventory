import { query, where } from "firebase/firestore";

import { Item } from "~/api/models/Item";

import { firebase } from "..";

import { ConnectionReturn, FirestoreConnection } from "./connection";

class ItemConnection extends FirestoreConnection<Item> {
  public systemItemsQuery = () => {
    return query(this.collectionRef, where("srd", "==", true));
  };

  public publicItemsQuery = () => {
    return query(this.collectionRef, where("srd", "==", false));
  };

  public override create(item: Item) {
    const keyHint = item.name;
    return super.create(item, keyHint);
  }
}

export type ItemConnectionReturnType = ConnectionReturn<Item>;
export const itemConnection = new ItemConnection(firebase.firestore, "items");
