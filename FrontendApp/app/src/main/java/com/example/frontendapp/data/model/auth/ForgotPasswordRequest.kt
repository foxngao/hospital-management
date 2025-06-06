
package com.example.frontendapp.data.model.auth

data class ForgotPasswordRequest(
    val maTK: String,
    val maBenhNhan: String,
    val email: String
)
