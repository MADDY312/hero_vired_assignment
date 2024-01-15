const express = require('express');
const programController = require('../controllers/programController');
const authenticate = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.get('/getallprograms', authenticate,programController.getPrograms);
router.get('/getprogrambyid/:id', authenticate, programController.getProgramById);
router.post('/save', authenticate, programController.createProgram);
router.post('/updateprogram/:id', authenticate, programController.updateProgram);
router.get('/deleteprogram/:id', authenticate, programController.deleteProgram);

module.exports = router;
