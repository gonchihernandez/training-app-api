import { pool } from '../config/db.js';

export const getAllTrainings = async (req, res, next) => {
  const result = await pool.query('SELECT * FROM trainings');
  return res.json(result.rows);
};

export const getTraining = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM trainings WHERE training_name = $1',
    [req.params.name]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'There is no training with name ' + req.params.name,
    });
  }

  return res.json(result.rows[0]);
};

export const createTraining = async (req, res, next) => {
  const { name, image, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO trainings (training_name,training_image, training_description) VALUES ($1, $2,$3) RETURNING *',
      [name, image, description]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        message:
          'There is a training with name ' +
          req.params.name +
          ', please select an other name ',
      });
    }
    next(error);
  }
};

export const updateTraining = async (req, res) => {
  const id = req.params.id;
  const { name, image, description } = req.body;

  const result = await pool.query(
    'UPDATE trainings SET training_name = $2, training_image = $3, training_description = $4 WHERE training_name = $1 RETURNING *',
    [id, name, image, description]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'Training does not exist with that name',
    });
  }

  return res.json(result.rows[0]);
};

export const deleteTraining = async (req, res) => {
  const result = await pool.query(
    'DELETE FROM trainings WHERE training_name = $1',
    [req.params.id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'Training does not exist with that name',
    });
  }

  return res.sendStatus(204);
};
