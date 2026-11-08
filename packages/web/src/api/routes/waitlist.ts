import { z } from "zod";
import { base } from "../__core/app";
import { db } from "../database";
import { waitlist as table } from "../database/schema";

export const waitlist = {
  join: base
    .input(z.object({ email: z.string().trim().email().max(254).transform(value => value.toLowerCase()) }))
    .handler(async ({ input }) => {
      const inserted = await db.insert(table).values({ email: input.email }).onConflictDoNothing().returning({ id: table.id });
      return { success: true, alreadyJoined: inserted.length === 0 };
    }),
};