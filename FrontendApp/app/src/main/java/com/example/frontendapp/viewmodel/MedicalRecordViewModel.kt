package com.example.frontendapp.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.frontendapp.data.model.MedicalRecord
import com.example.frontendapp.data.remote.RetrofitApp
import kotlinx.coroutines.launch
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.State
import com.example.frontendapp.data.model.DonThuoc
import com.example.frontendapp.data.model.PhieuKham
import com.example.frontendapp.data.model.test.PhieuXetNghiem

class MedicalRecordViewModel : ViewModel() {
    private val api = RetrofitApp.medicalApi

    private val _medicalRecord = mutableStateOf<MedicalRecord?>(null)
    val medicalRecord: State<MedicalRecord?> get() = _medicalRecord
    val danhSachPhieuKham = mutableStateOf<List<PhieuKham>>(emptyList())
    val danhSachDonThuoc = mutableStateOf<List<DonThuoc>>(emptyList())
    val danhSachPhieuXN = mutableStateOf<List<PhieuXetNghiem>>(emptyList())

    val message = mutableStateOf("")

    fun fetchMedicalRecord(maHSBA: String) {
        viewModelScope.launch {
            try {
                val res = api.getMedicalRecord(maHSBA)
                if (res.isSuccessful) {
                    val result = res.body()
                    if (result?.data != null) {
                        _medicalRecord.value = result.data
                        message.value = ""
                    } else {
                        message.value = "❗ Không có hồ sơ bệnh án"
                    }
                } else {
                    message.value = "❌ Lỗi API: ${res.code()}"
                }
            } catch (e: Exception) {
                message.value = "❌ Lỗi kết nối server"
            }
        }
    }

    fun loadByMonth(dotKhamBenh: String) {
        viewModelScope.launch {
            try {
                val resKham = api.getPhieuKhamByMonth(dotKhamBenh)
                if (resKham.isSuccessful) {
                    danhSachPhieuKham.value = resKham.body() ?: emptyList()
                }

                val resThuoc = api.getDonThuocByMonth(dotKhamBenh)
                if (resThuoc.isSuccessful) {
                    danhSachDonThuoc.value = resThuoc.body() ?: emptyList()
                }

                val resXN = api.getPhieuXetNghiemByMonth(dotKhamBenh)
                if (resXN.isSuccessful) {
                    danhSachPhieuXN.value = resXN.body() ?: emptyList()
                }
            } catch (e: Exception) {
                message.value = "❌ Lỗi tải dữ liệu theo tháng"
            }
        }
    }

    fun createHSBA(maBN: String) {
        viewModelScope.launch {
            val data = mapOf("maBN" to maBN)
            try {
                val res = api.createHoSo(data)
                if (res.isSuccessful) {
                    message.value = "Đã tạo hồ sơ bệnh án"
                    _medicalRecord.value = res.body()?.data
                } else {
                    message.value = "Không thể tạo hồ sơ bệnh án"
                }
            } catch (e: Exception) {
                message.value = "Lỗi tạo hồ sơ: ${e.message}"
            }
        }
    }
}
