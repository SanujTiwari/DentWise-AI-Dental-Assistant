import { appointmentsAPI } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAppointments() {
  return useQuery({
    queryKey: ["getAppointments"],
    queryFn: appointmentsAPI.getAll,
  });
}

export function useBookedTimeSlots(doctorId, date) {
  return useQuery({
    queryKey: ["getBookedTimeSlots", doctorId, date],
    queryFn: () => appointmentsAPI.getBookedSlots(doctorId, date),
    enabled: !!doctorId && !!date,
  });
}

export function useBookAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentsAPI.book,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["getAppointments"] });
    },
    onError: (error) => console.error("Failed to book appointment:", error),
  });
}

export function useUserAppointments() {
  return useQuery({
    queryKey: ["getUserAppointments"],
    queryFn: appointmentsAPI.getUserAppointments,
  });
}

export function useAppointmentStats() {
  return useQuery({
    queryKey: ["appointmentStats"],
    queryFn: appointmentsAPI.getStats,
  });
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => appointmentsAPI.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["getUserAppointments"] });
    },
    onError: (error) => console.error("Failed to update appointment:", error),
  });
}
