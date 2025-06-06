package com.example.frontendapp.data.remote

import com.example.frontendapp.data.model.auth.AuthResponse
import com.example.frontendapp.data.model.auth.ForgotPasswordRequest
import com.example.frontendapp.data.model.auth.LoginRequest
import com.example.frontendapp.data.model.auth.RegisterRequest
import com.example.frontendapp.data.model.auth.ResetPasswordRequest
import com.example.frontendapp.data.model.auth.User
import retrofit2.Response
import retrofit2.http.*

interface AuthApiService {

    @POST("auth/login")
    suspend fun login(@Body credentials: LoginRequest): Response<AuthResponse>

    @POST("auth/register")
    suspend fun register(@Body req: RegisterRequest): Response<AuthResponse>

    @POST("auth/quenmatkhau")
    suspend fun forgotPassword(@Body data: ForgotPasswordRequest): Response<Map<String, String>>

    @POST("auth/doi-mat-khau")
    suspend fun resetPassword(@Body data: ResetPasswordRequest): Response<AuthResponse>

    @GET("auth/ma-xac-thuc/{id}")
    suspend fun getVerifyCode(@Path("id") maTaiKhoan: String): Response<Map<String, String>>

    @GET("auth/me")
    suspend fun getCurrentUser(): Response<User>

}
