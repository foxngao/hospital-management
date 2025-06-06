    package com.example.frontendapp.data.remote

    import com.example.frontendapp.data.model.Appointment
    import com.example.frontendapp.data.model.ApiResponse
    import retrofit2.Response
    import retrofit2.http.*

    interface AppointmentApiService {

        @GET("lichkham")
        suspend fun getAllAppointments(): Response<ApiResponse<List<Appointment>>>

        @GET("lichkham/{id}")
        suspend fun getAppointmentById(@Path("id") id: String): Response<ApiResponse<Appointment>>

        @POST("lichkham")
        suspend fun createAppointment(@Body appointment: Appointment): Response<ApiResponse<Appointment>>

        @PUT("lichkham/{id}")
        suspend fun updateAppointment(@Path("id") id: String, @Body appointment: Appointment): Response<ApiResponse<Appointment>>

        @DELETE("lichkham/{id}")
        suspend fun deleteAppointment(@Path("id") id: String): Response<ApiResponse<String>>

        @GET("lichkham/benhnhan/{maBN}")
        suspend fun getByMaBN(@Path("maBN") maBN: String): Response<ApiResponse<List<Appointment>>>


    }
