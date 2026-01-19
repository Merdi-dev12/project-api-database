const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Tester la connexion AU DÉMARRAGE
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connexion à MySQL (XAMPP) : RÉUSSIE");
    connection.release();
  } catch (err) {
    console.error("ERREUR FATALE : Impossible de se connecter à MySQL");
    console.error("Vérifiez :");
    console.error("- XAMPP : MySQL démarré (icône verte) ?");
    console.error("- .env : DB_HOST, DB_USER, DB_PASSWORD, DB_NAME corrects ?");
    console.error("- phpMyAdmin accessible sur http://localhost/phpmyadmin ?");
    console.error("Détails :", err.message);
    process.exit(1);
  }
})();

module.exports = pool;
