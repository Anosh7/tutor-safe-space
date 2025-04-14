
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { ArrowLeft, Save, Copy } from "lucide-react";
import { teachers, students, Student, Teacher } from "@/data/mockData";
import { UserRole } from "@/contexts/AuthContext";

export default function CreateUser() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<UserRole>("student");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    grade: "",
    subjects: [] as string[],
    board: "",
    timezone: "America/New_York",
    parentEmail: "",
    qualifications: "",
    experience: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdUser, setCreatedUser] = useState<null | {
    id: string;
    email: string;
    password: string;
    role: string;
    name: string;
  }>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate password if not provided
    const password = formData.password || generatePassword();
    
    // Generate a unique ID
    const newId = `${userRole}${Math.floor(Math.random() * 1000)}`;
    
    // Create a new user object - now using email for login
    const newUser = {
      id: newId,
      name: formData.name,
      email: formData.email,
      password,
      profileImage: "/placeholder.svg"
    };
    
    // Add additional fields based on user role
    if (userRole === "student") {
      const newStudent: Student = {
        ...newUser,
        board: formData.board,
        grade: formData.grade,
        subjects: formData.subjects.length > 0 ? formData.subjects : ["Mathematics"], // Default subject
        timezone: formData.timezone,
        parentEmail: formData.parentEmail,
        role: "student" // Use the literal type
      };
      
      // Add to students array
      students.push(newStudent);
    } else if (userRole === "teacher") {
      const newTeacher: Teacher = {
        ...newUser,
        subjects: formData.subjects.length > 0 ? formData.subjects : ["Mathematics"], // Default subject
        qualifications: formData.qualifications || "Not specified",
        experience: formData.experience || "Not specified",
        timezone: formData.timezone,
        role: "teacher" // Use the literal type
      };
      
      // Add to teachers array
      teachers.push(newTeacher);
    }
    
    // Store created user for display
    setCreatedUser({
      ...newUser,
      role: userRole
    });
    
    toast.success(`New ${userRole} account has been created successfully.`);
    setIsSubmitting(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/admin-dashboard/users")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Create New User</h1>
        </div>

        {createdUser ? (
          <Card>
            <CardHeader>
              <CardTitle>User Created Successfully</CardTitle>
              <CardDescription>
                Please save these login credentials. They will not be shown again.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md bg-green-50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">Email:</p>
                  <div className="flex items-center">
                    <span className="mr-2">{createdUser.email}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => copyToClipboard(createdUser.email)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Password:</p>
                  <div className="flex items-center">
                    <span className="mr-2">{createdUser.password}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => copyToClipboard(createdUser.password)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Role: <span className="font-normal capitalize">{createdUser.role}</span></p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setCreatedUser(null)}
                >
                  Create Another User
                </Button>
                <Button 
                  onClick={() => navigate("/admin-dashboard/users")}
                >
                  Go to Users List
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>
                Enter the details for the new user account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>User Role</Label>
                    <RadioGroup 
                      defaultValue="student" 
                      value={userRole} 
                      onValueChange={setUserRole}
                      className="flex flex-wrap gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="student" id="student" />
                        <Label htmlFor="student">Student</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="teacher" id="teacher" />
                        <Label htmlFor="teacher">Teacher</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin" id="admin" />
                        <Label htmlFor="admin">Admin</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="Enter full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="Enter email address"
                      />
                      <p className="text-xs text-gray-500">This email will be used for login</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 hidden">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        name="username" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="Username will be the same as email"
                      />
                    </div>
                    
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="password">Password (optional)</Label>
                      <Input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        placeholder="Leave blank to auto-generate"
                      />
                      <p className="text-xs text-gray-500">If left blank, a secure password will be automatically generated</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={formData.timezone} 
                      onValueChange={(value) => handleSelectChange("timezone", value)}
                    >
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

                  {userRole === "student" && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="board">Board/Curriculum</Label>
                          <Select 
                            value={formData.board} 
                            onValueChange={(value) => handleSelectChange("board", value)}
                          >
                            <SelectTrigger id="board">
                              <SelectValue placeholder="Select board" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CBSE">CBSE</SelectItem>
                              <SelectItem value="ICSE">ICSE</SelectItem>
                              <SelectItem value="State Board">State Board</SelectItem>
                              <SelectItem value="IB">International Baccalaureate</SelectItem>
                              <SelectItem value="Common Core">Common Core</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="grade">Grade/Class</Label>
                          <Select 
                            value={formData.grade} 
                            onValueChange={(value) => handleSelectChange("grade", value)}
                          >
                            <SelectTrigger id="grade">
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(12)].map((_, i) => (
                                <SelectItem key={i} value={`${i+1}`}>Grade {i+1}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parentEmail">Parent's Email</Label>
                        <Input 
                          id="parentEmail"
                          name="parentEmail" 
                          type="email"
                          value={formData.parentEmail}
                          onChange={handleInputChange}
                          placeholder="Enter parent's email"
                        />
                      </div>
                    </>
                  )}

                  {userRole === "teacher" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="qualifications">Qualifications</Label>
                        <Input 
                          id="qualifications"
                          name="qualifications"
                          value={formData.qualifications}
                          onChange={handleInputChange}
                          placeholder="e.g., PhD in Mathematics, B.Ed"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input 
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          placeholder="e.g., 5 years"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate("/admin-dashboard/users")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create User
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
