import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/server/api/routers";
import { createApiContext } from "@/server/context";

export default createNextApiHandler({
  router: appRouter,
  createContext: createApiContext,
});
