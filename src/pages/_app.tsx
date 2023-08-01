import { setCookie } from "cookies-next";
import { signInAnonymously } from "firebase/auth";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { ThemeProvider } from "@samuel-lewis/components";

import { firebase } from "~/api/firebase";
import { userConnection } from "~/api/firebase/firestore/user";
import { ErrorBoundary } from "~/components/ErrorBoundary";
import { Layout } from "~/components/Layout";
import { AddItemModal, ADD_ITEM_MODAL_KEY } from "~/components/modals";
import { RouterTransition } from "~/components/RouterTransition";
import { colorsOverride } from "~/components/theme/colors";
import { CookieNames } from "~/cookies";

export default function App(props: AppProps) {
  const { Component, pageProps, router } = props;

  const isIndex = router.pathname === "/";

  useEffect(() => {
    signInAnonymously(firebase.auth).then((auth) => {
      userConnection.getOrCreateDoc(auth.user.uid, {
        name: "Anonymous",
      });
      setCookie(CookieNames.USER, auth.user);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Party Packrat</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider
        themeOverride={{
          colors: colorsOverride,
          white: "#ede4da",
          black: "#353540",
          primaryColor: "red",
          colorScheme: "dark",

          globalStyles: () => ({
            a: {
              color: "inherit",
              textDecoration: "none",
              ":hover": {
                textDecoration: "underline",
              },
            },
          }),
        }}
      >
        <NotificationsProvider>
          <ErrorBoundary>
            <ModalsProvider
              modals={{ [ADD_ITEM_MODAL_KEY]: AddItemModal }}
              modalProps={{
                size: "xl",
                transition: "fade",
                centered: true,
                closeOnClickOutside: false,
                exitTransitionDuration: 200,
                overflow: "inside",
              }}
            >
              {isIndex ? (
                <>
                  <RouterTransition />
                  <Component {...pageProps} />
                </>
              ) : (
                <Layout>
                  <ErrorBoundary>
                    <RouterTransition />
                    <Component {...pageProps} />
                  </ErrorBoundary>
                </Layout>
              )}
            </ModalsProvider>
          </ErrorBoundary>
        </NotificationsProvider>
      </ThemeProvider>
    </>
  );
}
