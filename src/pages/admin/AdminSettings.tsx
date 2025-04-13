
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

export default function AdminSettings() {
  const [platformName, setPlatformName] = useState("TutorSafeSpace");
  const [contactEmail, setContactEmail] = useState("support@tutorsafespace.com");
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [timezone, setTimezone] = useState("America/New_York");
  const [theme, setTheme] = useState("light");
  const [securityLevel, setSecurityLevel] = useState("medium");
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings Updated",
      description: "Your general settings have been successfully saved.",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Updated",
      description: "Your security settings have been successfully saved.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been successfully saved.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Platform Settings</h1>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your platform's general settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input 
                    id="platformName" 
                    value={platformName} 
                    onChange={(e) => setPlatformName(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail" 
                    type="email"
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Asia/Kolkata">India Standard Time (IST)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleSaveGeneral}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your platform's security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="securityLevel">Security Level</Label>
                  <Select value={securityLevel} onValueChange={setSecurityLevel}>
                    <SelectTrigger id="securityLevel">
                      <SelectValue placeholder="Select security level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="twoFactor" defaultChecked />
                  <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="sessionTimeout" defaultChecked />
                  <Label htmlFor="sessionTimeout">Auto Session Timeout (30 minutes)</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger id="passwordPolicy">
                      <SelectValue placeholder="Select password policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                      <SelectItem value="moderate">Moderate (8+ chars, 1 uppercase, 1 number)</SelectItem>
                      <SelectItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleSaveSecurity}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage platform notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="enableNotifications" 
                    checked={enableNotifications}
                    onCheckedChange={setEnableNotifications} 
                  />
                  <Label htmlFor="enableNotifications">Enable Email Notifications</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="sessionReminders" defaultChecked />
                  <Label htmlFor="sessionReminders">Session Reminders</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="paymentAlerts" defaultChecked />
                  <Label htmlFor="paymentAlerts">Payment Alerts</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="newTickets" defaultChecked />
                  <Label htmlFor="newTickets">New Support Tickets</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailTemplate">Email Footer Template</Label>
                  <Textarea 
                    id="emailTemplate" 
                    placeholder="Enter your email footer template text here..."
                    defaultValue="© 2025 TutorSafeSpace. All rights reserved."
                    rows={4}
                  />
                </div>
                
                <Button onClick={handleSaveNotifications}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
