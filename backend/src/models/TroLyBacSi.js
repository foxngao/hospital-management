const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const NhanSuYTe = require('./NhanSuYTe');
const BacSi = require('./BacSi');

const TroLyBacSi = sequelize.define('TroLyBacSi', {
    maTroLy: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maNS: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: NhanSuYTe,
            key: 'maNS',
        },
    },
    maBacSi: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: BacSi,
            key: 'maBS',
        },
    },
    phamViUyQuyen: {
        type: DataTypes.STRING(255),
    },
}, {
    tableName: 'TroLyBacSi',
    timestamps: false,
});

TroLyBacSi.belongsTo(NhanSuYTe, { foreignKey: 'maNS' });
TroLyBacSi.belongsTo(BacSi, { foreignKey: 'maBacSi' });

module.exports = TroLyBacSi;