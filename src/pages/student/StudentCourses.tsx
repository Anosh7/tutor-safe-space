
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { courses, students } from "@/data/mockData";
import { Search, Filter, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function StudentCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all-subjects");
  const [gradeFilter, setGradeFilter] = useState<string>("all-grades");
  
  const studentId = "student1"; // In a real app, this would come from auth context
  const currentStudent = students.find(s => s.id === studentId);
  const enrolledCourseIds = currentStudent?.enrolledCourses || [];
  
  // Extract unique subjects and grades for filters
  const uniqueSubjects = Array.from(new Set(courses.flatMap(course => course.subjects)));
  const uniqueGrades = Array.from(new Set(courses.flatMap(course => course.grades))).sort();

  // Filter courses based on search term and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = subjectFilter === "all-subjects" || course.subjects.some(s => s === subjectFilter);
    const matchesGrade = gradeFilter === "all-grades" || course.grades.some(g => g === gradeFilter);
    
    return matchesSearch && matchesSubject && matchesGrade;
  });

  const handleEnroll = (courseId: string) => {
    if (enrolledCourseIds.includes(courseId)) {
      toast.info("You are already enrolled in this course");
      return;
    }
    
    // In a real app, this would call an API to enroll the student
    toast.success(`Enrollment request sent for course`);
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourseIds.includes(courseId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Available Courses</h1>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Subject" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-subjects">All Subjects</SelectItem>
                  {uniqueSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Grade" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-grades">All Grades</SelectItem>
                  {uniqueGrades.map((grade) => (
                    <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover" 
                  />
                  {isEnrolled(course.id) && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <Check className="w-3 h-3 mr-1" /> Enrolled
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>
                    {course.subjects.join(", ")} • Grade {course.grades.join(", ")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">${course.price}</p>
                    <p className="text-xs text-gray-500">{course.duration}</p>
                  </div>
                  <Button 
                    onClick={() => handleEnroll(course.id)}
                    variant={isEnrolled(course.id) ? "outline" : "default"}
                    className={isEnrolled(course.id) ? "border-green-500 text-green-500 hover:bg-green-50" : "bg-educational-purple hover:bg-educational-purple/90"}
                  >
                    {isEnrolled(course.id) ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> 
                        Already Enrolled
                      </>
                    ) : (
                      'Enroll Now'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg shadow-sm flex flex-col items-center justify-center">
            <p className="text-lg text-gray-500">No courses match your search criteria</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSubjectFilter("all-subjects");
              setGradeFilter("all-grades");
            }} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
