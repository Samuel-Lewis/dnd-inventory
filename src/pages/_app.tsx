import { signInAnonymously } from "firebase/auth";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

import { ThemeProvider } from "@samuel-lewis/components";

import { firebase } from "~/api/firebase";
import { userConnection } from "~/api/firebase/firestore/user";
import { Layout } from "~/components/Layout";
import { RouterTransition } from "~/components/RouterTransition";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  useEffect(() => {
    signInAnonymously(firebase.auth).then((auth) =>
      userConnection.getOrCreateDoc(auth.user.uid, {
        name: "Anonymous",
      })
    );
  }, []);

  return (
    <>
      <Head>
        <title>Party Inventory</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider>
        <Layout>
          <RouterTransition />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
