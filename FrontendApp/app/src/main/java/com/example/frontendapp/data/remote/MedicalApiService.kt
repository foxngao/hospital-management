package com.example.frontendapp.data.remote

import com.example.frontendapp.data.model.*
import com.example.frontendapp.data.model.test.PhieuXetNghiem
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface MedicalApiService {


    @GET("hsba/hsbabyMaBN/{maHSBA}")  // ✅ đúng với backend
    suspend fun getMedicalRecord(@Path("maHSBA") maHSBA: String): Response<ApiResponse<MedicalRecord>>

    @POST("hsba/benhnhancreate")
    suspend fun createHoSo(@Body hoso: Map<String, String>): Response<ApiResponse<MedicalRecord>>

    // ✅ API lọc theo tháng-năm cho phiếu khám
    @GET("phieukham/by-month/{dotKhamBenh}")
    suspend fun getPhieuKhamByMonth(@Path("dotKhamBenh") dot: String): Response<List<PhieuKham>>

    // ✅ API lọc theo tháng-năm cho đơn thuốc
    @GET("donthuoc/by-month/{dotKhamBenh}")
    suspend fun getDonThuocByMonth(@Path("dotKhamBenh") dot: String): Response<List<DonThuoc>>

    // ✅ API lọc theo tháng-năm cho phiếu xét nghiệm
    @GET("phieuxetnghiem/by-month/{dotKhamBenh}")
    suspend fun getPhieuXetNghiemByMonth(@Path("dotKhamBenh") dot: String): Response<List<PhieuXetNghiem>>
}