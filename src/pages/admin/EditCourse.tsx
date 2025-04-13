
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { courses } from "@/data/mockData";

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

export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const courseToEdit = courses.find(course => course.id === id);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: ""
  });
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  
  useEffect(() => {
    if (!courseToEdit) {
      toast.error("Course not found");
      navigate("/admin-dashboard/courses");
      return;
    }
    
    // Initialize form with course data
    setFormData({
      title: courseToEdit.title,
      description: courseToEdit.description,
      price: courseToEdit.price.toString(),
      duration: courseToEdit.duration
    });
    
    setSelectedSubjects(courseToEdit.subjects);
    setSelectedGrades(courseToEdit.grades);
  }, [courseToEdit, navigate]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSubjects.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one subject",
        variant: "destructive",
      });
      return;
    }

    if (selectedGrades.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one grade level",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would make an API call to update the course
    toast.success("Course updated successfully");
    navigate(`/admin-dashboard/courses/${id}`);
  };

  if (!courseToEdit) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(`/admin-dashboard/courses/${id}`)}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Edit Course</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Edit the core details of the course
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
                        checked={selectedSubjects.includes(subject.label)}
                        onCheckedChange={() => toggleSubject(subject.label)}
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
              onClick={() => navigate(`/admin-dashboard/courses/${id}`)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
