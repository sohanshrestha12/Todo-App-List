"use client";
import { trpc } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

const queryClient = new QueryClient();
export function ClientProvider(props: { children: React.ReactNode }) {
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  });
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
