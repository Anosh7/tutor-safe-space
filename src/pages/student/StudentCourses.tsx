
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CourseCard from "@/components/shared/CourseCard";
import { courses } from "@/data/mockData";
import { Search, Filter } from "lucide-react";
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

export default function StudentCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all-subjects");
  const [gradeFilter, setGradeFilter] = useState<string>("all-grades");
  
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
    toast.success(`Enrollment request sent for course`);
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
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                subjects={course.subjects}
                grades={course.grades}
                image={course.image}
                price={course.price}
                duration={course.duration}
                enrolledCount={course.enrolledCount}
              />
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
