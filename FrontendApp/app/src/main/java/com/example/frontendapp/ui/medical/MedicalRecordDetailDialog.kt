/* package com.example.frontendapp.ui.medical

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.frontendapp.viewmodel.MedicalRecordViewModel

@Composable
fun MedicalRecordDetailDialog(viewModel: MedicalRecordViewModel, onClose: () -> Unit) {
    AlertDialog(
        onDismissRequest = onClose,
        confirmButton = { TextButton(onClick = onClose) { Text("Đóng") } },
        title = { Text("Chi tiết hồ sơ") },
        text = {
            Column {
                Text("Đơn thuốc:")
                viewModel.donThuoc.value.forEach {
                    Text("- ${it.tenThuoc} (${it.soLuong}) ${it.lieuDung}")
                }

                Spacer(modifier = Modifier.height(8.dp))

                Text("Phiếu khám:")
                viewModel.phieuKham.value.forEach {
                    Text("- ${it.ngayKham}: ${it.trieuChung} – ${it.chanDoan}")
                }

                Spacer(modifier = Modifier.height(8.dp))

                Text("Xét nghiệm:")
                viewModel.phieuXN.value.forEach {
                    Text("- ${it.ngayThucHien}: ${it.maPhieuXN} = ${it.ketQua}")
                }
            }
        }
    )
} */