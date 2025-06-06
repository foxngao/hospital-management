package com.example.frontendapp.data.model.test

data class YeuCauXetNghiem(
    val maYeuCau: String,
    val maBN: String,
    val maBS: String?,
    val loaiYeuCau: String = "THONG_THUONG",
    val ngayYeuCau: String,
    var trangThai: String = "CHO_THUC_HIEN"
)
