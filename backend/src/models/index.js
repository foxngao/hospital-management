const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const fs = require("fs");
const path = require("path");

// Load toàn bộ model *.js (trừ index.js)
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.endsWith(".js") &&
      file !== "index.js" &&
      !file.startsWith(".")
  )
  .forEach((file) => {
    const defineModel = require(path.join(__dirname, file));
    const model = defineModel(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Gọi associate nếu có
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
