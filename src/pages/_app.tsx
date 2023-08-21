import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { CreateTasksProvider } from "~/context/CreateTaskContext";
import { GetTasksProvider } from "~/context/GetTaskContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CreateTasksProvider>
      <GetTasksProvider>
        <ClerkProvider {...pageProps}>
          <Component {...pageProps} />
        </ClerkProvider>
      </GetTasksProvider>
    </CreateTasksProvider>
  );
}

export default api.withTRPC(MyApp);
