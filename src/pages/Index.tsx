
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, BookOpen, Award } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { courses } from '@/data/mockData';
import CourseCard from '@/components/shared/CourseCard';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="h-12 w-12 text-educational-purple" />,
      title: "Privacy First",
      description: "Student and teacher personal information is never shared between parties."
    },
    {
      icon: <Clock className="h-12 w-12 text-educational-teal" />,
      title: "Flexible Scheduling",
      description: "Book sessions in your timezone with automatic conversions."
    },
    {
      icon: <BookOpen className="h-12 w-12 text-educational-orange" />,
      title: "Personalized Learning",
      description: "One-on-one sessions tailored to your learning style and goals."
    },
    {
      icon: <Award className="h-12 w-12 text-educational-purple" />,
      title: "Qualified Teachers",
      description: "All educators are thoroughly vetted for excellence."
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              <span className="text-educational-purple">Private Tutoring</span> with Advanced Privacy Protection
            </h1>
            <p className="text-xl md:text-2xl text-gray-600">
              Connect with qualified tutors globally while keeping your personal information secure.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/courses')}
                size="lg" 
                className="bg-educational-purple hover:bg-educational-purple/90 text-lg px-8"
              >
                Explore Courses
              </Button>
              <Button 
                onClick={() => navigate('/how-it-works')}
                variant="outline" 
                size="lg"
                className="text-lg"
              >
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Your <span className="text-educational-purple">Privacy</span> is Our Priority
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We've designed a platform where education happens without compromising your personal information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              How <span className="text-educational-purple">It Works</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Learn about our privacy-first approach to connecting students with tutors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="bg-educational-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-educational-purple text-3xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Create an Account</h3>
              <p className="text-gray-600">
                Sign up as a student or teacher and complete your profile with academic details.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-educational-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-educational-teal text-3xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Book Sessions</h3>
              <p className="text-gray-600">
                Browse courses, request enrollment, and schedule one-on-one sessions with qualified teachers.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-educational-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-educational-orange text-3xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Learn Privately</h3>
              <p className="text-gray-600">
                Connect via our secure platform with MS Teams integration. Exchange homework and messages without sharing personal details.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-educational-purple hover:bg-educational-purple/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured <span className="text-educational-purple">Courses</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular one-on-one tutoring courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course) => (
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

          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/courses')}
              className="hover:text-educational-purple"
            >
              View All Courses
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-educational-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students learning with privacy and security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/register')}
              size="lg" 
              variant="secondary"
              className="bg-white text-educational-purple hover:bg-gray-100"
            >
              Sign Up Now
            </Button>
            <Button 
              onClick={() => navigate('/courses')}
              size="lg"
              variant="outline" 
              className="text-white border-white hover:bg-educational-purple/80"
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
