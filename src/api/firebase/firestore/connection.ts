import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  getDoc,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
  UpdateData,
  updateDoc,
  WithFieldValue,
} from "firebase/firestore";

import { DocMeta } from "../models/Meta";

export const converter = <
  T extends WithFieldValue<DocumentData & DocMeta>
>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const nonNull = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export type ConnectionReturn<T> = {
  ref: DocumentReference<T>;
  snap: QueryDocumentSnapshot<T>;
  data: T;
};

export class FirestoreConnection<
  T extends WithFieldValue<DocumentData & DocMeta>
> {
  protected collectionRef: CollectionReference<T>;
  protected converter = converter<T>();

  constructor(protected fs: Firestore, protected tableKey: string) {
    this.collectionRef = collection(this.fs, this.tableKey).withConverter(
      this.converter
    );
  }

  public create(item: T): Promise<DocumentReference<T>> {
    const meta: DocMeta = {
      meta: {
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
    };
    return addDoc<T>(this.collectionRef, { ...item, ...meta });
  }

  public getDoc(key?: string) {
    if (!key) {
      return null;
    }
    return doc(this.fs, this.tableKey, key).withConverter(this.converter);
  }

  public async getDocValue(key: string): Promise<ConnectionReturn<T> | null> {
    const docRef = doc(this.fs, this.tableKey, key).withConverter(
      this.converter
    );

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ref: docRef, snap: docSnap, data: docSnap.data() };
    }
    return null;
  }

  public async getOrCreateDoc(key: string, defaultValue: T) {
    const docRef = doc(this.fs, this.tableKey, key).withConverter(
      this.converter
    );

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, defaultValue);
    }
    return { ref: docRef, snap: docSnap, data: docSnap.data() };
  }

  public async updateDoc(key: string, item: UpdateData<T>) {
    const nowTimestamp = serverTimestamp();
    const docRef = doc(this.fs, this.tableKey, key).withConverter(
      this.converter
    );
    await updateDoc(docRef, { ...item, "meta.updatedAt": nowTimestamp });
  }

  public async hydrateRef(
    ref: DocumentReference<T>
  ): Promise<ConnectionReturn<T> | null> {
    const docSnap = await getDoc(ref.withConverter(this.converter));
    if (docSnap.exists()) {
      return { ref, snap: docSnap, data: docSnap.data() };
    }
    return null;
  }

  public async hydrateRefs(
    refs: DocumentReference<T>[]
  ): Promise<ConnectionReturn<T>[]> {
    const r = refs.map((ref) => this.hydrateRef(ref));
    return (await Promise.all(r)).filter(nonNull);
  }
}
