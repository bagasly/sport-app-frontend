import { z } from "zod";
import {
  usernameSchema,
  phoneSchema,
  passwordSchema,
} from "@/schemas/auth";

export const loginFormSchema = z.object({
  username: usernameSchema,
  phone: phoneSchema,
  password: passwordSchema,
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;