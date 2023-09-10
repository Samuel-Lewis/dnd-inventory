import { customAlphabet } from "nanoid";

import {
  DIVIDER,
  INVENTORY_KEY,
  ITEM_KEY,
  PARTITION_KEY,
  SORT_KEY,
  USER_KEY,
} from "./common";

export const generateId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  12
);

export class RowId {
  private usrId: string;
  private itmId: string | undefined;
  private invId: string | undefined;
  private usrInSortKey = false;
  private itmInSortKey = false;
  private invInSortKey = false;

  constructor(partitionKey?: string, sortKey?: string) {
    const pk = RowId.parseId(partitionKey ?? "");
    const sk = RowId.parseId(sortKey ?? "");

    this.usrId = pk.userId ?? sk.userId ?? generateId();
    this.itmId = pk.itemId ?? sk.itemId;
    this.invId = pk.inventoryId ?? sk.inventoryId;

    this.usrInSortKey = !!sk.userId;
    this.itmInSortKey = !!sk.itemId;
    this.invInSortKey = !!sk.inventoryId;
  }

  public addUser(sortKey = false, userId?: string) {
    this.usrInSortKey = sortKey;
    this.usrId = userId ?? generateId();
    return this;
  }
  public addItem(sortKey = false, itemId?: string) {
    this.itmInSortKey = sortKey;
    this.itmId = itemId ?? generateId();
    return this;
  }

  public addInventory(sortKey = false, inventoryId?: string) {
    this.invInSortKey = sortKey;
    this.invId = inventoryId ?? generateId();
    return this;
  }

  public assertUser(expectAsSortKey = false) {
    if (!this.usrId) {
      throw new Error("Missing user id");
    }
    if (expectAsSortKey && !this.usrInSortKey) {
      throw new Error("User id is not in sort key");
    }
    return this;
  }

  public assertItem(expectAsSortKey = false) {
    if (!this.itmId) {
      throw new Error("Missing item id");
    }
    if (expectAsSortKey && !this.itmInSortKey) {
      throw new Error("Item id is not in sort key");
    }
    return this;
  }

  public assertInventory(expectAsSortKey = false) {
    if (!this.invId) {
      throw new Error("Missing inventory id");
    }
    if (expectAsSortKey && !this.invInSortKey) {
      throw new Error("Inventory id is not in sort key");
    }
    return this;
  }

  public get userId() {
    return this.usrId;
  }
  public get itemId() {
    return this.itmId;
  }

  public get inventoryId() {
    return this.invId;
  }

  public partitionKey() {
    const parts = [];
    if (this.usrId && !this.usrInSortKey) {
      parts.push(USER_KEY);
      parts.push(this.usrId);
    }
    if (this.itmId && !this.itmInSortKey) {
      parts.push(ITEM_KEY);
      parts.push(this.itmId);
    }
    if (this.invId && !this.invInSortKey) {
      parts.push(INVENTORY_KEY);
      parts.push(this.invId);
    }

    return parts.join(DIVIDER);
  }

  public sortKey() {
    const parts = [];
    if (this.usrId && this.usrInSortKey) {
      parts.push(USER_KEY);
      parts.push(this.usrId);
    }
    if (this.itmId && this.itmInSortKey) {
      parts.push(ITEM_KEY);
      parts.push(this.itmId);
    }
    if (this.invId && this.invInSortKey) {
      parts.push(INVENTORY_KEY);
      parts.push(this.invId);
    }

    return parts.join(DIVIDER);
  }

  public key() {
    return {
      [PARTITION_KEY]: this.partitionKey(),
      [SORT_KEY]: this.sortKey() || "meta",
    };
  }

  public id() {
    return {
      [USER_KEY]: this.usrId,
      [ITEM_KEY]: this.itmId,
      [INVENTORY_KEY]: this.invId,
      ...this.key(),
    };
  }

  public static parseId(id: string) {
    const parts = id.split(DIVIDER);

    let userId: string | undefined;
    let itemId: string | undefined;
    let inventoryId: string | undefined;

    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === USER_KEY && i + 1 < parts.length) {
        userId = parts[i + 1];
        i + 1;
        continue;
      }

      if (parts[i] === ITEM_KEY && i + 1 < parts.length) {
        itemId = parts[i + 1];
        i + 1;
        continue;
      }

      if (parts[i] === INVENTORY_KEY && i + 1 < parts.length) {
        inventoryId = parts[i + 1];
        i + 1;
        continue;
      }
    }

    return {
      userId,
      itemId,
      inventoryId,
    };
  }
}
