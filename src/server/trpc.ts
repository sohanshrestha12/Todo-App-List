import { initTRPC } from "@trpc/server";
import { Context as ApiContext } from "./context";

const t = initTRPC.context<ApiContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
