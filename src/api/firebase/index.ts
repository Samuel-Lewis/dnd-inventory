import axios from "axios";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, loadBundle } from "firebase/firestore";

import { getAbsoluteUrl } from "~/lib/vercel";

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
    const a = initializeApp(this.config);
    this.app = a;
    const fs = getFirestore(a);

    axios
      .get(`${getAbsoluteUrl()}/api/bundle`)
      .then((result) => {
        if (result.data) {
          try {
            loadBundle(fs, result.data);
          } catch (e) {
            console.warn("Failed to load cache bundle");
          }
        }
      })
      .catch(() => console.warn("Failed to load cache bundle"));
  }

  get firestore() {
    return getFirestore(this.app);
  }

  get auth() {
    return getAuth(this.app);
  }
}

export const firebase = new FirebaseConnection(firebaseConfig);
