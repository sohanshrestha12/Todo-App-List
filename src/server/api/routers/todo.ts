import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const todoRouter = t.router({
  getAll: t.procedure.query(async () => {
    try {
      return (await prisma.todo.findMany()).reverse();
    } catch {
      throw new Error("Failed to fetch todos.");
    }
  }),
  add: t.procedure
    .input(
      z.object({ title: z.string().min(1), description: z.string().min(1) })
    )
    .mutation(async ({ input }) => {
      try {
        return await prisma.todo.create({
          data: {
            title: input.title,
            description: input.description,
          },
        });
      } catch {
        throw new Error("Failed to add todo.");
      }
    }),
  delete: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        return await prisma.todo.delete({
          where: { id: parseInt(input.id) },
        });
      } catch {
        throw new Error("Failed to delete todo.");
      }
    }),
  update: t.procedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        description: z.string().min(1),
        isCompleted: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await prisma.todo.update({
          where: { id: parseInt(input.id) },
          data: {
            title: input.title,
            description: input.description,
            isCompleted: input.isCompleted,
          },
        });
      } catch {
        throw new Error("Failed to update todo.");
      }
    }),
});
