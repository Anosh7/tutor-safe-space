
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { students, sessions, homework } from "@/data/mockData";
import { ArrowLeft, Calendar, FileText, Mail } from "lucide-react";
import SessionCard from "@/components/shared/SessionCard";
import { useState } from "react";

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const student = students.find(student => student.id === id);
  
  // Filter sessions for this specific student
  const studentSessions = sessions
    .filter(session => session.studentId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Filter homework for this specific student
  const studentHomework = homework
    .filter(hw => hw.studentId === id)
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
  
  const [activeTab, setActiveTab] = useState<'sessions' | 'homework'>('sessions');

  if (!student) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Card>
            <CardContent className="py-10 text-center">
              <p>Student not found</p>
              <Button 
                onClick={() => navigate('/teacher-dashboard/students')}
                className="mt-4"
              >
                Back to Students
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Students
        </Button>
        
        {/* Student Info */}
        <Card>
          <CardHeader>
            <CardTitle>{student.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Grade</p>
              <p>{student.grade}</p>
            </div>
            <div>
              <p className="font-medium">Subjects</p>
              <p>{student.subjects.join(", ")}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4">
              <Button size="sm" variant="outline">
                <Mail className="mr-2 h-4 w-4" /> Message
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  sessionStorage.setItem("selectedStudentId", student.id);
                  navigate("/teacher-dashboard/sessions/create");
                }}
              >
                <Calendar className="mr-2 h-4 w-4" /> Schedule Session
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Tab Navigation */}
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === 'sessions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('sessions')}
          >
            <Calendar className="mr-2 h-4 w-4" /> Sessions
          </Button>
          <Button 
            variant={activeTab === 'homework' ? 'default' : 'outline'}
            onClick={() => setActiveTab('homework')}
          >
            <FileText className="mr-2 h-4 w-4" /> Homework
          </Button>
        </div>
        
        {/* Sessions Tab Content */}
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Sessions with {student.name}</h2>
              <Button 
                className="bg-educational-purple hover:bg-educational-purple/90"
                onClick={() => {
                  sessionStorage.setItem("selectedStudentId", student.id);
                  navigate("/teacher-dashboard/sessions/create");
                }}
              >
                Schedule New
              </Button>
            </div>
            
            {studentSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studentSessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    id={session.id}
                    title={session.title}
                    studentName={student.name}
                    date={session.date}
                    durationMinutes={session.durationMinutes}
                    status={session.status as "scheduled" | "completed" | "cancelled"}
                    meetingLink={session.meetingLink}
                    userRole="teacher"
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p>No sessions scheduled with this student yet</p>
                  <Button 
                    onClick={() => {
                      sessionStorage.setItem("selectedStudentId", student.id);
                      navigate("/teacher-dashboard/sessions/create");
                    }}
                    className="mt-4"
                  >
                    Schedule Your First Session
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
        
        {/* Homework Tab Content */}
        {activeTab === 'homework' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Homework for {student.name}</h2>
              <Button 
                className="bg-educational-purple hover:bg-educational-purple/90"
                onClick={() => navigate("/teacher-dashboard/homework/create")}
              >
                Assign New
              </Button>
            </div>
            
            {studentHomework.length > 0 ? (
              <Card>
                <CardContent className="divide-y">
                  {studentHomework.map(hw => (
                    <div key={hw.id} className="py-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{hw.title}</p>
                        <p className="text-sm text-gray-500">
                          Due: {new Date(hw.dueDate).toLocaleDateString()} • 
                          Status: <span className="capitalize">{hw.status}</span>
                        </p>
                      </div>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p>No homework assigned to this student yet</p>
                  <Button 
                    onClick={() => navigate("/teacher-dashboard/homework/create")}
                    className="mt-4"
                  >
                    Assign Your First Homework
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
