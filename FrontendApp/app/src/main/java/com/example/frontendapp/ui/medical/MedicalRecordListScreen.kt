package com.example.frontendapp.ui.medical

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.example.frontendapp.viewmodel.MedicalRecordViewModel
import com.example.frontendapp.viewmodel.PatientViewModel
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun MedicalRecordListScreen(
    maHSBA: String,
    viewModel: MedicalRecordViewModel,
    patientViewModel: PatientViewModel,
    navController: NavHostController
) {
    val hsba = viewModel.medicalRecord.value
    val message = viewModel.message.value
    val danhSachPhieuKham = viewModel.danhSachPhieuKham.value
    val danhSachDonThuoc = viewModel.danhSachDonThuoc.value
    val danhSachPhieuXN = viewModel.danhSachPhieuXN.value

    val pastelBlue = Color(0xFFD6EAF8)
    val pastelWhite = Color(0xFFF8FAFC)
    val pastelGreen = Color(0xFFD4EFDF)
    val darkText = Color(0xFF2D3748)
    val accentText = Color(0xFF4A90E2)

    var selectedYear by remember { mutableStateOf("") }
    var selectedMonth by remember { mutableStateOf("") }

    val patient = patientViewModel.patient.value
    val maBN = patient?.maBN

    LaunchedEffect(Unit) {
        patientViewModel.loadCurrentPatient()
    }

    LaunchedEffect(maBN) {
        if (!maBN.isNullOrBlank()) {
            viewModel.fetchMedicalRecord(maBN)
        }
    }

    LaunchedEffect(hsba?.ngayLap) {
        hsba?.ngayLap?.let {
            try {
                val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
                val date = sdf.parse(it)
                val cal = Calendar.getInstance()
                cal.time = date
                selectedYear = cal.get(Calendar.YEAR).toString()
                selectedMonth = (cal.get(Calendar.MONTH) + 1).toString().padStart(2, '0')
                viewModel.loadByMonth("$selectedYear-$selectedMonth")
            } catch (_: Exception) {}
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(pastelBlue)
            .padding(24.dp),
        verticalArrangement = Arrangement.Top,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 16.dp),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = pastelWhite),
            elevation = CardDefaults.cardElevation(defaultElevation = 6.dp)
        ) {
            Column(
                modifier = Modifier
                    .padding(20.dp)
                    .fillMaxWidth()
            ) {
                Text(
                    text = "\uD83D\uDCCB Hồ sơ bệnh án",
                    style = MaterialTheme.typography.headlineMedium.copy(
                        fontWeight = FontWeight.Bold,
                        color = darkText,
                        fontSize = 22.sp
                    ),
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )
                Spacer(modifier = Modifier.height(20.dp))

                Button(
                    onClick = { navController.navigate("home") },
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = pastelGreen,
                        contentColor = darkText
                    ),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("\uD83C\uDFE0 Trang chủ", fontSize = 14.sp, fontWeight = FontWeight.SemiBold)
                }

                if (message.isNotBlank()) {
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = message,
                        color = Color(0xFFD32F2F),
                        style = MaterialTheme.typography.bodyMedium.copy(
                            fontWeight = FontWeight.Medium,
                            fontSize = 14.sp
                        ),
                        modifier = Modifier.align(Alignment.CenterHorizontally)
                    )
                }

                hsba?.let { record ->
                    Spacer(modifier = Modifier.height(16.dp))

                    listOf(
                        "Mã hồ sơ bệnh án" to (record.maHSBA ?: ""),
                        "Mã bệnh nhân" to (record.maBN ?: ""),
                        "Ngày lập" to (record.ngayLap ?: ""),
                        "Đợt khám bệnh" to (record.dotKhamBenh ?: ""),
                        "Ghi chú" to (record.ghiChu ?: "")
                    ).forEach { (label, value) ->
                        OutlinedTextField(
                            value = value,
                            onValueChange = {},
                            label = {
                                Text(
                                    text = label,
                                    color = accentText,
                                    fontWeight = FontWeight.Medium
                                )
                            },
                            readOnly = true,
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp),
                            shape = RoundedCornerShape(8.dp),
                            colors = TextFieldDefaults.colors(
                                focusedContainerColor = Color.White.copy(alpha = 0.6f),
                                unfocusedContainerColor = Color.White.copy(alpha = 0.6f),
                                focusedTextColor = darkText,
                                unfocusedTextColor = darkText,
                                focusedIndicatorColor = accentText,
                                unfocusedIndicatorColor = Color.LightGray,
                                focusedLabelColor = accentText,
                                unfocusedLabelColor = accentText
                            )
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    val years = (2024..2025).map { it.toString() }
                    val months = (1..12).map { it.toString().padStart(2, '0') }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                "Năm",
                                style = MaterialTheme.typography.bodySmall.copy(color = accentText)
                            )
                            DropdownYearMonth(items = years, selected = selectedYear) {
                                selectedYear = it
                                viewModel.loadByMonth("$selectedYear-$selectedMonth")
                            }
                        }
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                "Tháng",
                                style = MaterialTheme.typography.bodySmall.copy(color = accentText)
                            )
                            DropdownYearMonth(items = months, selected = selectedMonth) {
                                selectedMonth = it
                                viewModel.loadByMonth("$selectedYear-$selectedMonth")
                            }
                        }
                    }

                    Text(
                        text = "Đợt khám bệnh: $selectedYear-$selectedMonth",
                        style = MaterialTheme.typography.bodyLarge.copy(
                            color = darkText,
                            fontWeight = FontWeight.SemiBold,
                            fontSize = 16.sp
                        ),
                        modifier = Modifier.padding(top = 8.dp)
                    )


                    Spacer(modifier = Modifier.height(12.dp))
                    // ========== PHIẾU KHÁM ==========
                    Text("📄 Phiếu khám", fontWeight = FontWeight.Bold, color = darkText)
                    if (danhSachPhieuKham.isEmpty()) {
                        Text("⚠️ Không có phiếu khám nào", color = MaterialTheme.colorScheme.error)
                    } else {
                        danhSachPhieuKham.forEach {
                            ListItem(
                                headlineContent = {
                                    Text(
                                        "Ngày: ${it.ngayKham} - Chẩn đoán: ${it.chuanDoan ?: "-"}",
                                        fontSize = 14.sp
                                    )
                                },
                                trailingContent = {
                                    IconButton(onClick = {
                                        navController.navigate("phieukham-detail/${it.maPK}")
                                    }) {
                                        Icon(
                                            Icons.AutoMirrored.Filled.KeyboardArrowRight,
                                            contentDescription = "Chi tiết"
                                        )
                                    }
                                }
                            )
                        }
                    }

                    // ========== ĐƠN THUỐC ==========
                    Spacer(modifier = Modifier.height(12.dp))
                    Text("💊 Đơn thuốc", fontWeight = FontWeight.Bold, color = darkText)
                    if (danhSachDonThuoc.isEmpty()) {
                        Text("⚠️ Không có đơn thuốc nào", color = MaterialTheme.colorScheme.error)
                    } else {
                        danhSachDonThuoc.forEach {
                            ListItem(
                                headlineContent = {
                                    Text(
                                        "Ngày kê: ${it.ngayKeDon} - Mã thuốc: ${it.maThuoc ?: "-"}",
                                        fontSize = 14.sp
                                    )
                                },
                                trailingContent = {
                                    IconButton(onClick = {
                                        navController.navigate("donthuoc-detail/${it.maDT}")
                                    }) {
                                        Icon(
                                            Icons.AutoMirrored.Filled.KeyboardArrowRight,
                                            contentDescription = "Chi tiết"
                                        )
                                    }
                                }
                            )
                        }
                    }

                    // ========== PHIẾU XÉT NGHIỆM ==========
                    Spacer(modifier = Modifier.height(12.dp))
                    Text("🧪 Phiếu xét nghiệm", fontWeight = FontWeight.Bold, color = darkText)
                    if (danhSachPhieuXN.isEmpty()) {
                        Text(
                            "⚠️ Không có phiếu xét nghiệm nào",
                            color = MaterialTheme.colorScheme.error
                        )
                    } else {
                        danhSachPhieuXN.forEach {
                            ListItem(
                                headlineContent = {
                                    Text(
                                        "Ngày: ${it.ngayThucHien} - Ghi chú: ${it.ghiChu ?: "-"}",
                                        fontSize = 14.sp
                                    )
                                },
                                trailingContent = {
                                    IconButton(onClick = {
                                        navController.navigate("xetnghiem-detail/${it.maPhieuXN}")
                                    }) {
                                        Icon(
                                            Icons.AutoMirrored.Filled.KeyboardArrowRight,
                                            contentDescription = "Chi tiết"
                                        )
                                    }
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DropdownYearMonth(
    items: List<String>,
    selected: String,
    onItemSelected: (String) -> Unit
) {
    var expanded by remember { mutableStateOf(false) }
    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded }
    ) {
        OutlinedTextField(
            value = selected,
            onValueChange = {},
            readOnly = true,
            label = { Text("Chọn") },
            trailingIcon = {
                ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
            },
            modifier = Modifier.menuAnchor().fillMaxWidth()
        )
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            items.forEach {
                DropdownMenuItem(
                    text = { Text(it) },
                    onClick = {
                        onItemSelected(it)
                        expanded = false
                    }
                )
            }
        }
    }
}

@Composable
fun MedicalTextField(label: String, value: String, labelColor: Color, textColor: Color) {
    OutlinedTextField(
        value = value,
        onValueChange = {},
        label = {
            Text(text = label, color = labelColor, fontWeight = FontWeight.Medium)
        },
        readOnly = true,
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        shape = RoundedCornerShape(8.dp),
        colors = TextFieldDefaults.colors(
            focusedContainerColor = Color.White.copy(alpha = 0.6f),
            unfocusedContainerColor = Color.White.copy(alpha = 0.6f),
            focusedTextColor = textColor,
            unfocusedTextColor = textColor,
            focusedIndicatorColor = labelColor,
            unfocusedIndicatorColor = Color.LightGray,
            focusedLabelColor = labelColor,
            unfocusedLabelColor = labelColor
        )
    )
}
