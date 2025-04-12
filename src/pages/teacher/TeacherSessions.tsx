
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Plus, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SessionCard from "@/components/shared/SessionCard";
import { sessions, students } from "@/data/mockData";
import { useState } from "react";

export default function TeacherSessions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter sessions for the current teacher
  const teacherSessions = sessions.filter(session => session.teacherId === "teacher1");
  
  // Apply filters
  const filteredSessions = teacherSessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || session.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort sessions by date (newest first)
  const sortedSessions = [...filteredSessions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Your Sessions</h1>
          <Button 
            className="bg-educational-purple hover:bg-educational-purple/90"
            onClick={() => navigate("/teacher-dashboard/sessions/create")}
          >
            <Plus className="mr-2 h-4 w-4" /> Schedule New Session
          </Button>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search sessions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sessions</SelectItem>
              <SelectItem value="scheduled">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Calendar view button */}
        <div className="flex justify-end">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar View
          </Button>
        </div>
        
        {/* Sessions list */}
        {sortedSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedSessions.map((session) => {
              const student = students.find(s => s.id === session.studentId);
              return (
                <SessionCard
                  key={session.id}
                  id={session.id}
                  title={session.title}
                  studentName={student?.name || "Student"}
                  date={session.date}
                  durationMinutes={session.durationMinutes}
                  status={session.status as "scheduled" | "completed" | "cancelled"}
                  meetingLink={session.meetingLink}
                  userRole="teacher"
                />
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8">
              <div className="text-center text-gray-500">
                <p>No sessions match your search criteria</p>
                {(searchTerm || statusFilter !== "all") && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                    }} 
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
