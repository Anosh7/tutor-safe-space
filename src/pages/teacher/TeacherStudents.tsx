
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { students } from "@/data/mockData";
import { useState } from "react";
import { Search, Plus, Mail, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TeacherStudents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter students by search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.subjects.join(", ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Your Students</h1>
          <Button className="bg-educational-purple hover:bg-educational-purple/90">
            <Plus className="mr-2 h-4 w-4" /> Add New Student
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
                        onClick={() => navigate(`/teacher-dashboard/sessions/create`)}
                      >
                        <Calendar className="mr-2 h-4 w-4" /> Schedule Session
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-educational-purple hover:bg-educational-purple/90"
                        onClick={() => navigate(`/teacher-dashboard/students/${student.id}`)}
                      >
                        View Profile
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
    </DashboardLayout>
  );
}
