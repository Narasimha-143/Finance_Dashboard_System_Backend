const { z } = require("zod");

const recordSchema = z.object({
  amount: z
    .number()
    .positive("Amount must be positive")
    .max(1000000, "Amount too large"),

  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: "Type must be income or expense" }),
  }),

  category: z
    .string()
    .trim()
    .min(1, "Category is required"),

  date: z.coerce.date(),

  notes: z
    .string()
    .max(200, "Notes cannot exceed 200 characters")
    .optional(),
});

module.exports = { recordSchema };