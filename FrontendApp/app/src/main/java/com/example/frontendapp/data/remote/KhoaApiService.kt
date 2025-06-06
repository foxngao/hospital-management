package com.example.frontendapp.data.remote

import com.example.frontendapp.data.model.ApiResponse
import retrofit2.Response
import retrofit2.http.GET
import com.example.frontendapp.data.model.Khoa

interface KhoaApiService {
    @GET("khoa")
    suspend fun getAll(): Response<ApiResponse<List<Khoa>>>
}
