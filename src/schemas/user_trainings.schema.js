import { z } from 'zod';

export const createTrainingSessionSchema = z.object({
  training_name: z
    .string({
      required_error: 'training name is required',
      invalid_type_error: 'training name must be text',
    })
    .min(1)
    .max(255),
  user_id: z
    .number({
      required_error: 'user id is required',
      invalid_type_error: 'user id must be number',
    })
    .min(1)
    .max(255)
    .optional(),
});

export const updateTrainingSessionSchema = z.object({
  training_name: z
    .string({
      required_error: 'training name is required',
      invalid_type_error: 'training name must be text',
    })
    .min(1)
    .max(255),
  user_id: z
    .number({
      required_error: 'user id is required',
      invalid_type_error: 'user id must be number',
    })
    .min(1)
    .max(255)
    .optional(),
});
