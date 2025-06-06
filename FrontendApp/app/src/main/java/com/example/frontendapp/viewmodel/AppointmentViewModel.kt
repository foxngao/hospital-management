package com.example.frontendapp.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.frontendapp.data.model.Appointment
import com.example.frontendapp.data.remote.RetrofitApp
import kotlinx.coroutines.launch
import androidx.compose.runtime.mutableStateOf

class AppointmentViewModel : ViewModel() {
    val appointments = mutableStateOf<List<Appointment>>(emptyList())
    val selectedAppointment = mutableStateOf<Appointment?>(null)
    var message = mutableStateOf("")

    fun getAllAppointments() {
        viewModelScope.launch {
            val response = RetrofitApp.appointmentApi.getAllAppointments()
            if (response.isSuccessful) {
                appointments.value = response.body()?.data ?: emptyList()
            } else {
                message.value = "Lỗi khi tải lịch hẹn"
            }
        }
    }

    fun getAppointmentById(id: String) {
        viewModelScope.launch {
            val response = RetrofitApp.appointmentApi.getAppointmentById(id)
            if (response.isSuccessful) {
                selectedAppointment.value = response.body()?.data
            } else {
                message.value = "Không tìm thấy lịch hẹn"
            }
        }
    }

    fun createAppointment(appointment: Appointment, onDone: () -> Unit) {
        viewModelScope.launch {
            try {
                val res = RetrofitApp.appointmentApi.createAppointment(appointment)
                if (res.isSuccessful && res.body()?.data != null) {
                    message.value = res.body()?.message ?: "✅ Đặt lịch thành công"
                    onDone()
                } else {
                    val errorMsg = res.errorBody()?.string()
                    message.value = errorMsg ?: "❌ Đặt lịch thất bại"
                }
            } catch (e: Exception) {
                message.value = "❌ Lỗi tạo lịch hẹn: ${e.message}"
            }
        }
    }



    fun getAppointmentsByMaBN(maBN: String) {
        viewModelScope.launch {
            try {
                val res = RetrofitApp.appointmentApi.getByMaBN(maBN)
                if (res.isSuccessful && res.body()?.data != null) {
                    appointments.value = res.body()!!.data
                } else {
                    message.value = "❌ Không có dữ liệu lịch hẹn"
                }
            } catch (e: Exception) {
                message.value = "❌ Lỗi tải danh sách lịch"
            }
        }
    }


    fun updateAppointment(id: String, appointment: Appointment, onResult: (Boolean) -> Unit) {
        viewModelScope.launch {
            val response = RetrofitApp.appointmentApi.updateAppointment(id, appointment)
            onResult(response.isSuccessful)
        }
    }

    fun deleteAppointment(maLich: String, onDone: () -> Unit) {
        viewModelScope.launch {
            try {
                val res = RetrofitApp.appointmentApi.deleteAppointment(maLich)
                if (res.isSuccessful) {
                    message.value = "✅ Huỷ lịch thành công"
                    onDone()
                } else {
                    message.value = "❌ Huỷ lịch thất bại"
                }
            } catch (e: Exception) {
                message.value = "❌ Lỗi huỷ lịch"
            }
        }
    }
}