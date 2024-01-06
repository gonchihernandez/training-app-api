import { pool } from '../db.js';

export const getAllTrainingsSessions = async (req, res, next) => {
  const result = await pool.query('SELECT * FROM trainings_sessions');
  return res.json(result.rows);
};

export const getTrainingSession = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM trainings_sessions ts, exercices e WHERE training_name = $1 AND e.name = ts.exercice_name',
    [req.params.name]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'There is no training session with name ' + req.params.name,
    });
  }

  return res.json(result.rows);
};

export const createTrainingSession = async (req, res, next) => {
  const { training_name, exercice_name } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO trainings_sessions (training_name,exercice_name) VALUES ($1, $2) RETURNING *',
      [training_name, exercice_name]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        message:
          'There is a training session with name ' +
          req.params.name +
          ', please select an other name ',
      });
    }
    next(error);
  }
};

export const updateTrainingSession = async (req, res) => {
  const id = req.params.id;
  const { training_name, exercice_name } = req.body;

  const result = await pool.query(
    'UPDATE trainings_sessions SET training_name = $2, exercice_name = $3 WHERE id = $1 RETURNING *',
    [id, training_name, exercice_name]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'Training session does not exist with that id',
    });
  }

  return res.json(result.rows[0]);
};

export const deleteTrainingSession = async (req, res) => {
  const result = await pool.query(
    'DELETE FROM trainings_sessions WHERE name = $1',
    [req.params.id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'Training does not exist with that name',
    });
  }

  return res.sendStatus(204);
};
