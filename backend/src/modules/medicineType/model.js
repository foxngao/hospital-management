const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database"); // Import sequelize instance
const db = require("../../models");
const NhomThuoc = db.NhomThuoc;
module.exports = NhomThuoc;
