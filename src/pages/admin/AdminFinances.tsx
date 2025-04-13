
import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { billing, students } from "@/data/mockData";
import { Download, Search } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Mock data for charts
const revenueData = [
  { month: 'Jan', amount: 3100 },
  { month: 'Feb', amount: 3300 },
  { month: 'Mar', amount: 3600 },
  { month: 'Apr', amount: 4100 },
  { month: 'May', amount: 3900 },
  { month: 'Jun', amount: 4200 }
];

export default function AdminFinances() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Helper function to get student name by ID
  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : "Unknown Student";
  };
  
  const filteredBilling = billing.filter(bill => 
    bill.month.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getStudentName(bill.studentId).toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Financial Management</h1>
          <Button 
            variant="outline"
            className="mt-4 md:mt-0"
            onClick={() => alert("Downloading financial report...")}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
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

        {/* Financial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${revenueData.reduce((sum, item) => sum + item.amount, 0)}</div>
              <p className="text-xs text-green-600">+8% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,200</div>
              <p className="text-xs text-red-600">3 payments overdue</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Average Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$285</div>
              <p className="text-xs text-gray-500">Based on monthly billing</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <CardTitle>Payment History</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBilling.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{getStudentName(bill.studentId)}</TableCell>
                    <TableCell>{bill.month}</TableCell>
                    <TableCell>${bill.amount}</TableCell>
                    <TableCell>{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(bill.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => alert(`Viewing payment details for ${bill.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
