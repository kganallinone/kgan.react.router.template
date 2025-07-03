import { api } from "./api.client";

export interface Appointment {
  id: number;
  appointmentId: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  doctorId: string;
  speciality: string;
  department: string;
  date: string;
  time: string;
  reason: string;
  status:
    | "scheduled"
    | "completed"
    | "cancelled"
    | "no-show"
    | "confirmed"
    | "pending";
  notes?: string;
  location?: string;
  type?: "consultation" | "follow-up" | "procedure" | "check-up";
  createdAt?: string;
  updatedAt?: string;
}

export interface AppointmentFilter {
  doctorId?: string;
  patientId?: string;
  status?: string;
  date?: string;
  searchQuery?: string;
  page?: number;
  limit?: number;
}

// Mock data for development
const mockAppointments: Appointment[] = [
  {
    id: 1,
    appointmentId: "APT-2024-001",
    patientName: "John Doe",
    patientId: "P001",
    doctorName: "Dr. Sarah Wilson",
    doctorId: "D001",
    speciality: "Cardiology",
    department: "Cardiology",
    date: "2024-03-25",
    time: "10:00 AM",
    reason: "Regular Check-up",
    status: "confirmed",
    notes: "Patient has history of hypertension",
    location: "Main Hospital, Room 302",
    type: "check-up",
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    id: 2,
    appointmentId: "APT-2024-002",
    patientName: "Jane Smith",
    patientId: "P002",
    doctorName: "Dr. Sarah Wilson",
    doctorId: "D001",
    speciality: "Cardiology",
    department: "Cardiology",
    date: "2024-03-25",
    time: "02:30 PM",
    reason: "Follow-up Consultation",
    status: "scheduled",
    notes: "Follow-up for heart condition",
    location: "Main Hospital, Room 302",
    type: "follow-up",
    createdAt: "2024-03-21T14:30:00Z",
    updatedAt: "2024-03-21T14:30:00Z",
  },
  {
    id: 3,
    appointmentId: "APT-2024-003",
    patientName: "Mike Johnson",
    patientId: "P003",
    doctorName: "Dr. Sarah Wilson",
    doctorId: "D001",
    speciality: "Cardiology",
    department: "Cardiology",
    date: "2024-03-26",
    time: "09:15 AM",
    reason: "Initial Consultation",
    status: "pending",
    notes: "New patient referral",
    location: "Main Hospital, Room 302",
    type: "consultation",
    createdAt: "2024-03-22T09:15:00Z",
    updatedAt: "2024-03-22T09:15:00Z",
  },
  {
    id: 4,
    appointmentId: "APT-2024-004",
    patientName: "Emily Davis",
    patientId: "P004",
    doctorName: "Dr. Sarah Wilson",
    doctorId: "D001",
    speciality: "Cardiology",
    department: "Cardiology",
    date: "2024-03-24",
    time: "11:00 AM",
    reason: "ECG Procedure",
    status: "completed",
    notes: "Procedure completed successfully",
    location: "Main Hospital, Room 302",
    type: "procedure",
    createdAt: "2024-03-23T11:00:00Z",
    updatedAt: "2024-03-24T11:00:00Z",
  },
  {
    id: 5,
    appointmentId: "APT-2024-005",
    patientName: "Robert Wilson",
    patientId: "P005",
    doctorName: "Dr. Sarah Wilson",
    doctorId: "D001",
    speciality: "Cardiology",
    department: "Cardiology",
    date: "2024-03-23",
    time: "03:00 PM",
    reason: "Stress Test",
    status: "cancelled",
    notes: "Patient requested cancellation",
    location: "Main Hospital, Room 302",
    type: "procedure",
    createdAt: "2024-03-22T15:00:00Z",
    updatedAt: "2024-03-23T10:00:00Z",
  },
];

export const appointmentService = {
  // Get all appointments
  getAll: (params?: AppointmentFilter) =>
    api.getAll("/appointments", params ?? {}),

  // Get appointments by doctor
  getByDoctor: (doctorId: string, params?: AppointmentFilter) =>
    api.getAll(`/appointments/doctor/${doctorId}`, params ?? {}),

  // Get appointments by patient
  getByPatient: (patientId: string, params?: AppointmentFilter) =>
    api.getAll(`/appointments/patient/${patientId}`, params ?? {}),

  // Get appointment by ID
  get: (id: string) => api.get(`/appointments/${id}`),

  // Create new appointment
  create: (
    appointment: Omit<
      Appointment,
      "id" | "appointmentId" | "createdAt" | "updatedAt"
    >
  ) => api.post("/appointments", appointment),

  // Update appointment
  update: (id: string, appointment: Partial<Appointment>) =>
    api.put(`/appointments/${id}`, appointment),

  // Delete appointment
  delete: (id: string) => api.delete(`/appointments/${id}`),

  // Update appointment status
  updateStatus: (id: string, status: Appointment["status"]) =>
    api.put(`/appointments/${id}/status`, { status }),

  // Development mode methods
  _getMockAppointments: () => mockAppointments,
  _getMockAppointmentsByDoctor: (doctorId: string) =>
    mockAppointments.filter((apt) => apt.doctorId === doctorId),
  _getMockAppointmentsByPatient: (patientId: string) =>
    mockAppointments.filter((apt) => apt.patientId === patientId),
  _getMockAppointmentById: (id: string) =>
    mockAppointments.find((apt) => apt.id.toString() === id),
  _filterMockAppointments: (filters: AppointmentFilter) => {
    return mockAppointments.filter((appointment) => {
      const matchesDoctor =
        !filters.doctorId || appointment.doctorId === filters.doctorId;
      const matchesPatient =
        !filters.patientId || appointment.patientId === filters.patientId;
      const matchesStatus =
        !filters.status || appointment.status === filters.status;
      const matchesDate = !filters.date || appointment.date === filters.date;
      const matchesSearch =
        !filters.searchQuery ||
        appointment.patientName
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        appointment.reason
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        appointment.appointmentId
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());

      return (
        matchesDoctor &&
        matchesPatient &&
        matchesStatus &&
        matchesDate &&
        matchesSearch
      );
    });
  },
  _createMockAppointment: (
    appointment: Omit<
      Appointment,
      "id" | "appointmentId" | "createdAt" | "updatedAt"
    >
  ) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: mockAppointments.length + 1,
      appointmentId: `APT-2024-${String(mockAppointments.length + 1).padStart(
        3,
        "0"
      )}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockAppointments.push(newAppointment);
    return newAppointment;
  },
  _updateMockAppointment: (id: string, updates: Partial<Appointment>) => {
    const index = mockAppointments.findIndex((apt) => apt.id.toString() === id);
    if (index !== -1) {
      mockAppointments[index] = {
        ...mockAppointments[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return mockAppointments[index];
    }
    return null;
  },
  _updateMockAppointmentStatus: (id: string, status: Appointment["status"]) => {
    const index = mockAppointments.findIndex((apt) => apt.id.toString() === id);
    if (index !== -1) {
      mockAppointments[index].status = status;
      mockAppointments[index].updatedAt = new Date().toISOString();
      return mockAppointments[index];
    }
    return null;
  },
};
