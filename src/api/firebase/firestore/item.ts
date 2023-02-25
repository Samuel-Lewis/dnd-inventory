import { query, where } from "firebase/firestore";

import { Item } from "~/api/models/Item";
import { UserRef } from "~/api/models/User";

import { firebase } from "..";

import { ConnectionReturn, FirestoreConnection } from "./connection";

class ItemConnection extends FirestoreConnection<Item> {
  public publicItemsQuery = (localUserIdRef?: UserRef | null) => {
    if (!localUserIdRef) {
      return null;
    }

    return query(
      this.collectionRef,
      // where("owner", "==", localUserIdRef),
      where("visibility", "==", "public")
    );
  };

  public override create(item: Item) {
    const keyHint = item.name;
    return super.create(item, keyHint);
  }
}

export type ItemConnectionReturnType = ConnectionReturn<Item>;
export const itemConnection = new ItemConnection(firebase.firestore, "items");
