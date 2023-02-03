import { query, where } from "firebase/firestore";

import { firebase } from "..";
import { Item } from "../models/Item";
import { UserRef } from "../models/User";

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
}

export type ItemConnectionReturnType = ConnectionReturn<Item>;
export const itemConnection = new ItemConnection(firebase.firestore, "items");
