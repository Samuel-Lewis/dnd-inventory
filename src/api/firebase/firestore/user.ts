import { User } from "~/api/models/User";

import { firebase } from "..";

import { ConnectionReturn, FirestoreConnection } from "./connection";

class UserConnection extends FirestoreConnection<User> {}

export type UserConnectionReturnType = ConnectionReturn<User>;
export const userConnection = new UserConnection(firebase.firestore, "users");
