
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { students, teachers } from "@/data/mockData";
import { ArrowLeft, Mail, Phone, MapPin, Clock, BookOpen, GraduationCap } from "lucide-react";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundStudent = students.find(student => student.id === id);
    const foundTeacher = teachers.find(teacher => teacher.id === id);
    const foundUser = foundStudent || foundTeacher;
    
    // Add a slight delay to simulate API call
    const timer = setTimeout(() => {
      if (foundUser) {
        setUser({
          ...foundUser,
          role: foundStudent ? "student" : "teacher"
        });
      }
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2">Loading user details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold">User not found</h2>
          <p className="text-muted-foreground mb-4">The user you're looking for doesn't exist.</p>
          <Button 
            variant="outline"
            onClick={() => navigate("/admin-dashboard/users")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </div>
      </DashboardLayout>
    );
  }

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
          <h1 className="text-2xl md:text-3xl font-bold">User Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-gray-600">
                    {user.name.split(" ").map((n: string) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-muted-foreground capitalize">{user.role}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Timezone</p>
                    <p>{user.timezone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{user.role === "student" ? "Student Details" : "Teacher Details"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {user.role === "student" ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Education</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <GraduationCap className="h-5 w-5 mr-3 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Grade</p>
                              <p>{user.grade}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <BookOpen className="h-5 w-5 mr-3 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Board/Curriculum</p>
                              <p>{user.board}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Subjects</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.subjects.map((subject: string, index: number) => (
                            <Badge key={index} variant="outline">{subject}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Parent Contact</h4>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Parent Email</p>
                          <p>{user.parentEmail}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Professional Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <GraduationCap className="h-5 w-5 mr-3 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Qualifications</p>
                              <p>{user.qualifications}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Experience</p>
                              <p>{user.experience}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Subjects</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.subjects.map((subject: string, index: number) => (
                            <Badge key={index} variant="outline">{subject}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button 
            variant="outline"
            onClick={() => navigate("/admin-dashboard/users")}
          >
            Back to Users
          </Button>
          <Button 
            onClick={() => navigate(`/admin-dashboard/users/edit/${user.id}`, { 
              state: { userRole: user.role } 
            })}
          >
            Edit User
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
