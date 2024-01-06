import { z } from 'zod';

export const signupSchema = z.object({
  name: z
    .string({
      required_error: 'Name required',
      invalid_type_error: 'Name must be text',
    })
    .min(1)
    .max(255),
  email: z
    .string({
      required_error: 'Email required',
      invalid_type_error: 'Email must be text',
    })
    .email({
      message: 'Email must be valid',
    }),
  password: z
    .string({
      required_error: 'Password required',
      invalid_type_error: 'Password must be text',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .max(255),
});

export const signinSchema = z.object({
  email: z
    .string({
      required_error: 'Email ',
      invalid_type_error: 'Email must be text',
    })
    .email({
      message: 'Email must be valid',
    }),
  password: z
    .string({
      required_error: 'Password required',
      invalid_type_error: 'Password must be text',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .max(255, {
      message: 'Password must be at maximum 255 characters',
    }),
});
