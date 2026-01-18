const db = require('../db/database');

class Groupe {
  constructor(id, nom, description) {
    this.id = id;
    this.nom = nom;
    this.description = description;
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM groupes');
    return rows.map(row => new Groupe(row.id, row.nom, row.description));
  }

  static async getById(id) {
    const [rows] = await db.execute('SELECT * FROM groupes WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    const r = rows[0];
    return new Groupe(r.id, r.nom, r.description);
  }

  static async create(nom, description) {
    const [result] = await db.execute(
      'INSERT INTO groupes (nom, description) VALUES (?, ?)',
      [nom, description]
    );
    return new Groupe(result.insertId, nom, description);
  }

  static async update(id, nom, description) {
    await db.execute(
      'UPDATE groupes SET nom = ?, description = ? WHERE id = ?',
      [nom, description, id]
    );
    return this.getById(id);
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM groupes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Groupe;