const db = require('../db/database');

class Membre {
  constructor(id, nom, email, groupe_id, role) {
    this.id = id;
    this.nom = nom;
    this.email = email;
    this.groupe_id = groupe_id;
    this.role = role;
  }

  static async getAll() {
    const [rows] = await db.execute(`
      SELECT m.*, g.nom AS groupe_nom
      FROM membres m
      LEFT JOIN groupes g ON m.groupe_id = g.id
    `);
    return rows.map(r => new Membre(r.id, r.nom, r.email, r.groupe_id, r.role));
  }

  static async getByGroupe(groupeId) {
    const [rows] = await db.execute(
      'SELECT * FROM membres WHERE groupe_id = ?',
      [groupeId]
    );
    return rows.map(r => new Membre(r.id, r.nom, r.email, r.groupe_id, r.role));
  }

  static async create(nom, email, groupe_id, role = 'Membre actif') {
    const [result] = await db.execute(
      'INSERT INTO membres (nom, email, groupe_id, role) VALUES (?, ?, ?, ?)',
      [nom, email, groupe_id, role]
    );
    return new Membre(result.insertId, nom, email, groupe_id, role);
  }

  static async update(id, data) {
    const { nom, email, groupe_id, role } = data;
    await db.execute(
      'UPDATE membres SET nom = ?, email = ?, groupe_id = ?, role = ? WHERE id = ?',
      [nom, email, groupe_id, role, id]
    );
    const [rows] = await db.execute('SELECT * FROM membres WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    const r = rows[0];
    return new Membre(r.id, r.nom, r.email, r.groupe_id, r.role);
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM membres WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getById(id) {
  const [rows] = await db.execute('SELECT * FROM membres WHERE id = ?', [id]);
  if (rows.length === 0) return null;
  const r = rows[0];
  return new Membre(r.id, r.nom, r.email, r.groupe_id, r.role);
  }
}

module.exports = Membre;