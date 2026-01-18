const Membre = require('../models/Membre');

const getAllMembres = async (req, res) => {
  try {
    const membres = await Membre.getAll();
    res.json(membres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMembreById = async (req, res) => {
  try {
    const { id } = req.params;
    const membre = await Membre.getById(Number(id));
    if (!membre) return res.status(404).json({ error: 'Membre non trouvé' });
    res.json(membre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createMembre = async (req, res) => {
  try {
    const { nom, email, groupe_id, role } = req.body;
    if (!nom || !groupe_id) {
      return res.status(400).json({ error: 'Nom et groupe_id sont requis' });
    }
    const membre = await Membre.create(nom, email, groupe_id, role);
    res.status(201).json(membre);
  } catch (err) {
    if (err.message.includes('ER_DUP_ENTRY')) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }
    res.status(500).json({ error: err.message });
  }
};

const updateMembre = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const membre = await Membre.update(Number(id), data);
    if (!membre) return res.status(404).json({ error: 'Membre non trouvé' });
    res.json(membre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMembre = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await Membre.delete(Number(id));
    if (!success) return res.status(404).json({ error: 'Membre non trouvé' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMembres,
  getMembreById,
  createMembre,
  updateMembre,
  deleteMembre
};