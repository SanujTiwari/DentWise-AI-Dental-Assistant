import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usersAPI } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

export default function UserProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await usersAPI.getById(id);
        setUser(data);
      } catch (error) {
        console.error("User not found", error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pt-24 px-6 md:px-12 pb-12 animate-fade-in">
      <Navbar />
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="border-none bg-transparent shadow-none">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} />
              <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </Card>

        <Card className="shadow-md border-primary/10">
          <CardHeader>
            <CardTitle>Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground whitespace-pre-wrap">
              {user.bio || "No bio provided yet."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
