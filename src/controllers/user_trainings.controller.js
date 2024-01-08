import { pool } from '../config/db.js';

export const getAllTrainingsSessions = async (req, res, next) => {
  const result = await pool.query(
    'SELECT ts.*, u.email FROM user_trainings ut, trainings t, trainings_sessions ts, exercices e, users u WHERE ut.student=u.id AND ut.training = t.name AND ts.training_name=t.name AND e.name = ts.exercice_name'
  );
  return res.json(result.rows);
};

const groupByTrainingName = (trainings) => {
  const groupedData = {};

  trainings.forEach((item) => {
    const {
      training_name,
      training_image,
      training_description,
      name,
      sets,
      description,
    } = item;

    const key = JSON.stringify({
      training_name,
    });

    if (!groupedData[key]) {
      groupedData[key] = {
        training_name,
        training_image,
        training_description,
        exercises: [],
      };
    }

    groupedData[key].exercises.push({ name, sets, description });
  });

  return Object.values(groupedData);
};

export const getTrainingByUser = async (req, res) => {
  const result = await pool.query(
    'SELECT t.*, e.* FROM user_trainings ut, trainings t, trainings_sessions ts, exercices e, users u WHERE u.email=$1 AND ut.student=u.id AND ut.training = t.training_name AND ts.training_name=t.training_name AND e.name = ts.exercice_name ORDER BY t.training_name',
    [req.params.userEmail]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'There is no training for the userEmail' + req.params.userEmail,
    });
  }

  const groupedData = groupByTrainingName(result.rows);

  return res.json(groupedData);
};

export const createTrainingSession = async (req, res, next) => {
  const { training_name, user_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO user_trainings (training, student) VALUES ($1, $2) RETURNING *',
      [training_name, user_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    if (error.code === '23505' && error.constraint === 'uq_trainingstudent') {
      return res.status(409).json({
        message:
          'There is already a training session with this training and user, please select another training or user.',
      });
    }
    next(error);
  }
};

export const updateTrainingSession = async (req, res) => {
  const id = req.params.id;
  const { training_name, user_id } = req.body;

  const result = await pool.query(
    'UPDATE user_trainings SET training = $2, student = $3 WHERE id = $1 RETURNING *',
    [id, training_name, user_id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'Training session does not exist with that id',
    });
  }

  return res.json(result.rows[0]);
};

export const deleteTrainingSession = async (req, res) => {
  const result = await pool.query('DELETE FROM user_trainings WHERE id = $1', [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'Training does not exist with that id',
    });
  }

  return res.sendStatus(204);
};
