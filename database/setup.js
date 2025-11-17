require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const dbFile = process.env.NODE_ENV === 'production'
  ? process.env.PROD_DB_STORAGE
  : process.env.DEV_DB_STORAGE;

const db = new Sequelize({
  dialect: process.env.DB_DIALECT,
  storage: dbFile,
  logging: false
});

// Track model
const Track = db.define('Track', {
  trackId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  songTitle: { type: DataTypes.STRING, allowNull: false },
  artistName: { type: DataTypes.STRING, allowNull: false },
  albumName: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER },
  releaseYear: { type: DataTypes.INTEGER }
});

// Only sync tables (optional)
async function initDatabase() {
  await db.authenticate();
  await db.sync();
  console.log('Database ready');
}

// Do NOT close db here
// db.close();

module.exports = { db, Track, initDatabase };

