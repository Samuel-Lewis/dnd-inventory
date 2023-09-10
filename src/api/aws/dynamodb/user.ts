import { MetaModelSchema, MetaModelType } from "~/api/models/common";
import { User, UserSchema } from "~/api/models/User";

import { db } from "./common";
import { RowId } from "./id";

export const createUser = async (User: User): Promise<User & MetaModelType> => {
  const id = new RowId().addUser();
  return await db.create<User>(id, User);
};

export const readUser = async (rowId: RowId): Promise<User & MetaModelType> => {
  const id = rowId.assertUser();
  const data = await db.read(id);
  return MetaModelSchema.merge(UserSchema).parse(data.Item);
};

export const updateUser = async (rowId: RowId, User: Partial<User>) => {
  const id = rowId.assertUser();
  return await db.update(id, User);
};

export const deleteUser = async (rowId: RowId) => {
  const id = rowId.assertUser();
  // TODO: Check that the rowId is healthy and actually points to an User
  return await db.delete(id);
};
