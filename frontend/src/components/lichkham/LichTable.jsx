import React from "react";

const LichTable = ({
  data,
  editForm,
  onEditStart,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onDelete
}) => {
  return (
    <table className="min-w-full text-sm bg-white shadow border">
      <thead className="bg-blue-50">
        <tr>
          <th>Mã</th>
          <th>Bệnh nhân</th>
          <th>Bác sĩ</th>
          <th>Ngày</th>
          <th>Giờ</th>
          <th>Phòng</th>
          <th>Ghi chú</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.maLich} className="border-t">
            <td>{item.maLich}</td>
            <td>{item.BenhNhan?.hoTen}</td>
            <td>{item.BacSi?.hoTen}</td>
            <td>
              {editForm.maLich === item.maLich ? (
                <input
                  type="date"
                  name="ngayKham"
                  value={editForm.ngayKham}
                  onChange={onEditChange}
                  className="input"
                />
              ) : (
                item.ngayKham
              )}
            </td>
            <td>
              {editForm.maLich === item.maLich ? (
                <input
                  type="time"
                  name="gioKham"
                  value={editForm.gioKham}
                  onChange={onEditChange}
                  className="input"
                />
              ) : (
                item.gioKham
              )}
            </td>
            <td>
              {editForm.maLich === item.maLich ? (
                <input
                  type="text"
                  name="phong"
                  value={editForm.phong}
                  onChange={onEditChange}
                  className="input"
                />
              ) : (
                item.phong
              )}
            </td>
            <td>
              {editForm.maLich === item.maLich ? (
                <textarea
                  name="ghiChu"
                  value={editForm.ghiChu}
                  onChange={onEditChange}
                  className="input"
                />
              ) : (
                item.ghiChu
              )}
            </td>
            <td>
              {editForm.maLich === item.maLich ? (
                <div className="space-x-1">
                  <button onClick={onSaveEdit} className="text-green-600">💾</button>
                  <button onClick={onCancelEdit} className="text-gray-600">✖</button>
                </div>
              ) : (
                <div className="space-x-1">
                  <button onClick={() => onEditStart(item)} className="text-blue-600">Sửa</button>
                  <button onClick={() => onDelete(item.maLich)} className="text-red-600">Xoá</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LichTable;
