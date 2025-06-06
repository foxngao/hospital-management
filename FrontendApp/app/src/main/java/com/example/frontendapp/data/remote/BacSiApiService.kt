package com.example.frontendapp.data.remote

import com.example.frontendapp.data.model.ApiResponse
import retrofit2.Response
import retrofit2.http.GET
import com.example.frontendapp.data.model.BacSi
import retrofit2.http.Path

interface BacSiApiService {
    @GET("bacsi")
    suspend fun getAll(): Response<ApiResponse<List<BacSi>>>

    @GET("bacsi/khoa/{maKhoa}")
    suspend fun getByKhoa(@Path("maKhoa") maKhoa: String): Response<ApiResponse<List<BacSi>>>


}
