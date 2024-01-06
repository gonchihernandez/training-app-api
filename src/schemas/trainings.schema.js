import { z } from 'zod';

export const createTrainingSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be text',
    })
    .min(1)
    .max(255),
  // image: z
  //   .string({
  //     required_error: 'image is required',
  //     invalid_type_error: 'image must be an image object',
  //   })
  //   .min(1)
  //   .max(255),
  description: z
    .string({
      required_error: 'description is required',
      invalid_type_error: 'description must be text',
    })
    .min(1)
    .max(255)
    .optional(),
});

export const updateTrainingSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be text',
    })
    .min(1)
    .max(255),
  // image: z
  //   .string({
  //     required_error: 'image is required',
  //     invalid_type_error: 'image must be an image object',
  //   })
  //   .min(1)
  //   .max(255),
  description: z
    .string({
      required_error: 'description is required',
      invalid_type_error: 'description must be text',
    })
    .min(1)
    .max(255)
    .optional(),
});
