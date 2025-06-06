package com.example.frontendapp.data.model.auth

data class RegisterRequest(
    val maTK: String? = null,
    val email: String,
    val tenDangNhap: String,
    val matKhau: String,
    val xacNhanMatKhau: String,
    val maNhom: String = "BENHNHAN"   // 👈 BẮT BUỘC PHẢI CÓ
)