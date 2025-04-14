
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { students, teachers } from "@/data/mockData";
import { useState } from "react";
import { Search, Mail, Calendar, Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function TeacherStudents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const [availableStudents, setAvailableStudents] = useState([...students]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Get current teacher's assigned students
  const teacherStudents = user?.role === "teacher" 
    ? students.filter(student => student.assignedTeacher === user.id)
    : students;
  
  // Filter students by search term
  const filteredStudents = teacherStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.subjects.join(", ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewStudent = () => {
    if (user?.role === "admin") {
      navigate("/admin-dashboard/add-student");
    } else {
      setDialogOpen(true);
    }
  };

  const handleAssignStudent = () => {
    if (!selectedStudent || !user?.id) {
      toast.error("Please select a student to assign");
      return;
    }

    // Find the student and assign the current teacher
    const studentToAssign = availableStudents.find(s => s.id === selectedStudent);
    
    if (studentToAssign) {
      // Update the student with the teacher ID
      const studentIndex = students.findIndex(s => s.id === selectedStudent);
      if (studentIndex !== -1) {
        students[studentIndex] = {
          ...students[studentIndex],
          assignedTeacher: user.id,
        };
        
        // Remove from available students
        setAvailableStudents(prev => prev.filter(s => s.id !== selectedStudent));
        
        toast.success(`${studentToAssign.name} has been assigned to you`);
        setDialogOpen(false);
        setSelectedStudent("");
      }
    }
  };

  const handleScheduleSession = (studentId: string) => {
    // Store the student ID in session storage for use on the create session page
    sessionStorage.setItem("selectedStudentId", studentId);
    navigate("/teacher-dashboard/sessions/create");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Your Students</h1>
          <Button 
            className="bg-educational-purple hover:bg-educational-purple/90"
            onClick={handleAddNewStudent}
          >
            {user?.role === "admin" ? "Add New Student" : "Assign New Student"}
          </Button>
        </div>
        
        {/* Search and filter */}
        <div className="flex w-full items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search students by name or subject..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Students list */}
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
            <CardDescription>Manage your students and their learning progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <div key={student.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">{student.name}</h3>
                      <p className="text-sm text-gray-500">Grade {student.grade} • {student.subjects.join(", ")}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                      <Button size="sm" variant="outline">
                        <Mail className="mr-2 h-4 w-4" /> Message
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleScheduleSession(student.id)}
                      >
                        <Calendar className="mr-2 h-4 w-4" /> Schedule Session
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-educational-purple hover:bg-educational-purple/90"
                        onClick={() => navigate(`/teacher-dashboard/students/${student.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" /> View Profile
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p>No students match your search criteria</p>
                  {searchTerm && (
                    <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog for assigning students to teacher */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Student</DialogTitle>
            <DialogDescription>
              Select a student to assign to your teaching schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="student" className="text-right">
                Student
              </Label>
              <div className="col-span-3">
                <Select onValueChange={setSelectedStudent} value={selectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStudents
                      .filter(s => !s.assignedTeacher)
                      .map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAssignStudent}>Assign Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
