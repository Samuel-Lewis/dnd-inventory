import { applicationDefault, initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const APP_NAME = "api-admin";

export const getApp = async () => {
  let app = getApps().find((app) => app.name === APP_NAME);
  if (!app) {
    app = initializeApp(
      {
        credential: applicationDefault(),
        ...firebaseConfig,
      },
      APP_NAME
    );
  }

  return {
    app,
    database: getFirestore(app),
    auth: getAuth(app),
  };
};
