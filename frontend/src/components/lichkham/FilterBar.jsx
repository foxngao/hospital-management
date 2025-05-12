import React from "react";

const FilterBar = ({ filter, bacSiList, onChange }) => {
  return (
    <div className="bg-white shadow p-4 rounded grid grid-cols-2 md:grid-cols-4 gap-4">
      <input
        name="tuNgay"
        type="date"
        value={filter.tuNgay}
        onChange={onChange}
        className="input"
      />
      <input
        name="denNgay"
        type="date"
        value={filter.denNgay}
        onChange={onChange}
        className="input"
      />
      <select
        name="maBS"
        value={filter.maBS}
        onChange={onChange}
        className="input"
      >
        <option value="">-- Tất cả bác sĩ --</option>
        {bacSiList.map((bs) => (
          <option key={bs.maBS} value={bs.maBS}>
            {bs.hoTen}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
