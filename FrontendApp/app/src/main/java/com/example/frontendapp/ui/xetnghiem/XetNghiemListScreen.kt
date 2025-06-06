package com.example.frontendapp.ui.xetnghiem

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.frontendapp.R
import com.example.frontendapp.data.model.test.PhieuXetNghiem
import com.example.frontendapp.data.remote.RetrofitApp
import com.example.frontendapp.viewmodel.PatientViewModel
import com.example.frontendapp.viewmodel.XetNghiemViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun XetNghiemListScreen(
    navController: NavController,
    xetNghiemViewModel: XetNghiemViewModel = viewModel(),
    patientViewModel: PatientViewModel = viewModel()
) {
    val listPhieu = xetNghiemViewModel.phieuList.value
    val patient = patientViewModel.patient.value
    val maBN = patient?.maBN
    val message by xetNghiemViewModel.message

    LaunchedEffect(Unit) {
        patientViewModel.loadCurrentPatient()
    }

    LaunchedEffect(maBN) {
        if (!maBN.isNullOrBlank()) {
            try {
                val res = RetrofitApp.medicalApi.getMedicalRecord(maBN as String)
                if (res.isSuccessful) {
                    val maHSBA = res.body()?.data?.maHSBA
                    if (!maHSBA.isNullOrBlank()) {
                        xetNghiemViewModel.loadPhieuByMaHSBA(maHSBA)
                    } else {
                        println("❌ Không tìm thấy mã hồ sơ bệnh án")
                    }
                } else {
                    println("❌ API hồ sơ bệnh án lỗi HTTP")
                }
            } catch (e: Exception) {
                println("❌ Exception khi lấy hồ sơ bệnh án: ${e.message}")
            }
        }
    }


    // Pastel color palette
    val pastelBlue = Color(0xFFE6F0FA) // Softer blue for backgrounds
    val pastelGreen = Color(0xFFD9EAD3) // Softer green for accents
    val pastelWhite = Color(0xFFFCFDFE) // Cleaner white for content
    val darkText = Color(0xFF1A3C5A) // Softer dark for primary text
    val accentText = Color(0xFF6B7280) // Muted gray for secondary text
    val statusGreen = Color(0xFF66BB6A) // Softer green for "Đã có kết quả"
    val statusYellow = Color(0xFFFFCA28) // Softer yellow for "Chờ thực hiện"

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        "🧪 Lịch xét nghiệm",
                        color = darkText,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.headlineSmall
                    )
                },
                actions = {
                    TextButton(
                        onClick = { navController.navigate("home") },
                        modifier = Modifier
                            .background(
                                color = Color.White, // Nền trắng để tạo độ tương phản
                                shape = RoundedCornerShape(8.dp)
                            )
                            .padding(horizontal = 12.dp, vertical = 8.dp)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(4.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Home, // Sử dụng icon từ Material Icons thay cho painterResource
                                contentDescription = "Home",
                                tint = pastelGreen,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                "Trang chủ",
                                color = Color(0xFF1E3A8A), // hoặc màu xanh đậm bạn muốn , // Màu đậm hơn để nổi bật trên nền trắng
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Medium
                            )
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = pastelWhite,
                    titleContentColor = darkText
                )
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { navController.navigate("xetnghiem-form") },
                containerColor = pastelGreen,
                contentColor = darkText,
                shape = CircleShape,
                modifier = Modifier
                    .shadow(4.dp, CircleShape)
                    .size(60.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Icon(
                        painter = painterResource(id = R.drawable.ic_add), // Replace with add icon
                        contentDescription = "Add",
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        "Thêm",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        },
        containerColor = pastelBlue
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .padding(horizontal = 20.dp, vertical = 16.dp)
                .fillMaxSize()
        ) {
            if (listPhieu.isEmpty()) {
                Text(
                    "❗ Không có lịch xét nghiệm",
                    color = Color(0xFFEF5350),
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Medium,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )
                Spacer(Modifier.height(16.dp))
                TableHeader()
            } else {
                TableHeader()
                Spacer(Modifier.height(12.dp))
                LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    items(listPhieu, key = { it.maPhieuXN ?: "" }) { item ->
                        TableRow(
                            item = item,
                            viewModel = xetNghiemViewModel,
                            navController = navController
                        )
                    }
                }
            }

            if (message.isNotBlank()) {
                Spacer(Modifier.height(16.dp))
                Text(
                    message,
                    color = Color(0xFFEF5350),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )
            }
        }
    }
}

@Composable
fun TableHeader() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xFFECEFF1))
            .padding(vertical = 8.dp, horizontal = 12.dp)
            .clip(RoundedCornerShape(8.dp)),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        TableCell("🆔 Mã", weight = 1f, bold = true, textColor = Color(0xFF1A3C5A))
        TableCell("📅 Ngày", weight = 1f, bold = true, textColor = Color(0xFF1A3C5A))
        TableCell("🧬 Xét nghiệm", weight = 1.5f, bold = true, textColor = Color(0xFF1A3C5A))
        TableCell("📌 Trạng thái", weight = 1.2f, bold = true, textColor = Color(0xFF1A3C5A))
        TableCell("📝 Ghi chú", weight = 1.5f, bold = true, textColor = Color(0xFF1A3C5A))
        TableCell("🔧 Tác vụ", weight = 1.5f, bold = true, textColor = Color(0xFF1A3C5A))
    }
}

@Composable
fun TableRow(
    item: PhieuXetNghiem,
    viewModel: XetNghiemViewModel,
    navController: NavController
) {
    val (bgColor, statusLabel) = when (item.yeuCauXetNghiem?.trangThai) {
        "DA_CO_KET_QUA" -> Color(0xFF66BB6A) to "✅ Đã có kết quả"
        else -> Color(0xFFFFCA28) to "⌛ Chờ thực hiện"
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .shadow(2.dp, RoundedCornerShape(12.dp)),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFFCFDFE))
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp, horizontal = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            TableCell(
                text = item.maPhieuXN ?: "-",
                weight = 1f,
                textColor = Color(0xFF1A3C5A)
            )
            TableCell(
                text = item.ngayThucHien ?: "-",
                weight = 1f,
                textColor = Color(0xFF1A3C5A)
            )
            TableCell(
                text = item.xetNghiem?.tenXN ?: "-",
                weight = 1.5f,
                textColor = Color(0xFF1A3C5A)
            )
            TableCell(
                text = statusLabel,
                weight = 1.2f,
                textColor = Color.White,
                bgColor = bgColor
            )
            TableCell(
                text = item.ghiChu ?: "-",
                weight = 1.5f,
                textColor = Color(0xFF1A3C5A)
            )

            TableCell("", weight = 1.5f) {
                if (item.yeuCauXetNghiem?.trangThai == "DA_CO_KET_QUA") {
                    OutlinedButton(
                        onClick = {
                            navController.navigate("xetnghiem-detail/${item.maPhieuXN}")
                        },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("📄 Xem")
                    }
                } else if (viewModel.canEditOrCancel(item.ngayThucHien)) {
                    Column(horizontalAlignment = Alignment.End, verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        OutlinedButton(
                            onClick = {
                                viewModel.deletePhieu(item.maPhieuXN ?: "") {
                                    viewModel.loadPhieuByMaHSBA(item.maHSBA ?: "")
                                }
                            },
                            modifier = Modifier.fillMaxWidth(),
                            colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.Red)
                        ) {
                            Text("🗑️ Huỷ")
                        }
                    }
                } else {
                    Text("⛔ Không thể sửa")
                }
            }

        }
    }
}

@Composable
fun RowScope.TableCell(
    text: String = "",
    weight: Float,
    textColor: Color = Color.Black,
    bgColor: Color = Color.Transparent,
    bold: Boolean = false,
    content: @Composable (() -> Unit)? = null
) {
    Box(
        modifier = Modifier
            .weight(weight)
            .background(bgColor)
            .padding(horizontal = 8.dp, vertical = 6.dp)
            .clip(RoundedCornerShape(4.dp)),
        contentAlignment = Alignment.CenterStart
    ) {
        if (content != null) {
            content()
        } else {
            Text(
                text = text,
                color = textColor,
                fontSize = 14.sp,
                fontWeight = if (bold) FontWeight.SemiBold else FontWeight.Normal,
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}