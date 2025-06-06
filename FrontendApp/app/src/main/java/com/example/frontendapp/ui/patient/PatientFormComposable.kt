package com.example.frontendapp.ui.patient

import androidx.compose.runtime.*
import androidx.compose.material.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun PatientForm(
    hoTen: String,
    onHoTenChange: (String) -> Unit,
    ngaySinh: String,
    onNgaySinhChange: (String) -> Unit,
    gioiTinh: String,
    onGioiTinhChange: (String) -> Unit,
    soDienThoai: String,
    onSoDienThoaiChange: (String) -> Unit,
    diaChi: String,
    onDiaChiChange: (String) -> Unit,
    bhyt: String,
    onbhytChange: (String) -> Unit
) {
    OutlinedTextField(value = hoTen, onValueChange = onHoTenChange, label = { Text("Họ tên") })
    OutlinedTextField(value = ngaySinh, onValueChange = onNgaySinhChange, label = { Text("Ngày sinh") })
    OutlinedTextField(value = gioiTinh, onValueChange = onGioiTinhChange, label = { Text("Giới tính") })
    OutlinedTextField(value = soDienThoai, onValueChange = onSoDienThoaiChange, label = { Text("SĐT") })
    OutlinedTextField(value = diaChi, onValueChange = onDiaChiChange, label = { Text("Địa chỉ") })
    OutlinedTextField(value = bhyt, onValueChange = onbhytChange, label = { Text(text =  "Bao hiem y te") })
}