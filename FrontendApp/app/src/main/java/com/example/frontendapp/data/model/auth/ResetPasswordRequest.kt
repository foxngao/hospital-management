package com.example.frontendapp.data.model.auth

data class ResetPasswordRequest(
    val maTK: String,
    val matKhauCu: String = "", // optional
    val matKhauMoi: String
)