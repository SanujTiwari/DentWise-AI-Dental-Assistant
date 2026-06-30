import { useGetDoctors } from "@/hooks/use-doctors";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { EditIcon, MailIcon, PhoneIcon, PlusIcon, StethoscopeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import AddDoctorDialog from "./AddDoctorDialog";
import EditDoctorDialog from "./EditDoctorDialog";

function DoctorsManagement() {
  const { data: doctors = [] } = useGetDoctors();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <>
      <Card className="mb-12 shadow-md border-primary/10">
        <CardHeader className="flex md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <StethoscopeIcon className="size-5 text-primary animate-pulse" />
              Doctors Management
            </CardTitle>
            <CardDescription>Manage and oversee all doctors in your practice</CardDescription>
          </div>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/100"
          >
            <PlusIcon className="mr-2 size-4" />
            Add Doctor
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-muted/30 rounded-xl border border-border/50 gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20 flex items-center justify-center bg-primary/5">
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="size-12 object-cover"
                    />
                  </div>

                  <div>
                    <div className="font-semibold">{doctor.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      {doctor.speciality}
                      <span className="px-2 py-0.5 bg-muted rounded text-xs">
                        {doctor.gender === "MALE" ? "Male" : "Female"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MailIcon className="h-3 w-3" />
                        {doctor.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <PhoneIcon className="h-3 w-3" />
                        {doctor.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t pt-3 sm:border-t-0 sm:pt-0">
                  <div className="text-center sm:text-right">
                    <div className="font-semibold text-primary">{doctor.appointmentCount}</div>
                    <div className="text-xs text-muted-foreground">Appointments</div>
                  </div>

                  {doctor.isActive ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3"
                    onClick={() => handleEditDoctor(doctor)}
                  >
                    <EditIcon className="size-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddDoctorDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />

      {selectedDoctor && (
        <EditDoctorDialog
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          doctor={selectedDoctor}
        />
      )}
    </>
  );
}
export default DoctorsManagement;
