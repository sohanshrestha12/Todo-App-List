import { inferAsyncReturnType } from "@trpc/server";

export const createApiContext = async () => {
  return {};
};

export type Context = inferAsyncReturnType<typeof createApiContext>;
