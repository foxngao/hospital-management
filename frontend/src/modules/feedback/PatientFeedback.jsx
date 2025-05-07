import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function PatientFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [noiDung, setNoiDung] = useState("");
  const token = localStorage.getItem("token");
  const maTK = localStorage.getItem("maTK");

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/feedback`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { maBN: maTK },
      });
      setFeedbacks(res.data);
    } catch (err) {
      toast.error("Không thể tải phản hồi");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noiDung.trim().length < 10) {
      toast.error("Nội dung phản hồi phải từ 10 ký tự");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/feedback`,
        { noiDung },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Gửi phản hồi thành công");
      setNoiDung("");
      fetchFeedbacks();
    } catch (err) {
      toast.error("Lỗi khi gửi phản hồi");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Gửi phản hồi</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <textarea
          value={noiDung}
          onChange={(e) => setNoiDung(e.target.value)}
          placeholder="Nhập nội dung phản hồi..."
          className="border w-full p-3 rounded"
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Gửi
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Lịch sử phản hồi</h3>
      <ul className="space-y-3">
        {feedbacks.map((fb) => (
          <li key={fb.maPH} className="border p-3 rounded shadow">
            📝 {fb.noiDung} <br />
            📌 Trạng thái: {fb.trangThai}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientFeedback;
