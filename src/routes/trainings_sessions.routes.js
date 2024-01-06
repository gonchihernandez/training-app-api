import Router from 'express-promise-router';
import {
  createTrainingSession,
  deleteTrainingSession,
  getAllTrainingsSessions,
  getTrainingSession,
  updateTrainingSession,
} from '../controllers/trainings_sessions.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import {
  createTrainingSessionSchema,
  updateTrainingSessionSchema,
} from '../schemas/trainings_sessions.schema.js';

const router = Router();

router.get('/trainings_sessions', isAuth, getAllTrainingsSessions);

router.get('/trainings_sessions/:name', isAuth, getTrainingSession);

router.post(
  '/trainings_sessions',
  isAuth,
  validateSchema(createTrainingSessionSchema),
  createTrainingSession
);

router.put(
  '/trainings_sessions/:id',
  isAuth,
  validateSchema(updateTrainingSessionSchema),
  updateTrainingSession
);

router.delete('/trainings_sessions/:id', isAuth, deleteTrainingSession);

export default router;
