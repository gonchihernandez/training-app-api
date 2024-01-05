import { z } from 'zod';

export const createExerciseSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be text',
    })
    .min(1)
    .max(255),
  sets: z
    .number({
      required_error: 'set is required',
      invalid_type_error: 'set must be a number',
    })
    .min(1)
    .max(255),
  description: z
    .string({
      required_error: 'La descripcion es requerida',
      invalid_type_error: 'La descripcion must be text',
    })
    .min(1)
    .max(255)
    .optional(),
});

export const updateExerciseSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be text',
    })
    .min(1)
    .max(255),
  sets: z
    .number({
      required_error: 'set is required',
      invalid_type_error: 'set must be a number',
    })
    .min(1)
    .max(255),
  description: z
    .string({
      required_error: 'La descripcion es requerida',
      invalid_type_error: 'La descripcion must be text',
    })
    .min(1)
    .max(255)
    .optional(),
});
