module.exports = (sequelize, DataTypes) => {
  const GioHang = sequelize.define("GioHang", {
    maGH: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    maBN: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    ngayTao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    trangThai: {
        type: DataTypes.STRING(20),
        defaultValue: 'CHO_THANH_TOAN',
    },
}, {
    tableName: 'GioHang',
    timestamps: false,
});

  GioHang.associate = (models) => {
    GioHang.belongsTo(models.BenhNhan, { foreignKey: 'maBN' });
  };

  return GioHang;
};