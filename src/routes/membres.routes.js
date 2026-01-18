const express = require('express');
const router = express.Router();
const {
  getAllMembres,
  getMembreById,
  createMembre,
  updateMembre,
  deleteMembre
} = require('../controllers/membreController');

router.get('/', getAllMembres);
router.get('/:id', getMembreById);
router.post('/', createMembre);
router.put('/:id', updateMembre);
router.delete('/:id', deleteMembre);

module.exports = router;