const express = require('express');
const router = express.Router();
const { getAllGroupes, getGroupeWithDetails } = require('../controllers/groupeController');

router.get('/', getAllGroupes);
router.get('/:id', getGroupeWithDetails);
// POST, PUT, DELETE...

module.exports = router;