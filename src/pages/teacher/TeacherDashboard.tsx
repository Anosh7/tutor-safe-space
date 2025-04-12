
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { sessions, homework, students } from "@/data/mockData";
import SessionCard from "@/components/shared/SessionCard";
import { Calendar, Users, FileText, CreditCard, Plus } from "lucide-react";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Filter sessions for the current teacher
  const upcomingSessions = sessions
    .filter(session => session.teacherId === "teacher1" && session.status === "scheduled" && new Date(session.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
    
  const activeHomework = homework
    .filter(hw => hw.status === "assigned")
    .slice(0, 2);
    
  // Mock earnings data
  const monthlyEarnings = 3200;
  const pendingEarnings = 800;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome, {user?.name}</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingSessions.length}</div>
              <p className="text-xs text-muted-foreground">Next session in {upcomingSessions.length > 0 ? 
                Math.ceil((new Date(upcomingSessions[0].date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : "N/A"} days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Assigned Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">Across 2 subjects</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${monthlyEarnings}</div>
              <p className="text-xs text-muted-foreground">${pendingEarnings} pending</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Homework Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Submitted 2 days ago</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Sessions */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <Calendar className="h-5 w-5 mr-2" /> Upcoming Sessions
            </h2>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/teacher-dashboard/sessions")}
              >
                View All
              </Button>
              <Button 
                size="sm"
                className="bg-educational-purple hover:bg-educational-purple/90"
                onClick={() => navigate("/teacher-dashboard/sessions/create")}
              >
                <Plus className="h-4 w-4 mr-2" /> Schedule New
              </Button>
            </div>
          </div>
          
          {upcomingSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  id={session.id}
                  title={session.title}
                  studentName="Alex Johnson"
                  date={session.date}
                  durationMinutes={session.durationMinutes}
                  status={session.status}
                  meetingLink={session.meetingLink}
                  userRole="teacher"
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-gray-500">
                  <p>No upcoming sessions scheduled</p>
                  <Button 
                    variant="link" 
                    className="mt-2 text-educational-purple"
                    onClick={() => navigate("/teacher-dashboard/sessions/create")}
                  >
                    Schedule a new session
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Students */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <Users className="h-5 w-5 mr-2" /> Your Students
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/teacher-dashboard/students")}
            >
              View All
            </Button>
          </div>
          
          <Card>
            <CardContent className="py-4 divide-y">
              {students.map(student => (
                <div key={student.id} className="py-4 first:pt-2 last:pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">Grade {student.grade} • {student.subjects.join(", ")}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/teacher-dashboard/students/${student.id}`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-educational-purple hover:bg-educational-purple/90"
                        onClick={() => navigate("/teacher-dashboard/sessions/create")}
                      >
                        Schedule Session
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Homework Management */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <FileText className="h-5 w-5 mr-2" /> Homework Management
            </h2>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/teacher-dashboard/homework")}
              >
                View All
              </Button>
              <Button 
                size="sm"
                className="bg-educational-purple hover:bg-educational-purple/90"
                onClick={() => navigate("/teacher-dashboard/homework/create")}
              >
                <Plus className="h-4 w-4 mr-2" /> Assign New
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recently Assigned</CardTitle>
                <CardDescription>Homework pending student submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeHomework.map(hw => (
                  <div key={hw.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{hw.title}</p>
                      <p className="text-sm text-gray-500">Due: {new Date(hw.dueDate).toLocaleDateString()}</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Submitted Homework</CardTitle>
                <CardDescription>Pending your review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Linear Algebra Worksheet</p>
                    <p className="text-sm text-gray-500">Submitted by Alex Johnson on {new Date().toLocaleDateString()}</p>
                  </div>
                  <Button size="sm" className="bg-educational-purple hover:bg-educational-purple/90">Review</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Earnings Overview */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <CreditCard className="h-5 w-5 mr-2" /> Earnings Overview
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/teacher-dashboard/earnings")}
            >
              Full Details
            </Button>
          </div>
          
          <Card>
            <CardContent className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-1">This Month</h4>
                  <p className="text-2xl font-bold text-educational-purple">${monthlyEarnings}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-1">Pending</h4>
                  <p className="text-2xl font-bold text-educational-teal">${pendingEarnings}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-1">Total Year</h4>
                  <p className="text-2xl font-bold text-educational-orange">${monthlyEarnings * 4}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
