module.exports = (sequelize, DataTypes) => {
  const KhoaPhong = sequelize.define("KhoaPhong", {
    maKhoa: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    tenKhoa: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    moTa: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'KhoaPhong',
    timestamps: false,
});

  KhoaPhong.associate = (models) => {
    // No associations
  };

  return KhoaPhong;
};