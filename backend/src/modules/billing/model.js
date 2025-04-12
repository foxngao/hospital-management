const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const HoaDon = require('../../models/HoaDon');

const Billing = HoaDon;

module.exports = Billing;