
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Calendar } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { students, sessions } from "@/data/mockData";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  sessionId: z.string({ required_error: "Please select a session" }),
  dueDate: z.string().min(1, { message: "Please select a due date" }),
});

export default function CreateHomework() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  
  // Check if a student ID was set from previous navigation
  useEffect(() => {
    const savedStudentId = sessionStorage.getItem("selectedStudentId");
    if (savedStudentId) {
      setSelectedStudentId(savedStudentId);
      // Clear the storage after retrieving
      sessionStorage.removeItem("selectedStudentId");
    }
  }, []);

  // Get student sessions for dropdown
  const studentSessions = sessions
    .filter(session => !selectedStudentId || session.studentId === selectedStudentId)
    .filter(session => session.status !== "cancelled")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      sessionId: "",
      dueDate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, we would submit to an API
    console.log("Form submitted:", values);
    
    // Show success toast
    toast({
      title: "Homework assigned",
      description: "The homework has been successfully assigned.",
    });
    
    // Redirect back to homework page
    navigate("/teacher-dashboard/homework");
  };

  // Get student name for display
  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : "Unknown Student";
  };

  // Format session option for display
  const formatSessionOption = (session) => {
    const date = new Date(session.date).toLocaleDateString();
    return `${session.title} (${date})`;
  };

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
          <CardHeader>
            <CardTitle>Assign New Homework</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedStudentId && (
              <div className="mb-6 p-4 bg-muted/50 rounded-md">
                <p className="font-medium">Assigning to: {getStudentName(selectedStudentId)}</p>
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Homework Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter homework title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter homework instructions and details" 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sessionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Session</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          {...field}
                        >
                          <option value="">Select a session</option>
                          {studentSessions.map((session) => (
                            <option key={session.id} value={session.id}>
                              {formatSessionOption(session)}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormDescription>
                        Select which session this homework is related to
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                          <Input 
                            type="date" 
                            className="pl-10"
                            min={new Date().toISOString().split('T')[0]}
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="mt-4 pt-4 border-t flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-educational-purple hover:bg-educational-purple/90"
                  >
                    Assign Homework
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
