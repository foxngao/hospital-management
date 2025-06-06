package com.example.frontendapp.viewmodel

import android.app.Application
import android.content.Context
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.frontendapp.data.model.Patient
import com.example.frontendapp.data.model.MedicalRecord
import com.example.frontendapp.data.remote.RetrofitApp
import kotlinx.coroutines.launch
import androidx.compose.runtime.mutableStateOf
import java.text.SimpleDateFormat
import java.util.*

class PatientViewModel(application: Application) : AndroidViewModel(application) {
    var patient = mutableStateOf<Patient?>(null)
    var message = mutableStateOf("initial")

    fun loadCurrentPatient() {
        val maTK = RetrofitApp.currentUserId
        if (maTK != null) getPatientById(maTK)
    }

    fun getPatientById(id: String) {
        viewModelScope.launch {
            try {
                val res = RetrofitApp.api.getPatient(id)
                if (res.isSuccessful && res.body()?.data != null) {
                    patient.value = res.body()?.data
                    message.value = ""

                    // ✅ Ghi hoTen vào SharedPreferences
                    val prefs = getApplication<Application>().getSharedPreferences("app", Context.MODE_PRIVATE)
                    prefs.edit().putString("hoTen", res.body()?.data?.hoTen ?: "Bệnh nhân").apply()
                } else {
                    message.value = "⚠️ Không tìm thấy dữ liệu: ${res.code()}"
                }
            } catch (e: Exception) {
                Log.e("API Error", "❌ ${e.message}")
                message.value = "❌ Lỗi kết nối hoặc định dạng JSON"
            }
        }
    }

    fun createPatient(patient: Patient, onResult: (String?) -> Unit) {
        viewModelScope.launch {
            try {
                val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
                val formattedNgaySinh = try {
                    sdf.format(sdf.parse(patient.ngaySinh)!!)
                } catch (e: Exception) {
                    ""
                }

                val safePatient = patient.copy(ngaySinh = formattedNgaySinh)
                val response = RetrofitApp.api.createPatient(safePatient)

                if (response.isSuccessful) {
                    val apiRes = response.body()
                    if (apiRes != null && apiRes.success && apiRes.data != null) {
                        val createdMaBN = apiRes.data.maBN ?: ""
                        getPatientById(patient.maTK)

                        createHSBA(createdMaBN)
                        onResult(createdMaBN)
                    } else {
                        message.value = "❌ Phản hồi không hợp lệ"
                        onResult(null)
                    }
                } else {
                    message.value = "❌ Lỗi server: ${response.code()}"
                    onResult(null)
                }
            } catch (e: Exception) {
                Log.e("CREATE API", "❌ ${e.message}")
                message.value = "❌ Kết nối thất bại"
                onResult(null)
            }
        }
    }

    fun updatePatient(id: String, newInfo: Patient, onDone: () -> Unit) {
        viewModelScope.launch {
            try {
                val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
                val formattedDate = try {
                    sdf.format(sdf.parse(newInfo.ngaySinh)!!)
                } catch (e: Exception) {
                    ""
                }

                val safeInfo = newInfo.copy(ngaySinh = formattedDate)
                val response = RetrofitApp.api.updatePatient(id, safeInfo)
                if (response.isSuccessful) {
                    message.value = "✅ Cập nhật thành công"
                    getPatientById(newInfo.maTK)
                    onDone()
                } else {
                    message.value = "❌ Lỗi cập nhật: ${response.code()}"
                }
            } catch (e: Exception) {
                Log.e("UPDATE", "❌ ${e.message}")
                message.value = "❌ Lỗi kết nối khi cập nhật"
            }
        }
    }

    fun getPatientByMaBN(maBN: String) {
        viewModelScope.launch {
            try {
                val res = RetrofitApp.api.getPatientByMaBN(maBN)
                if (res.isSuccessful && res.body()?.data != null) {
                    patient.value = res.body()?.data
                } else {
                    message.value = "Không tìm thấy bệnh nhân với mã BN"
                }
            } catch (e: Exception) {
                message.value = "Lỗi tải thông tin bệnh nhân"
            }
        }
    }

    private fun createHSBA(maBN: String) {
        viewModelScope.launch {
            try {
                val today = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
                val dot = SimpleDateFormat("yyyy-MM", Locale.getDefault()).format(Date())
                val hsba = MedicalRecord(
                    maHSBA = maBN,
                    maBN = maBN,
                    ngayLap = today,
                    dotKhamBenh = dot,
                    lichSuBenh = null,
                    ghiChu = null
                )
                val res = RetrofitApp.medicalApi.createHoSo(hsba.toMap())
                if (!res.isSuccessful) {
                    Log.e("HSBA", "❌ Không tạo được HSBA: ${res.errorBody()?.string()}")
                }
            } catch (e: Exception) {
                Log.e("HSBA", "❌ Lỗi tạo HSBA: ${e.message}")
            }
        }
    }

    private fun Patient.toMap(): Map<String, String> = mapOf(
        "maBN" to (maBN ?: ""),
        "maTK" to (maTK ?: ""),
        "hoTen" to (hoTen ?: ""),
        "gioiTinh" to (gioiTinh ?: ""),
        "ngaySinh" to (ngaySinh ?: ""),
        "diaChi" to (diaChi ?: ""),
        "soDienThoai" to (soDienThoai ?: ""),
        "bhyt" to (bhyt ?: "")
    )

    private fun MedicalRecord.toMap(): Map<String, String> = mapOf(
        "maHSBA" to (maHSBA ?: ""),
        "maBN" to (maBN ?: ""),
        "ngayLap" to (ngayLap ?: ""),
        "dotKhamBenh" to (dotKhamBenh ?: ""),
        "lichSuBenh" to (lichSuBenh ?: ""),
        "ghiChu" to (ghiChu ?: "")
    )
}
