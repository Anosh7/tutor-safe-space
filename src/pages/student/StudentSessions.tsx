
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SessionCard from "@/components/shared/SessionCard";
import { sessions, teachers } from "@/data/mockData";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { format } from "date-fns";

export default function StudentSessions() {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const currentDate = new Date();
  const upcomingSessions = sessions.filter(session => new Date(session.date) > currentDate && session.status === "scheduled");
  const pastSessions = sessions.filter(session => new Date(session.date) < currentDate || session.status === "completed");

  // Find teacher name by ID
  const getTeacherName = (teacherId: string) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : "Unknown Teacher";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Sessions</h1>
        </div>

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            {upcomingSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingSessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    id={session.id}
                    title={session.title}
                    teacherName={getTeacherName(session.teacherId)}
                    date={session.date}
                    durationMinutes={session.durationMinutes}
                    status={session.status as "scheduled" | "completed" | "cancelled"}
                    meetingLink={session.meetingLink}
                    userRole="student"
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-sm flex flex-col items-center justify-center">
                <p className="text-lg text-gray-500">No upcoming sessions scheduled</p>
                <p className="text-sm text-gray-400 mt-2">Your future sessions will appear here</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            {pastSessions.length > 0 ? (
              <div className="space-y-6">
                {pastSessions.map((session) => (
                  <div key={session.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <div>
                        <h3 className="font-medium">{session.title}</h3>
                        <p className="text-sm text-gray-500">{getTeacherName(session.teacherId)}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {format(new Date(session.date), "MMMM d, yyyy 'at' h:mm a")} • {session.durationMinutes} minutes
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span 
                          className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                            session.status === "completed" 
                              ? "text-green-600 bg-green-50" 
                              : "text-red-600 bg-red-50"
                          }`}
                        >
                          {session.status}
                        </span>
                        
                        {session.feedback && (
                          <div className="mt-2 text-sm">
                            <div className="flex items-center">
                              <span className="text-yellow-400 mr-1">★</span>
                              <span>{session.feedback.rating}</span>
                            </div>
                            <p className="text-gray-600 italic mt-1">"{session.feedback.comment}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-sm flex flex-col items-center justify-center">
                <p className="text-lg text-gray-500">No past sessions</p>
                <p className="text-sm text-gray-400 mt-2">Your completed sessions will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
