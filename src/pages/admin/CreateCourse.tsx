
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import { courses, students, teachers, Student, Teacher } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Subject options
const subjectOptions = [
  { id: "mathematics", label: "Mathematics" },
  { id: "physics", label: "Physics" },
  { id: "chemistry", label: "Chemistry" },
  { id: "biology", label: "Biology" },
  { id: "english", label: "English" },
  { id: "computer-science", label: "Computer Science" },
];

// Grade options
const gradeOptions = [
  { id: "8", label: "Grade 8" },
  { id: "9", label: "Grade 9" },
  { id: "10", label: "Grade 10" },
  { id: "11", label: "Grade 11" },
  { id: "12", label: "Grade 12" },
];

export default function CreateCourse() {
  const navigate = useNavigate();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const toggleGrade = (grade: string) => {
    setSelectedGrades(prev =>
      prev.includes(grade)
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (selectedSubjects.length === 0) {
      toast.error("Please select at least one subject");
      setIsSubmitting(false);
      return;
    }

    if (selectedGrades.length === 0) {
      toast.error("Please select at least one grade level");
      setIsSubmitting(false);
      return;
    }

    if (!selectedTeacher) {
      toast.error("Please select a teacher for this course");
      setIsSubmitting(false);
      return;
    }
    
    // Generate a new course object
    const newCourse = {
      id: `course${courses.length + 1}`,
      title: formData.title,
      description: formData.description,
      subjects: selectedSubjects,
      grades: selectedGrades,
      image: "/placeholder.svg",
      price: parseFloat(formData.price) || 0,
      duration: formData.duration,
      enrolledCount: 0,
      teacherId: selectedTeacher,
      assignedStudents: selectedStudents
    };
    
    // Add new course to the courses array
    courses.push(newCourse);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("New course has been created successfully");
      setIsSubmitting(false);
      navigate("/admin-dashboard/courses");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/admin-dashboard/courses")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Create New Course</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the core details of the course
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  required 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  placeholder="e.g., Advanced Mathematics"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  required 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  placeholder="Describe what students will learn in this course"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price" 
                    name="price" 
                    type="number"
                    required 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    placeholder="299"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input 
                    id="duration" 
                    name="duration" 
                    required 
                    value={formData.duration} 
                    onChange={handleInputChange} 
                    placeholder="e.g., 3 months"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
              <CardDescription>
                Define subjects and grade levels for this course
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="block mb-2">Subjects</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {subjectOptions.map((subject) => (
                    <div key={subject.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={subject.id} 
                        checked={selectedSubjects.includes(subject.id)}
                        onCheckedChange={() => toggleSubject(subject.id)}
                      />
                      <Label htmlFor={subject.id} className="cursor-pointer">{subject.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="block mb-2">Grade Levels</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {gradeOptions.map((grade) => (
                    <div key={grade.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={grade.id} 
                        checked={selectedGrades.includes(grade.id)}
                        onCheckedChange={() => toggleGrade(grade.id)}
                      />
                      <Label htmlFor={grade.id} className="cursor-pointer">{grade.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="teacher">Assign Teacher</Label>
                <Select
                  value={selectedTeacher}
                  onValueChange={(value) => setSelectedTeacher(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.name} - {teacher.subjects.join(", ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="block mb-2">Assign Students</Label>
                <div className="max-h-60 overflow-y-auto border rounded-md p-2">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center space-x-2 py-2 border-b last:border-0">
                      <Checkbox 
                        id={`student-${student.id}`} 
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() => toggleStudent(student.id)}
                      />
                      <Label htmlFor={`student-${student.id}`} className="cursor-pointer">
                        {student.name} - Grade {student.grade}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Course Image</Label>
                <div className="border-2 border-dashed rounded-md p-8 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="mt-4"
                  >
                    Select File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate("/admin-dashboard/courses")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Course
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
