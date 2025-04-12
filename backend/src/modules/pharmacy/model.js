const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Thuoc = require('../../models/Thuoc');

const Pharmacy = Thuoc;

module.exports = Pharmacy;