import Router from 'express-promise-router';
import {
  createExercise,
  deleteExercise,
  getAllExercices,
  getExercise,
  updateExercise,
} from '../controllers/exercices.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import {
  createExerciseSchema,
  updateExerciseSchema,
} from '../schemas/exercices.schema.js';

const router = Router();

router.get('/exercices', isAuth, getAllExercices);

router.get('/exercices/:name', isAuth, getExercise);

router.post(
  '/exercices',
  isAuth,
  validateSchema(createExerciseSchema),
  createExercise
);

router.put(
  '/exercices/:name',
  isAuth,
  validateSchema(updateExerciseSchema),
  updateExercise
);

router.delete('/exercices/:id', isAuth, deleteExercise);

export default router;
