import Router from 'express-promise-router';
import {
  createTrainingSession,
  deleteTrainingSession,
  getAllTrainingsSessions,
  getTrainingByUser,
  updateTrainingSession,
} from '../controllers/user_trainings.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import {
  createTrainingSessionSchema,
  updateTrainingSessionSchema,
} from '../schemas/user_trainings.schema.js';

const router = Router();

router.get('/user_trainings_sessions', isAuth, getAllTrainingsSessions);

router.get('/user_trainings_sessions/:userEmail', isAuth, getTrainingByUser);

router.post(
  '/user_trainings_sessions',
  isAuth,
  validateSchema(createTrainingSessionSchema),
  createTrainingSession
);

router.put(
  '/user_trainings_sessions/:id',
  isAuth,
  validateSchema(updateTrainingSessionSchema),
  updateTrainingSession
);

router.delete('/user_trainings_sessions/:id', isAuth, deleteTrainingSession);

export default router;
