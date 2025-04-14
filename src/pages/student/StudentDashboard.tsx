
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { sessions, homework, billing, teachers, courses } from "@/data/mockData";
import SessionCard from "@/components/shared/SessionCard";
import { Calendar, FileText, CreditCard, BookOpen, User } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Filter sessions for the current user
  const upcomingSessions = sessions
    .filter(session => session.studentId === "student1" && session.status === "scheduled" && new Date(session.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
    
  const activeHomework = homework
    .filter(hw => hw.status === "assigned")
    .slice(0, 2);
    
  const pendingBills = billing
    .filter(bill => bill.status === "pending");
    
  // Find assigned teacher for this student
  const studentId = "student1"; // In a real app, this would be the current user's ID
  const assignedTeacherId = "teacher1"; // This would come from the student's data
  const assignedTeacher = teachers.find(teacher => teacher.id === assignedTeacherId);
  
  // Get enrolled courses
  const studentData = { enrolledCourses: ["course1", "course2"] }; // This would be the actual student data
  const enrolledCourses = courses.filter(course => 
    studentData.enrolledCourses && studentData.enrolledCourses.includes(course.id)
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome, {user?.name}</h1>
        
        {/* Assigned Teacher */}
        {assignedTeacher && (
          <Card className="bg-educational-purple/5 border-educational-purple/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-educational-purple/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-educational-purple" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Your Teacher</h3>
                  <p className="text-sm">{assignedTeacher.name} • {assignedTeacher.subjects.join(", ")}</p>
                </div>
                <div className="ml-auto">
                  <Button 
                    variant="outline" 
                    className="border-educational-purple text-educational-purple hover:bg-educational-purple/10"
                    onClick={() => navigate("/student-dashboard/teachers")}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Homework</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeHomework.length}</div>
              <p className="text-xs text-muted-foreground">{activeHomework.length > 0 ? 
                `Due in ${Math.ceil((new Date(activeHomework[0].dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days` : "All completed"}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pendingBills.reduce((sum, bill) => sum + bill.amount, 0)}</div>
              <p className="text-xs text-muted-foreground">{pendingBills.length} bills pending payment</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              <p className="text-xs text-muted-foreground">{enrolledCourses.map(c => c.subjects[0]).join(", ")}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Sessions */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <Calendar className="h-5 w-5 mr-2" /> Upcoming Sessions
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/student-dashboard/sessions")}
            >
              View All
            </Button>
          </div>
          
          {upcomingSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  id={session.id}
                  title={session.title}
                  teacherName="Prof. Sarah Miller"
                  date={session.date}
                  durationMinutes={session.durationMinutes}
                  status={session.status as "scheduled" | "completed" | "cancelled"}
                  meetingLink={session.meetingLink}
                  userRole="student"
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
                    onClick={() => navigate("/student-dashboard/courses")}
                  >
                    Browse courses to enroll
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Enrolled Courses */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <BookOpen className="h-5 w-5 mr-2" /> Your Courses
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/student-dashboard/courses")}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.subjects.join(", ")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between">
                      <div className="text-sm">
                        <span className="font-medium">Teacher:</span> {getTeacherName(course.teacherId)}
                      </div>
                      <Button size="sm" variant="outline">View Course</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="md:col-span-2">
                <CardContent className="py-8">
                  <div className="text-center text-gray-500">
                    <p>You are not enrolled in any courses yet</p>
                    <Button 
                      variant="link" 
                      className="mt-2 text-educational-purple"
                      onClick={() => navigate("/student-dashboard/courses")}
                    >
                      Browse available courses
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Recent Homework */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <FileText className="h-5 w-5 mr-2" /> Recent Homework
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/student-dashboard/homework")}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeHomework.length > 0 ? (
              activeHomework.map((hw) => (
                <Card key={hw.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{hw.title}</CardTitle>
                    <CardDescription>Due: {new Date(hw.dueDate).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{hw.description}</p>
                    <div className="flex justify-between">
                      <Button size="sm">View Assignment</Button>
                      <Button size="sm" variant="outline">Submit Work</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="md:col-span-2">
                <CardContent className="py-8">
                  <div className="text-center text-gray-500">
                    <p>No pending homework assignments</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Payment Reminders */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <CreditCard className="h-5 w-5 mr-2" /> Payment Reminders
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/student-dashboard/payments")}
            >
              View All
            </Button>
          </div>
          
          {pendingBills.length > 0 ? (
            <Card>
              <CardContent className="divide-y">
                {pendingBills.map((bill) => (
                  <div key={bill.id} className="py-4 first:pt-6 last:pb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{bill.month} Tuition</p>
                        <p className="text-sm text-gray-500">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${bill.amount}</p>
                        <Button size="sm" className="mt-2 bg-educational-purple hover:bg-educational-purple/90">Pay Now</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-gray-500">
                  <p>No pending payments</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Explore Courses */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <BookOpen className="h-5 w-5 mr-2" /> Explore More Courses
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/courses")}
            >
              Browse All
            </Button>
          </div>
          
          <Card>
            <CardContent className="py-6">
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Expand your knowledge with more subjects and tutors
                </p>
                <Button 
                  onClick={() => navigate("/courses")} 
                  className="bg-educational-purple hover:bg-educational-purple/90"
                >
                  Discover New Courses
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
  
  // Helper function to get teacher name
  function getTeacherName(teacherId?: string): string {
    if (!teacherId) return "Unassigned";
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : "Unknown Teacher";
  }
}
