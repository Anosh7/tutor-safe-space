
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { PlusCircle, Search, Edit, Eye, Trash } from "lucide-react";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";

// Course type definition
interface Course {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjects?: string[];
  grade?: string;
  price: number;
  teacherId?: string;
  teacher_id?: string;
  image_url?: string;
  status?: string;
  created_at?: string;
  enrollmentCount?: number;
}

// Teacher profile type
interface Teacher {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminCourses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch courses and teachers from database
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch courses
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*');
        
        if (coursesError) throw coursesError;
        
        // Fetch teacher profiles
        const { data: teachersData, error: teachersError } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'teacher');
        
        if (teachersError) throw teachersError;
        
        // Process courses data to match expected format
        const processedCourses = coursesData?.map(course => ({
          ...course,
          subjects: course.subject?.split(',') || []
        })) || [];
        
        // Fetch enrollment counts for each course
        const coursesWithEnrollments = await Promise.all(processedCourses.map(async (course) => {
          const { count, error } = await supabase
            .from('enrollments')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', course.id);
          
          return {
            ...course,
            enrollmentCount: error ? 0 : count || 0
          };
        }));
        
        setCourses(coursesWithEnrollments);
        setTeachers(teachersData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Failed to load courses");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredCourses = courses.filter(course => 
    course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.subjects?.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getTeacherName = (teacherId?: string) => {
    if (!teacherId) return "Unassigned";
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : "Unknown";
  };

  const handleView = (courseId: string) => {
    navigate(`/admin-dashboard/courses/${courseId}`);
  };

  const handleEdit = (courseId: string) => {
    navigate(`/admin-dashboard/courses/edit/${courseId}`);
  };

  const confirmDelete = (courseId: string) => {
    setCourseToDelete(courseId);
  };

  const handleDelete = async () => {
    if (!courseToDelete) return;
    
    try {
      // Delete from database
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseToDelete);
      
      if (error) throw error;
      
      // Remove from local state
      setCourses(courses.filter(course => course.id !== courseToDelete));
      toast.success("Course deleted successfully");
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error("Failed to delete course");
    } finally {
      setCourseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setCourseToDelete(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Course Management</h1>
          <Button 
            className="mt-4 md:mt-0 bg-educational-purple hover:bg-educational-purple/90"
            onClick={() => navigate("/admin-dashboard/courses/create")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <CardTitle>All Courses</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-educational-purple border-t-transparent"></div>
                <p className="ml-2 text-sm text-muted-foreground">Loading courses...</p>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No courses found. Click "Create Course" to add a new course.
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No courses match your search query.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{getTeacherName(course.teacher_id || course.teacherId)}</TableCell>
                      <TableCell>{course.subjects?.join(", ") || course.subject}</TableCell>
                      <TableCell>${course.price}</TableCell>
                      <TableCell>
                        {course.enrollmentCount}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleView(course.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(course.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => confirmDelete(course.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!courseToDelete} onOpenChange={() => setCourseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the course
              and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
