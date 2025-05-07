module.exports = (sequelize, DataTypes) => {
  const LichLamViec = sequelize.define("LichLamViec", {
    maLichLV: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maNS: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    maCa: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    ngayLamViec: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'LichLamViec',
    timestamps: false,
});

  LichLamViec.associate = (models) => {
    LichLamViec.belongsTo(models.NhanSuYTe, { foreignKey: 'maNS' });
    LichLamViec.belongsTo(models.CaKham, { foreignKey: 'maCa' });
  };

  return LichLamViec;
};