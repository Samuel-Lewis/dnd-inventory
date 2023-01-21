import { AppProps } from "next/app";
import Head from "next/head";

import { RouterTransition } from "@/components/RouterTransition";
import { ThemeProvider } from "@samuel-lewis/components";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

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
        <RouterTransition />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
