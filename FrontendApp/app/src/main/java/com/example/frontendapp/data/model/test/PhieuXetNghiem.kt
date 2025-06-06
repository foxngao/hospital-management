package com.example.frontendapp.data.model.test

data class PhieuXetNghiem(
    val maPhieuXN: String? = null,
    val maYeuCau: String? = null,
    val maXN: String,
    val maNS: String?,
    val maHSBA: String?,
    val ngayThucHien: String,
    val ketQua: String? = null,
    val ghiChu: String? = null,
    val gioThucHien: String,

    // ✅ Optional join relationships (for display)
    val xetNghiem: XetNghiem? = null,
    val nhanSuYTe: Any? = null,
    val hoSoBenhAn: Any? = null,
    val yeuCauXetNghiem: YeuCauXetNghiem? = null
)
