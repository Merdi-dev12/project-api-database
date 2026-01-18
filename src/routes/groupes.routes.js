const express = require('express');
const router = express.Router();
const {
  getAllGroupes,
  getGroupeWithDetails,
  createGroupe,
  updateGroupe,
  deleteGroupe
} = require('../controllers/groupeController');

router.get('/', getAllGroupes);
router.get('/:id', getGroupeWithDetails);
router.post('/', createGroupe);
router.put('/:id', updateGroupe);
router.delete('/:id', deleteGroupe);

module.exports = router;