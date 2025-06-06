package com.example.frontendapp.data.remote

import com.example.frontendapp.data.model.*
import com.example.frontendapp.data.model.test.LoaiXetNghiem
import com.example.frontendapp.data.model.test.PhieuXetNghiem
import com.example.frontendapp.data.model.test.XetNghiem
import com.example.frontendapp.data.model.test.YeuCauXetNghiem
import retrofit2.Response
import retrofit2.http.*

interface XetNghiemApiService {

    @GET("xetnghiem")
    suspend fun getAllXetNghiem(): Response<ApiResponse<List<XetNghiem>>>

    @GET("yeucauxetnghiem/{id}")
    suspend fun getYeuCauById(@Path("id") maYeuCau: String): Response<ApiResponse<YeuCauXetNghiem>>

    // ✅ API dành cho bệnh nhân: lấy phiếu theo mã bệnh nhân
    @GET("phieuxetnghiem/byMaHSBA/{maHSBA}")
    suspend fun getPhieuByMaHSBA(
        @Path("maHSBA") maHSBA: String
    ): Response<ApiResponse<List<PhieuXetNghiem>>>

    // ✅ API dành cho bệnh nhân: đặt lịch xét nghiệm
    @POST("phieuxetnghiem/from-patient")
    suspend fun createPhieuFromPatient(
        @Body body: PhieuXetNghiem
    ): Response<ApiResponse<PhieuXetNghiem>>

    // ❌ Không dùng trong app bệnh nhân – chỉ dùng nếu cho phép huỷ phiếu
    @DELETE("phieuxetnghiem/{id}")
    suspend fun deletePhieu(
        @Path("id") maPhieu: String
    ): Response<ApiResponse<String>>

    // ✅ API lấy danh sách loại xét nghiệm
    @GET("loaixetnghiem")
    suspend fun getAllLoaiXN(): Response<ApiResponse<List<LoaiXetNghiem>>>

    @PUT("yeucauxetnghiem/capnhat-trangthai")
    suspend fun updateTrangThai(
        @Body body: Map<String, String>
    ): Response<ApiResponse<String>>

}
