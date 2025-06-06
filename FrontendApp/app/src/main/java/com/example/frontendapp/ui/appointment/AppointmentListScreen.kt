package com.example.frontendapp.ui.appointment

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.frontendapp.data.model.Appointment
import com.example.frontendapp.viewmodel.AppointmentViewModel
import com.example.frontendapp.viewmodel.PatientViewModel

@Composable
fun AppointmentListScreen(
    navController: NavController,
    appointmentViewModel: AppointmentViewModel = viewModel(),
    patientViewModel: PatientViewModel = viewModel()
) {
    val appointments = appointmentViewModel.appointments.value
    val patient = patientViewModel.patient.value
    val maBN = patient?.maBN

    LaunchedEffect(Unit) {
        patientViewModel.loadCurrentPatient()
    }

    LaunchedEffect(maBN) {
        maBN?.let { appointmentViewModel.getAppointmentsByMaBN(it) }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .background(Color(0xFFE3F2FD)) // Xanh dương pastel nhạt
    ) {
        Text(
            "📅 Danh sách lịch hẹn",
            style = MaterialTheme.typography.headlineSmall,
            color = Color(0xFF0D3B66), // Xanh đậm
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 12.dp)
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Button(
                onClick = { navController.navigate("appointment-form") },
                modifier = Modifier
                    .weight(1f)
                    .height(48.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFC8E6C9)), // Xanh lá pastel
                shape = RoundedCornerShape(12.dp),
                elevation = ButtonDefaults.buttonElevation(defaultElevation = 2.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Add,
                    contentDescription = "Tạo lịch hẹn mới",
                    modifier = Modifier.size(20.dp),
                    tint = Color(0xFF2F855A) // Xanh lá đậm
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    "Tạo mới",
                    color = Color(0xFF2F855A),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium
                )
            }

            Button(
                onClick = { maBN?.let { appointmentViewModel.getAppointmentsByMaBN(it) } },
                modifier = Modifier
                    .weight(1f)
                    .height(48.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFB2EBF2)), // Xanh dương pastel
                shape = RoundedCornerShape(12.dp),
                elevation = ButtonDefaults.buttonElevation(defaultElevation = 2.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Refresh,
                    contentDescription = "Làm mới",
                    modifier = Modifier.size(20.dp),
                    tint = Color(0xFF0288D1) // Xanh dương đậm
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    "Làm mới",
                    color = Color(0xFF0288D1),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium
                )
            }

            Button(
                onClick = { navController.navigate("home") },
                modifier = Modifier
                    .weight(1f)
                    .height(48.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFD7CCC8)), // Nâu pastel nhạt
                shape = RoundedCornerShape(12.dp),
                elevation = ButtonDefaults.buttonElevation(defaultElevation = 2.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Home,
                    contentDescription = "Trang chủ",
                    modifier = Modifier.size(20.dp),
                    tint = Color(0xFF4E342E) // Nâu đậm
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    "Trang chủ",
                    color = Color(0xFF4E342E),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        if (appointments.isEmpty()) {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                shape = RoundedCornerShape(12.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Text(
                        "❗ Không có lịch hẹn nào",
                        color = Color(0xFFEF9A9A), // Đỏ pastel nhạt
                        style = MaterialTheme.typography.bodyLarge,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        } else {
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                items(appointments, key = { it.maLich ?: "" }) { appointment ->
                    AppointmentItem(
                        appointment = appointment,
                        onDelete = { id ->
                            appointmentViewModel.deleteAppointment(id) {
                                maBN?.let { appointmentViewModel.getAppointmentsByMaBN(it) }
                            }
                        },
                        onEdit = { edited ->
                            appointmentViewModel.selectedAppointment.value = edited
                            navController.navigate("appointment-form")
                        }
                    )
                }
            }
        }
    }
}

