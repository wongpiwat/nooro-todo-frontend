import { z as zod } from "zod";

export const schema = zod.object({
  id: zod.string().min(1, { message: "Id is required" }),
  title: zod.string().min(1, { message: "Title is required" }),
  color: zod.string().min(1, { message: "Color is required" }),
  status: zod.boolean({ message: "Status is required" }),
  timestamps: zod.date({ message: "Timestamps is required" }),
});

export type SchemaType = zod.infer<typeof schema>;
