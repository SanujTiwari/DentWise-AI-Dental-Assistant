import { useAppointmentStats } from "@/hooks/use-appointment";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BrainIcon, MessageSquareIcon } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

function DentalHealthOverview() {
  const { data: stats, isLoading } = useAppointmentStats();
  const { user } = useAuth();

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainIcon className="size-5 text-primary" />
          Your Dental Health
        </CardTitle>
        <CardDescription>Keep track of your dental care journey</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold text-primary mb-1">
                {stats?.completedAppointments ?? 0}
              </div>
              <div className="text-sm text-muted-foreground">Completed Visits</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold text-primary mb-1">
                {stats?.totalAppointments ?? 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Appointments</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold text-primary mb-1">
                {user?.createdAt ? format(new Date(user.createdAt), "MMM yyyy") : "---"}
              </div>
              <div className="text-sm text-muted-foreground">Member Since</div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
              <MessageSquareIcon className="size-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Ready to get started?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Book your first appointment or try our AI chatbot for instant dental advice.
              </p>
              <div className="flex gap-2">
                <Link to="/chatbot">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Try AI Assistant
                  </Button>
                </Link>
                <Link to="/appointments">
                  <Button size="sm" variant="outline">
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DentalHealthOverview;
