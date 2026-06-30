import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usersAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [bio, setBio] = useState("");
  const [theme, setTheme] = useState("light");
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await usersAPI.getProfile();
        setBio(profile.bio || "");
        setTheme(profile.chatTheme || "light");
      } catch (error) {
        console.error("Failed to load profile details", error);
      } finally {
        setLoadingProfile(false);
      }
    }
    loadProfile();
  }, []);

  const handleSaveBio = async () => {
    setSaving(true);
    try {
      const updatedUser = await usersAPI.updateBio(bio);
      updateUser(updatedUser);
      toast.success("Bio updated successfully!");
    } catch (error) {
      toast.error("Failed to update bio.");
    } finally {
      setSaving(false);
    }
  };

  const handleThemeChange = async (val) => {
    setTheme(val);
    try {
      const response = await usersAPI.updateTheme(val);
      if (response.success) {
        updateUser(response.user);
        toast.success(`Theme changed to ${val}`);
        // Apply theme to document element
        const root = window.document.documentElement;
        root.classList.remove("light", "dark", "custom");
        root.classList.add(val);
        window.localStorage.setItem("theme", val);
      } else {
        toast.error("Failed to update theme.");
      }
    } catch (error) {
      toast.error("Failed to update theme.");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-6 md:px-12 pb-12 animate-fade-in">
      <Navbar />
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Your Profile</h1>

        {loadingProfile ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <Card className="shadow-md border-primary/10">
              <CardHeader>
                <CardTitle>About You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="h-32"
                  />
                </div>
                <Button onClick={handleSaveBio} disabled={saving}>
                  {saving ? "Saving..." : "Save Bio"}
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md border-primary/10">
              <CardHeader>
                <CardTitle>Chat Theme</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={theme} onValueChange={handleThemeChange} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="theme-custom" />
                    <Label htmlFor="theme-custom">Custom Blue</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
