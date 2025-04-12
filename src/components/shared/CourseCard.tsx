
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  subjects: string[];
  grades: string[];
  image: string;
  price: number;
  duration: string;
  enrolledCount: number;
}

export default function CourseCard({ id, title, description, subjects, grades, image, price, duration, enrolledCount }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-educational-purple">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <div className="bg-educational-teal/10 text-educational-teal px-2 py-1 rounded-full text-sm font-medium">
            ${price}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {subjects.map(subject => (
            <span key={subject} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
              {subject}
            </span>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <div>Grades: {grades.join(", ")}</div>
          <div>{duration}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-gray-500">{enrolledCount} students enrolled</div>
        <Button 
          onClick={() => navigate(`/courses/${id}`)}
          className="bg-educational-purple hover:bg-educational-purple/90"
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
