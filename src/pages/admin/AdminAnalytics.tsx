
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";

// Mock data for charts
const revenueData = [
  { month: 'Jan', amount: 3100 },
  { month: 'Feb', amount: 3300 },
  { month: 'Mar', amount: 3600 },
  { month: 'Apr', amount: 4100 },
  { month: 'May', amount: 3900 },
  { month: 'Jun', amount: 4200 }
];

const userGrowthData = [
  { month: 'Jan', students: 35, teachers: 12 },
  { month: 'Feb', students: 40, teachers: 14 },
  { month: 'Mar', students: 45, teachers: 15 },
  { month: 'Apr', students: 52, teachers: 17 },
  { month: 'May', students: 58, teachers: 18 },
  { month: 'Jun', students: 65, teachers: 20 }
];

const sessionData = [
  { month: 'Jan', completed: 120, cancelled: 8 },
  { month: 'Feb', completed: 132, cancelled: 10 },
  { month: 'Mar', completed: 141, cancelled: 7 },
  { month: 'Apr', completed: 158, cancelled: 12 },
  { month: 'May', completed: 165, cancelled: 9 },
  { month: 'Jun', completed: 175, cancelled: 11 }
];

const subjectDistributionData = [
  { name: 'Mathematics', value: 42 },
  { name: 'Physics', value: 28 },
  { name: 'Chemistry', value: 18 },
  { name: 'Biology', value: 15 },
  { name: 'Computer Science', value: 22 },
  { name: 'English', value: 17 }
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'];

export default function AdminAnalytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Analytics Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
              <CardDescription>Monthly revenue trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Students and teachers onboarded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="students" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="teachers" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Statistics</CardTitle>
              <CardDescription>Completed and cancelled sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sessionData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="completed" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="cancelled" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subject Distribution</CardTitle>
              <CardDescription>Popular subjects among students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subjectDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {subjectDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>Key metrics overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">User Satisfaction</p>
                <p className="text-2xl font-bold">4.8/5.0</p>
                <p className="text-xs text-green-600">+0.3 from last quarter</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Session Completion</p>
                <p className="text-2xl font-bold">96.4%</p>
                <p className="text-xs text-green-600">+1.2% from last quarter</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Student Retention</p>
                <p className="text-2xl font-bold">89.7%</p>
                <p className="text-xs text-green-600">+2.5% from last quarter</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Average Session Rating</p>
                <p className="text-2xl font-bold">4.6/5.0</p>
                <p className="text-xs text-green-600">+0.2 from last quarter</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
