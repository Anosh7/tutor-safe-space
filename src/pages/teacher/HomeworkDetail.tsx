
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Download, User, FileText, Clock, Check } from "lucide-react";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { homework, students, sessions } from "@/data/mockData";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomeworkDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [homeworkData, setHomeworkData] = useState<any>(null);
  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState(""); 

  useEffect(() => {
    const hw = homework.find(h => h.id === id);
    if (hw) {
      setHomeworkData(hw);
    }
  }, [id]);

  if (!homeworkData) {
    return (
      <DashboardLayout>
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
        <Card className="mt-6">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-xl font-medium">Homework not found</p>
            <Button 
              className="mt-4"
              onClick={() => navigate("/teacher-dashboard/homework")}
            >
              Return to Homework List
            </Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const student = students.find(s => s.id === homeworkData.studentId);
  const session = sessions.find(s => s.id === homeworkData.sessionId);

  const handleMarkComplete = () => {
    // In a real app, we would send this to an API
    // For this demo, we'll update the local state and mock data
    const updatedHomework = {
      ...homeworkData,
      status: "completed",
      grade: grade || "A",
      feedback: feedback || "Great work!"
    };

    setHomeworkData(updatedHomework);

    // Update the mock data
    const hwIndex = homework.findIndex(hw => hw.id === id);
    if (hwIndex !== -1) {
      homework[hwIndex] = updatedHomework;
    }

    toast.success("Homework marked as complete!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "assigned":
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Assigned</Badge>;
      case "submitted":
        return <Badge className="bg-yellow-500">Submitted</Badge>;
      case "completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {getStatusBadge(homeworkData.status)}
        </div>

        <div>
          <h1 className="text-2xl font-bold">{homeworkData.title}</h1>
          {session && (
            <p className="text-gray-500">From: {session.title}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="whitespace-pre-wrap">{homeworkData.description}</p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="text-sm">Assigned: {format(new Date(homeworkData.assignedDate), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="text-sm">Due: {format(new Date(homeworkData.dueDate), "MMM d, yyyy")}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="mt-2" size="sm">
                    <Download className="mr-2 h-4 w-4" /> Download Assignment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {homeworkData.status === "submitted" && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Teacher Review</CardTitle>
                  <CardDescription>Provide feedback and grade for this submission</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Feedback</label>
                    <Textarea
                      placeholder="Provide feedback on the submission..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Grade</label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                    >
                      <option value="">Select grade</option>
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                    </select>
                  </div>
                  
                  <Button 
                    onClick={handleMarkComplete}
                    className="bg-educational-purple hover:bg-educational-purple/90 w-full mt-4"
                  >
                    <Check className="mr-2 h-4 w-4" /> Mark as Complete
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {homeworkData.status === "completed" && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Teacher Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Feedback</h3>
                    <p>{homeworkData.feedback || "No feedback provided"}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Grade</h3>
                    <p className="text-xl font-bold">{homeworkData.grade || "Not graded"}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent>
                {student ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-6 w-6 mr-2 text-gray-500" />
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-gray-500 text-sm">{student.email}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm font-medium">Grade Level</p>
                      <p>{student.grade}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Subjects</p>
                      <p>{student.subjects.join(", ")}</p>
                    </div>
                  </div>
                ) : (
                  <p>Student information not available</p>
                )}
                
                <div className="pt-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/teacher-dashboard/students/${homeworkData.studentId}`)}>
                    View Student Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {homeworkData.status === "submitted" && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Submission</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Submitted on</p>
                    <p>{homeworkData.submissionDate ? format(new Date(homeworkData.submissionDate), "MMM d, yyyy") : "Unknown"}</p>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    <Download className="mr-2 h-4 w-4" /> Download Submission
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
