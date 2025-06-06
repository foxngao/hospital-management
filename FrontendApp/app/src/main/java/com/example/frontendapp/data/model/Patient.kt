package com.example.frontendapp.data.model

data class Patient(
    val maBN: String? = null,
    val hoTen: String,
    val ngaySinh: String,
    val gioiTinh: String,
    val soDienThoai: String,
    val diaChi: String,
    val maTK: String,
    val bhyt: String? = null
)