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
  setDoc,
  UpdateData,
  updateDoc,
  WithFieldValue,
} from "firebase/firestore";

import { toUniqueSlug } from "@samuel-lewis/utils";

export const converter = <
  T extends WithFieldValue<DocumentData>
>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot<T>) => snap.data(),
});

export const nonNull = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export type ConnectionReturn<T> = {
  ref: DocumentReference<T>;
  snap: QueryDocumentSnapshot<T>;
  data: T;
};

export class FirestoreConnection<T extends WithFieldValue<DocumentData>> {
  protected collectionRef: CollectionReference<T>;
  protected converter = converter<T>();

  constructor(protected fs: Firestore, public readonly tableKey: string) {
    this.collectionRef = collection(this.fs, this.tableKey).withConverter(
      this.converter
    );
  }

  public refWithConverter(ref: DocumentReference<T> | null) {
    if (!ref) {
      return null;
    }
    return ref.withConverter(this.converter);
  }

  public async create(item: T, keyHint?: string) {
    if (keyHint) {
      const nd = doc(
        this.fs,
        this.tableKey,
        toUniqueSlug(keyHint, { maxLength: 20 })
      ).withConverter(this.converter);
      await setDoc(nd, item);
      return nd;
    }
    return addDoc(this.collectionRef, item);
  }

  public getDoc(key?: string) {
    if (!key) {
      return null;
    }
    return doc(this.fs, this.tableKey, key).withConverter(this.converter);
  }

  public pathToReference(path: string): DocumentReference<T> {
    if (!path.startsWith(this.tableKey)) {
      console.warn("Path does not start with table key", {
        path,
        tableKey: this.tableKey,
      });
    }

    return doc(this.fs, path).withConverter(this.converter);
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
    const docRef = doc(this.fs, this.tableKey, key).withConverter(
      this.converter
    );
    await updateDoc(docRef, item);
  }

  public async hydrateRef(
    ref: DocumentReference<T>
  ): Promise<ConnectionReturn<T> | null> {
    if (!ref) {
      console.error("NO REF");
    }
    const docSnap = await getDoc(ref.withConverter(this.converter));
    if (docSnap.exists()) {
      return { ref, snap: docSnap, data: docSnap.data() };
    }
    return null;
  }

  public async hydrateRefs(refs: DocumentReference<T>[]) {
    const r = refs.map((ref) => this.hydrateRef(ref));
    return (await Promise.all(r)).filter(nonNull);
  }
}
