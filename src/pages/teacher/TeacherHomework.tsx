
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, Check, Clock } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { homework, students } from "@/data/mockData";
import { useState, useEffect } from "react";

export default function TeacherHomework() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [homeworkData, setHomeworkData] = useState([...homework]);
  
  // Effect to refresh homework data when the component mounts
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we're just using the imported homework data
    setHomeworkData([...homework]);
  }, []);
  
  // Filter homework assignments
  const assignedHomework = homeworkData.filter(hw => hw.status === "assigned");
  const submittedHomework = homeworkData.filter(hw => hw.status === "submitted");
  const completedHomework = homeworkData.filter(hw => hw.status === "completed");
  
  const filterHomeworkBySearch = (homeworkList) => {
    return homeworkList.filter(hw => 
      hw.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const filteredAssigned = filterHomeworkBySearch(assignedHomework);
  const filteredSubmitted = filterHomeworkBySearch(submittedHomework);
  const filteredCompleted = filterHomeworkBySearch(completedHomework);

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : "Unknown Student";
  };

  const formatDueDate = (date) => {
    const dueDate = new Date(date);
    return dueDate.toLocaleDateString();
  };

  const HomeworkList = ({ homeworkList, emptyMessage }) => (
    <div className="divide-y">
      {homeworkList.length > 0 ? (
        homeworkList.map((hw) => (
          <div key={hw.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">{hw.title}</h3>
              <p className="text-sm text-gray-500">
                Assigned to: {getStudentName(hw.studentId)} • 
                Due: {formatDueDate(hw.dueDate)}
              </p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button 
                size="sm" 
                className="bg-educational-purple hover:bg-educational-purple/90"
                onClick={() => navigate(`/teacher-dashboard/homework/${hw.id}`)}
              >
                {hw.status === "submitted" ? "Review" : "View"}
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="py-8 text-center text-gray-500">
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Homework Management</h1>
          <Button 
            className="bg-educational-purple hover:bg-educational-purple/90"
            onClick={() => navigate("/teacher-dashboard/homework/create")}
          >
            <Plus className="mr-2 h-4 w-4" /> Assign New Homework
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search homework assignments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Homework tabs */}
        <Tabs defaultValue="assigned" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assigned" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Assigned 
              <span className="ml-1 bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                {assignedHomework.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="submitted" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Submitted 
              <span className="ml-1 bg-educational-purple bg-opacity-20 text-educational-purple rounded-full px-2 py-0.5 text-xs">
                {submittedHomework.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <Check className="h-4 w-4" /> Completed 
              <span className="ml-1 bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                {completedHomework.length}
              </span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="assigned">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Homework</CardTitle>
              </CardHeader>
              <CardContent>
                <HomeworkList 
                  homeworkList={filteredAssigned} 
                  emptyMessage="No assigned homework"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="submitted">
            <Card>
              <CardHeader>
                <CardTitle>Submitted for Review</CardTitle>
              </CardHeader>
              <CardContent>
                <HomeworkList 
                  homeworkList={filteredSubmitted} 
                  emptyMessage="No homework awaiting review"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Homework</CardTitle>
              </CardHeader>
              <CardContent>
                <HomeworkList 
                  homeworkList={filteredCompleted} 
                  emptyMessage="No completed homework"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
