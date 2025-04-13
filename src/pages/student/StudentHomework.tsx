
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { homework, sessions } from "@/data/mockData";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Download, Upload, Clock, Calendar, Check, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Define a type for the homework to help TypeScript
type HomeworkItem = {
  id: string;
  sessionId: string;
  studentId: string;
  title: string;
  description: string;
  assignedDate: Date;
  dueDate: Date;
  fileUrl: string;
  status: string;
  submissionDate?: Date;
  submissionFileUrl?: string;
};

export default function StudentHomework() {
  const [activeTab, setActiveTab] = useState("pending");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [homeworkData, setHomeworkData] = useState<HomeworkItem[]>([...homework as HomeworkItem[]]);
  const { user } = useAuth();
  
  // Effect to refresh homework data when the component mounts
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we're just using the imported homework data
    setHomeworkData([...homework as HomeworkItem[]]);
  }, []);
  
  // Get sessions associated with the current student
  const studentId = user?.id || "student1"; // Fallback to student1 for demo
  const studentSessions = sessions.filter(session => session.studentId === studentId);
  const studentSessionIds = studentSessions.map(session => session.id);
  
  // Filter homework for this student by matching sessionIds
  const pendingHomework = homeworkData.filter(hw => {
    return hw.status === "assigned" && studentSessionIds.includes(hw.sessionId);
  });
  
  const submittedHomework = homeworkData.filter(hw => {
    return hw.status === "submitted" && studentSessionIds.includes(hw.sessionId);
  });
  
  // Function to get session title by homework's sessionId
  const getSessionTitle = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    return session ? session.title : "Unknown Session";
  };
  
  // Simulate file upload
  const handleFileUpload = (homeworkId: string) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Update homework status to submitted
          const updatedHomework = homeworkData.map(hw => 
            hw.id === homeworkId 
              ? {
                  ...hw, 
                  status: "submitted", 
                  submissionDate: new Date(),
                  submissionFileUrl: "/placeholder.svg" // Add this to fix the type error
                } 
              : hw
          );
          
          setHomeworkData(updatedHomework);
          
          // In a real app, we would send this to the API
          // For the demo, update the reference to the mock data
          const hwIndex = homework.findIndex(hw => hw.id === homeworkId);
          if (hwIndex !== -1) {
            const updatedHw = {
              ...homework[hwIndex],
              status: "submitted",
              submissionDate: new Date(),
              submissionFileUrl: "/placeholder.svg"
            };
            homework[hwIndex] = updatedHw;
          }
          
          toast.success("Homework submitted successfully!");
          setActiveTab("submitted");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Homework</h1>
        </div>

        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-6">
            {pendingHomework.length > 0 ? (
              <div className="space-y-4">
                {pendingHomework.map((hw) => (
                  <Card key={hw.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{hw.title}</CardTitle>
                          <CardDescription>{getSessionTitle(hw.sessionId)}</CardDescription>
                        </div>
                        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Due soon</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{hw.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Assigned: {format(new Date(hw.assignedDate), "MMM d, yyyy")}</span>
                        </div>
                        <div className="hidden sm:block text-gray-300">•</div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Due: {format(new Date(hw.dueDate), "MMM d, yyyy")}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-3">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Submit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit Homework</DialogTitle>
                            <DialogDescription>
                              Upload your completed homework for {hw.title}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="grid gap-4 py-4">
                            {!isUploading ? (
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <label htmlFor="homework-file" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  Upload file (PDF, Word, or image)
                                </label>
                                <input
                                  id="homework-file"
                                  type="file"
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
                                />
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Uploading...</span>
                                  <span>{uploadProgress}%</span>
                                </div>
                                <Progress value={uploadProgress} className="h-2" />
                              </div>
                            )}
                          </div>
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsUploading(false)} disabled={isUploading}>
                              Cancel
                            </Button>
                            <Button onClick={() => handleFileUpload(hw.id)} disabled={isUploading}>
                              {isUploading ? "Uploading..." : "Upload"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <Check className="h-12 w-12 text-green-500 mb-4" />
                <p className="text-lg text-gray-500">No pending homework</p>
                <p className="text-sm text-gray-400 mt-2">You're all caught up!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="submitted" className="mt-6">
            {submittedHomework.length > 0 ? (
              <div className="space-y-4">
                {submittedHomework.map((hw) => (
                  <Card key={hw.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{hw.title}</CardTitle>
                          <CardDescription>{getSessionTitle(hw.sessionId)}</CardDescription>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Submitted</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{hw.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Due: {format(new Date(hw.dueDate), "MMM d, yyyy")}</span>
                        </div>
                        <div className="hidden sm:block text-gray-300">•</div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          <span>Submitted: {hw.submissionDate ? format(new Date(hw.submissionDate), "MMM d, yyyy") : "Unknown"}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-3">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Assignment
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        My Submission
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg text-gray-500">No submitted homework</p>
                <p className="text-sm text-gray-400 mt-2">Once you submit assignments, they'll appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
