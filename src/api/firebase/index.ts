import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, loadBundle } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

class FirebaseConnection {
  readonly app: FirebaseApp;
  constructor(private config: Record<string, string | undefined>) {
    this.app = initializeApp(this.config);

    // Load bundle
    fetch("bundle.txt")
      .then((result) => {
        if (result.body) {
          loadBundle(this.firestore, result.body);
        }
      })
      .catch((e) => console.log("Failed to load cache bundle", e));
  }

  get firestore() {
    return getFirestore(this.app);
  }

  get auth() {
    return getAuth(this.app);
  }
}

export const firebase = new FirebaseConnection(firebaseConfig);
