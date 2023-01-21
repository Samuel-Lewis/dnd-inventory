import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNzXFtwz50PWSwIfd27oE7fL0ZJDyVUyw",
  authDomain: "dnd-inventory-70a1b.firebaseapp.com",
  projectId: "dnd-inventory-70a1b",
  storageBucket: "dnd-inventory-70a1b.appspot.com",
  messagingSenderId: "753862261677",
  appId: "1:753862261677:web:4a177c9a36f5580eee7f24",
};

class FirebaseConnection {
  readonly app: FirebaseApp;
  constructor(private config: Record<string, string>) {
    this.app = initializeApp(this.config);
  }

  get firestore() {
    return getFirestore(this.app);
  }
}

export const firebase = new FirebaseConnection(firebaseConfig);
