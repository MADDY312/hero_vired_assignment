const express = require('express');
const programController = require('../controllers/programController');
const authenticate = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.get('/getallprograms',programController.getPrograms);
router.get('/getprogrambyid/:id', programController.getProgramById);
router.post('/save',authenticate, programController.createProgram);
router.put('/updateprogram/:id', authenticate,programController.updateProgram);
router.get('/deleteprogram/:id',authenticate, programController.deleteProgram);

module.exports = router;
