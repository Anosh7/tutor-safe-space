
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { students, teachers, sessions, tickets } from "@/data/mockData";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  CreditCard,
  ArrowUpRight, 
  ArrowDownRight,
  BarChart4 
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Mock data for charts
const earningsData = [
  { month: 'Jan', amount: 3200 },
  { month: 'Feb', amount: 3500 },
  { month: 'Mar', amount: 3800 },
  { month: 'Apr', amount: 4100 },
  { month: 'May', amount: 3900 },
  { month: 'Jun', amount: 4200 }
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock stats
  const totalRevenue = earningsData.reduce((sum, month) => sum + month.amount, 0);
  const pendingPayments = 1200;
  const totalSessions = sessions.length;
  const activeSessions = sessions.filter(s => s.status === "scheduled").length;
  const openTickets = tickets.filter(t => t.status === "open").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/admin-dashboard/settings")}
              className="md:ml-2"
            >
              Platform Settings
            </Button>
            <Button 
              className="bg-educational-purple hover:bg-educational-purple/90"
              onClick={() => navigate("/admin-dashboard/users/create")}
            >
              Add New User
            </Button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs flex items-center text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +3 this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Teachers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachers.length}</div>
              <p className="text-xs flex items-center text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +1 this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue}</div>
              <p className="text-xs flex items-center text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pendingPayments}</div>
              <p className="text-xs flex items-center text-red-600">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                3 payments overdue
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar
                    dataKey="amount"
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Activity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sessions Summary */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Sessions</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/admin-dashboard/sessions")}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-2xl font-bold">{totalSessions}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Upcoming</p>
                    <p className="text-2xl font-bold">{activeSessions}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-educational-teal" />
                      <span>Recent Sessions</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs h-auto py-1"
                      onClick={() => navigate("/admin-dashboard/sessions")}
                    >
                      Details
                    </Button>
                  </div>
                  
                  <ul className="space-y-2">
                    {sessions.slice(0, 3).map(session => (
                      <li key={session.id} className="text-sm flex justify-between border-b pb-2">
                        <span>{session.title}</span>
                        <span className="text-gray-500">{new Date(session.date).toLocaleDateString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tickets Summary */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Support Tickets</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/admin-dashboard/tickets")}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Open Tickets</p>
                    <p className="text-2xl font-bold">{openTickets}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Avg. Response Time</p>
                    <p className="text-2xl font-bold">4h</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-educational-purple" />
                      <span>Recent Tickets</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs h-auto py-1"
                      onClick={() => navigate("/admin-dashboard/tickets")}
                    >
                      Details
                    </Button>
                  </div>
                  
                  <ul className="space-y-2">
                    {tickets.map(ticket => (
                      <li key={ticket.id} className="text-sm flex justify-between border-b pb-2">
                        <span>{ticket.title}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                          {ticket.priority}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate("/admin-dashboard/users/create")}
            >
              <Users className="h-6 w-6" />
              <span>Add New User</span>
            </Button>
            <Button 
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate("/admin-dashboard/courses/create")}
            >
              <Calendar className="h-6 w-6" />
              <span>Create Course</span>
            </Button>
            <Button 
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate("/admin-dashboard/finances")}
            >
              <CreditCard className="h-6 w-6" />
              <span>Manage Payments</span>
            </Button>
            <Button 
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate("/admin-dashboard/analytics")}
            >
              <BarChart4 className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
