import Router from 'express-promise-router';
import {
  createTraining,
  deleteTraining,
  getAllTrainings,
  getTraining,
  updateTraining,
} from '../controllers/trainings.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import {
  createTrainingSchema,
  updateTrainingSchema,
} from '../schemas/trainings.schema.js';

const router = Router();

router.get('/training', isAuth, getAllTrainings);

router.get('/training/:name', isAuth, getTraining);

router.post(
  '/training',
  isAuth,
  validateSchema(createTrainingSchema),
  createTraining
);

router.put(
  '/training/:id',
  isAuth,
  validateSchema(updateTrainingSchema),
  updateTraining
);

router.delete('/training/:id', isAuth, deleteTraining);

export default router;
