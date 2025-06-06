package com.example.frontendapp.ui.patient

import androidx.compose.runtime.Composable
import androidx.compose.material.*
import com.example.frontendapp.data.model.Patient

@Composable
fun PatientInfo(patient: Patient?) {
    if (patient != null) {
        Text("Mã: ${patient.maBN}")
        Text("Họ tên: ${patient.hoTen}")
        Text("Ngày sinh: ${patient.ngaySinh}")
        Text("Giới tính: ${patient.gioiTinh}")
        Text("SĐT: ${patient.soDienThoai}")
        Text("Địa chỉ: ${patient.diaChi}")
        Text("Bao hiem y te: ${patient.bhyt}")
    } else {
        Text("Không có thông tin.")
    }
}