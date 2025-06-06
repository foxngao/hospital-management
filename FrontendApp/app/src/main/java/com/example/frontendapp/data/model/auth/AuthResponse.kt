package com.example.frontendapp.data.model.auth

data class AuthResponse(
    val success: Boolean,
    val message: String,
    val token: String? = null,
    val user: User?,

)
