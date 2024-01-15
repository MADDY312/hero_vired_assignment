const pool = require('../database/db');
const Program = require('../models/Program');

const getPrograms = async (req, res) => {
  try {
    console.log("hello");
    const result = await pool.query('SELECT * FROM programs');
    const programs = result.rows.map(row => new Program(
      row.name,
      row.price,
      row.domain,
      row.type,
      row.registrations,
      row.description,
      row.placement_assurance,
      row.image_url,
      row.university_name,
      row.faculty_profile,
      row.learning_hours,
      row.certificate,
      row.eligibility_criteria
    ));
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getProgramById = async (req, res) => {
  const programId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM programs WHERE id = $1', [programId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Program not found' });
    }

    const row = result.rows[0];
    const program = new Program(
      row.name,
      row.price,
      row.domain,
      row.type,
      row.registrations,
      row.description,
      row.placement_assurance,
      row.image_url,
      row.university_name,
      row.faculty_profile,
      row.learning_hours,
      row.certificate,
      row.eligibility_criteria
    );

    res.json(program);
  } catch (error) {
    console.error('Error fetching program by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createProgram = async (req, res) => {
  const {
    name,
    price,
    domain,
    type,
    registrations,
    description,
    placementAssurance,
    imageUrl,
    universityName,
    facultyProfile,
    learningHours,
    certificate,
    eligibilityCriteria
  } = req.body;

  try {
    console.log("hiiii");
    const result = await pool.query(
      'INSERT INTO programs (name, price, domain, type, registrations, description, placement_assurance, image_url, university_name, faculty_profile, learning_hours, certificate, eligibility_criteria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [name, price, domain, type, registrations, description, placementAssurance, imageUrl, universityName, facultyProfile, learningHours, certificate, eligibilityCriteria]
    );

    const createdProgram = result.rows[0];
    const program = new Program(
      createdProgram.name,
      createdProgram.price,
      createdProgram.domain,
      createdProgram.type,
      createdProgram.registrations,
      createdProgram.description,
      createdProgram.placement_assurance,
      createdProgram.image_url,
      createdProgram.university_name,
      createdProgram.faculty_profile,
      createdProgram.learning_hours,
      createdProgram.certificate,
      createdProgram.eligibility_criteria
    );

    res.status(201).json(program);
  } catch (error) {
    if (error.code === '42P01') {
      // Table does not exist, create the table and try inserting again
      try {
        console.log("helllloo")
        await pool.query(
          'CREATE TABLE programs (id SERIAL PRIMARY KEY, name VARCHAR(255), price VARCHAR(255), domain VARCHAR(255), type VARCHAR(255), registrations VARCHAR(255), description TEXT, placement_assurance VARCHAR(255), image_url VARCHAR(255), university_name VARCHAR(255), faculty_profile TEXT, learning_hours VARCHAR(255), certificate VARCHAR(255), eligibility_criteria TEXT)'
        );
        console.log('Table created successfully.');
        // Retry the insert
        return createProgram(req, res);
      } catch (createError) {
        console.error('Error creating table:', createError);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      console.error('Error creating program:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


const updateProgram = async (req, res) => {
  const programId = req.params.id;

  const {
    name,
    price,
    domain,
    type,
    registrations,
    description,
    placementAssurance,
    imageUrl,
    universityName,
    facultyProfile,
    learningHours,
    certificate,
    eligibilityCriteria
  } = req.body;

  try {
    const result = await pool.query(
      'UPDATE programs SET name=$1, price=$2, domain=$3, type=$4, registrations=$5, description=$6, placement_assurance=$7, image_url=$8, university_name=$9, faculty_profile=$10, learning_hours=$11,certificate=$12, eligibility_criteria=$13 WHERE id=$14 RETURNING *',
      [name, price, domain, type, registrations, description, placementAssurance, imageUrl, universityName, facultyProfile, learningHours,  certificate, eligibilityCriteria, programId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Program not found' });
    }

    const updatedProgram = result.rows[0];
    const program = new Program(
      updatedProgram.name,
      updatedProgram.price,
      updatedProgram.domain,
      updatedProgram.type,
      updatedProgram.registrations,
      updatedProgram.description,
      updatedProgram.placement_assurance,
      updatedProgram.image_url,
      updatedProgram.university_name,
      updatedProgram.faculty_profile,
      updatedProgram.learning_hours,
      updatedProgram.certificate,
      updatedProgram.eligibility_criteria
    );

    res.json(program);
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteProgram = async (req, res) => {
  const programId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM programs WHERE id = $1 RETURNING *', [programId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Program not found' });
    }

    const deletedProgram = result.rows[0];
    const program = new Program(
      deletedProgram.name,
      deletedProgram.price,
      deletedProgram.domain,
      deletedProgram.type,
      deletedProgram.registrations,
      deletedProgram.description,
      deletedProgram.placement_assurance,
      deletedProgram.image_url,
      deletedProgram.university_name,
      deletedProgram.faculty_profile,
      deletedProgram.learning_hours,
      deletedProgram.certificate,
      deletedProgram.eligibility_criteria
    );

    res.json({ message: 'Program deleted successfully', deletedProgram: program });
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
};
