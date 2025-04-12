
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface SessionCardProps {
  id: string;
  title: string;
  teacherName?: string;
  studentName?: string;
  date: Date;
  durationMinutes: number;
  status: "scheduled" | "completed" | "cancelled";
  meetingLink: string;
  userRole: "student" | "teacher" | "admin";
}

export default function SessionCard({
  id,
  title,
  teacherName,
  studentName,
  date,
  durationMinutes,
  status,
  meetingLink,
  userRole,
}: SessionCardProps) {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  const isPast = new Date() > date;
  const statusColor = 
    status === "scheduled" ? "text-blue-600 bg-blue-50" : 
    status === "completed" ? "text-green-600 bg-green-50" : 
    "text-red-600 bg-red-50";

  const joinSession = () => {
    window.open(meetingLink, "_blank");
  };

  const submitFeedback = () => {
    // In a real app, this would submit feedback to an API
    console.log("Feedback submitted:", { sessionId: id, rating, feedback });
    // You would show a success message and close the dialog
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusColor}`}>
            {status}
          </span>
        </div>
        {teacherName && (
          <p className="text-sm text-gray-600">Teacher: {teacherName}</p>
        )}
        {studentName && (
          <p className="text-sm text-gray-600">Student: {studentName}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          {format(date, "PPP")}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Clock className="h-4 w-4 mr-2" />
          {format(date, "p")} ({durationMinutes} minutes)
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {status === "scheduled" && !isPast && (
          <Button 
            className="w-full bg-educational-purple hover:bg-educational-purple/90"
            onClick={joinSession}
          >
            <Video className="h-4 w-4 mr-2" /> Join Session
          </Button>
        )}

        {status === "completed" && userRole === "student" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">Give Feedback</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Session Feedback</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl ${
                          star <= rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="feedback">Comments</Label>
                  <textarea
                    id="feedback"
                    className="min-h-[120px] w-full border rounded-md p-2"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your experience with this session"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  className="bg-educational-purple hover:bg-educational-purple/90"
                  onClick={submitFeedback}
                >
                  Submit Feedback
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        {status === "completed" && userRole !== "student" && (
          <Button variant="outline" className="w-full" disabled>
            Session Completed
          </Button>
        )}
        
        {isPast && status === "scheduled" && (
          <Button variant="outline" className="w-full" disabled>
            Session Missed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
