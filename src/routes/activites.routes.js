const express = require('express');
const router = express.Router();
const {
  getAllActivites,
  getActiviteWithParticipants,
  createActivite,
  deleteActivite,
  addParticipant,
  markPresent
} = require('../controllers/activiteController');

router.get('/', getAllActivites);
router.get('/:id/participants', getActiviteWithParticipants);
router.post('/', createActivite);
router.delete('/:id', deleteActivite);
router.post('/participations', addParticipant);
router.patch('/participations/:id/present', markPresent);

module.exports = router;