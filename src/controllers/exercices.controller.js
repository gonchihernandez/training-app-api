import { pool } from '../db.js';

export const getAllExercices = async (req, res, next) => {
  const result = await pool.query('SELECT * FROM exercices');
  return res.json(result.rows);
};

export const getExercise = async (req, res) => {
  const result = await pool.query('SELECT * FROM exercices WHERE name = $1', [
    req.params.name,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'There is no exercise with name ' + req.params.name,
    });
  }

  return res.json(result.rows[0]);
};

export const createExercise = async (req, res, next) => {
  const { name, sets, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO exercices (name,sets, description) VALUES ($1, $2,$3) RETURNING *',
      [name, sets, description]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        message:
          'There is an exercise with name ' +
          req.params.name +
          ', please select an other name ',
      });
    }
    next(error);
  }
};

export const updateExercise = async (req, res) => {
  const id = req.params.id;
  const { name, sets, description } = req.body;

  const result = await pool.query(
    'UPDATE exercices SET name = $2, sets = $3, description = $4 WHERE name = $1 RETURNING *',
    [id, name, sets, description]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'Exercise does not exist with that name',
    });
  }

  return res.json(result.rows[0]);
};

export const deleteExercise = async (req, res) => {
  const result = await pool.query('DELETE FROM exercices WHERE name = $1', [
    req.params.name,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'Exercise does not exist with that name',
    });
  }

  return res.sendStatus(204);
};
