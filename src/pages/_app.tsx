import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { CreateTasksProvider } from "~/context/CreateTaskContext";
import { GetTasksProvider } from "~/context/GetTaskContext";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import "react-perfect-scrollbar/dist/css/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CreateTasksProvider>
      <GetTasksProvider>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
        </Head>
        <ClerkProvider {...pageProps}>
          <Component {...pageProps} />
          <Analytics />
        </ClerkProvider>
      </GetTasksProvider>
    </CreateTasksProvider>
  );
}

export default api.withTRPC(MyApp);
