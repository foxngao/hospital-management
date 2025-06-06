package com.example.frontendapp.data.remote

import com.example.frontendapp.data.model.Patient
import com.example.frontendapp.data.model.ApiResponse
import retrofit2.Response
import retrofit2.http.*

interface PatientApiService {
    @POST("benhnhan")
    suspend fun createPatient(@Body patient: Patient): Response<ApiResponse<Patient>>

    @GET("benhnhan/{id}")
    suspend fun getPatient(@Path("id") id: String): Response<ApiResponse<Patient>>

    @PUT("benhnhan/{id}")
    suspend fun updatePatient(
        @Path("id") id: String,
        @Body patient: Patient
    ): Response<ApiResponse<Patient>>

    @GET("benhnhan/maBN/{maBN}")
    suspend fun getPatientByMaBN(@Path("maBN") maBN: String): Response<ApiResponse<Patient>>

}
