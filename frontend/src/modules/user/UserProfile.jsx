import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      toast.error("Không thể tải thông tin cá nhân");
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/user/me`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Cập nhật thành công");
      setEditMode(false);
    } catch (err) {
      toast.error("Không thể cập nhật thông tin");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <div>Đang tải...</div>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Hồ sơ cá nhân</h2>
      <div className="space-y-4">
        <div>
          <label>Họ tên:</label>
          <input
            type="text"
            value={user.hoTen || ""}
            onChange={(e) => setUser({ ...user, hoTen: e.target.value })}
            disabled={!editMode}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            disabled={!editMode}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Số điện thoại:</label>
          <input
            type="text"
            value={user.soDienThoai || ""}
            onChange={(e) => setUser({ ...user, soDienThoai: e.target.value })}
            disabled={!editMode}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Địa chỉ:</label>
          <input
            type="text"
            value={user.diaChi || ""}
            onChange={(e) => setUser({ ...user, diaChi: e.target.value })}
            disabled={!editMode}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            {editMode ? "Huỷ" : "Chỉnh sửa"}
          </button>
          {editMode && (
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Lưu thay đổi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
