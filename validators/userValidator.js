const { z } = require("zod");

//  Create User Schema
const createUserSchema = z.object({
  name: z.string().trim().min(3, "Name is required"),

  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase(),

  role: z.enum(["viewer", "analyst", "admin"], {     
    errorMap: () => ({ message: "Invalid role" }),
  }).optional(),

  isActive: z.boolean().optional(),
});


//  Update User Schema
const updateUserSchema = z.object({
  role: z.enum(["viewer", "analyst", "admin"]).optional(),
  isActive: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});


// Register (Signup)
const registerSchema = z.object({
  name: z.string().min(3, "Name is required"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});


// Login
const loginSchema = z.object({
  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});



module.exports = {
  createUserSchema,
  updateUserSchema,
  registerSchema,
  loginSchema,
};
