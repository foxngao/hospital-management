package com.example.frontendapp.viewmodel

import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.frontendapp.data.remote.XetNghiemApiService
import com.example.frontendapp.data.model.test.LoaiXetNghiem
import com.example.frontendapp.data.model.test.PhieuXetNghiem
import com.example.frontendapp.data.remote.RetrofitApp
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*
import androidx.compose.runtime.State
import com.example.frontendapp.data.model.test.XetNghiem

class XetNghiemViewModel : ViewModel() {

    private val _loaiList = MutableStateFlow<List<LoaiXetNghiem>>(emptyList())
    val loaiList: StateFlow<List<LoaiXetNghiem>> = _loaiList

    private val _danhSachXN = MutableStateFlow<List<XetNghiem>>(emptyList())
    val danhSachXN: StateFlow<List<XetNghiem>> = _danhSachXN

    private val _message = mutableStateOf("")
    val message: State<String> = _message

    var phieuList = mutableStateOf<List<PhieuXetNghiem>>(emptyList())

    fun loadLoaiXetNghiem() {
        viewModelScope.launch {
            try {
                val res = RetrofitApp.xetNghiemApi.getAllLoaiXN()
                if (res.isSuccessful && res.body()?.data != null) {
                    _loaiList.value = res.body()!!.data!!
                } else {
                    _message.value = "⚠️ Không tải được danh sách loại xét nghiệm"
                }
            } catch (e: Exception) {
                _message.value = "❌ Lỗi kết nối khi tải loại xét nghiệm"
            }
        }
    }

    fun loadXetNghiem() {
        viewModelScope.launch {
            try {
                val res = RetrofitApp.xetNghiemApi.getAllXetNghiem()
                if (res.isSuccessful && res.body()?.data != null) {
                    _danhSachXN.value = res.body()!!.data!!
                } else {
                    _message.value = "⚠️ Không tải được danh sách xét nghiệm"
                }
            } catch (e: Exception) {
                _message.value = "❌ Lỗi kết nối khi tải xét nghiệm"
            }
        }
    }

    fun loadPhieuByMaHSBA(maHSBA: String) {
        viewModelScope.launch {
            try {
                Log.d("XN_FRONT", "🔍 Đang gọi API với maHSBA = $maHSBA")
                val res = RetrofitApp.xetNghiemApi.getPhieuByMaHSBA(maHSBA)
                if (res.isSuccessful) {
                    val phieuListRaw = res.body()?.data ?: emptyList()
                    Log.d("XN_API", "✅ Nhận ${phieuListRaw.size} phiếu từ API")

                    // Gọi song song từng phiếu để cập nhật trạng thái yêu cầu
                    val updatedPhieuList = phieuListRaw.map { phieu ->
                        val maYeuCau = phieu.maYeuCau
                        if (!maYeuCau.isNullOrBlank()) {
                            try {
                                val ycRes = RetrofitApp.xetNghiemApi.getYeuCauById(maYeuCau)
                                if (ycRes.isSuccessful && ycRes.body()?.data != null) {
                                    val yc = ycRes.body()!!.data!!
                                    // Nếu có kết quả mà trạng thái vẫn "chờ", thì cập nhật thành "đã có kết quả"
                                    if (!phieu.ketQua.isNullOrBlank() && yc.trangThai != "DA_CO_KET_QUA") {
                                        try {
                                            RetrofitApp.xetNghiemApi.updateTrangThai(
                                                mapOf("maYeuCau" to maYeuCau, "trangThai" to "DA_CO_KET_QUA")
                                            )
                                            yc.trangThai = "DA_CO_KET_QUA" // đồng bộ trạng thái trong app
                                        } catch (_: Exception) { }
                                    }
                                    phieu.copy(yeuCauXetNghiem = yc)
                                } else phieu
                            } catch (_: Exception) {
                                phieu
                            }
                        } else phieu
                    }

                    // ✅ Gán lại danh sách đã cập nhật
                    phieuList.value = updatedPhieuList
                } else {
                    val err = res.errorBody()?.string()
                    Log.e("XN_API", "❌ API lỗi: $err")
                }
            } catch (e: Exception) {
                Log.e("XN_API", "❌ Exception: ${e.message}")
            }
        }
    }


    fun createLichXetNghiem(phieu: PhieuXetNghiem, onDone: () -> Unit) {
        viewModelScope.launch {
            try {
                val response = RetrofitApp.xetNghiemApi.createPhieuFromPatient(phieu)
                if (response.isSuccessful) {
                    val body = response.body()
                    if (body?.success == true) {
                        _message.value = body.message ?: "✅ Đặt lịch thành công"
                        onDone()
                    } else {
                        _message.value = "❌ ${body?.message ?: "Không rõ lỗi"}"
                    }
                } else {
                    val errorMsg = response.errorBody()?.string()
                    _message.value = "❌ Backend trả về lỗi: ${errorMsg ?: "Không rõ"}"
                }
            } catch (e: Exception) {
                _message.value = "❌ Lỗi kết nối khi đặt lịch"
            }
        }
    }

    fun deletePhieu(id: String, onDone: () -> Unit) {
        viewModelScope.launch {
            try {
                val res = RetrofitApp.xetNghiemApi.deletePhieu(id)
                if (res.isSuccessful && res.body()?.success == true) {
                    _message.value = "🗑️ Đã huỷ lịch"
                    onDone()
                } else {
                    _message.value = "❌ Không thể huỷ lịch"
                }
            } catch (e: Exception) {
                _message.value = "❌ Lỗi huỷ phiếu"
            }
        }
    }

    fun canEditOrCancel(ngayThucHien: String?): Boolean {
        return try {
            if (ngayThucHien == null) return false
            val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
            val ngay = sdf.parse(ngayThucHien)
            val today = Calendar.getInstance().time
            val diff = ngay?.time?.minus(today.time)?.div(1000 * 60 * 60 * 24) ?: -1
            diff >= 1
        } catch (e: Exception) {
            false
        }
    }

    fun setError(msg: String) {
        _message.value = msg
    }
}
