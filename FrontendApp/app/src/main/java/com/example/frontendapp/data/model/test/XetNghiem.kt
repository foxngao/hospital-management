package com.example.frontendapp.data.model.test

data class XetNghiem(
    val maXN: String,
    val maLoaiXN: String,
    val tenXN: String,
    val chiPhi: Double,
    val thoiGianTraKetQua: String?,
    val loaiXetNghiem: LoaiXetNghiem? = null   // from belongsTo
)
