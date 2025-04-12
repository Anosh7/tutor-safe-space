
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { sessions } from "@/data/mockData";
import { CreditCard, Download, ChevronRight, ArrowUpRight, AlertCircle, Clock } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from "recharts";

export default function TeacherEarnings() {
  // Mock earnings data
  const monthlyEarnings = 3200;
  const pendingEarnings = 800;

  // Calculate completed sessions (for earnings history)
  const completedSessions = sessions.filter(session => session.status === "completed");
  
  // Mock monthly earnings data for the chart
  const monthlyData = [
    { name: "Jan", earnings: 2800 },
    { name: "Feb", earnings: 3100 },
    { name: "Mar", earnings: 2900 },
    { name: "Apr", earnings: 3200 },
    { name: "May", earnings: 0 }, // Future months
    { name: "Jun", earnings: 0 },
    { name: "Jul", earnings: 0 },
    { name: "Aug", earnings: 0 },
    { name: "Sep", earnings: 0 },
    { name: "Oct", earnings: 0 },
    { name: "Nov", earnings: 0 },
    { name: "Dec", earnings: 0 },
  ];

  // Mock payment transactions
  const payments = [
    { id: "pmt-1", date: "2025-04-10", amount: 300, status: "completed", description: "3 sessions with Alex Johnson" },
    { id: "pmt-2", date: "2025-04-05", amount: 400, status: "completed", description: "4 sessions with Emma Wilson" },
    { id: "pmt-3", date: "2025-03-28", amount: 200, status: "completed", description: "2 sessions with Jackson Lee" },
    { id: "pmt-4", date: "2025-03-20", amount: 300, status: "completed", description: "3 sessions with Olivia Brown" },
    { id: "pmt-5", date: "2025-04-12", amount: 500, status: "pending", description: "5 sessions with Michael Smith" },
    { id: "pmt-6", date: "2025-04-11", amount: 300, status: "pending", description: "3 sessions with Sophia Davis" },
  ];

  const completedPayments = payments.filter(payment => payment.status === "completed");
  const pendingPayments = payments.filter(payment => payment.status === "pending");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">Earnings Overview</h1>
        
        {/* Earnings summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">This Month</span>
                <span className="text-3xl font-bold text-educational-purple">${monthlyEarnings}</span>
                <span className="text-sm text-gray-500">From {completedSessions.length} completed sessions</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">Pending</span>
                <span className="text-3xl font-bold text-educational-teal">${pendingEarnings}</span>
                <span className="text-sm text-gray-500">To be processed within 7 days</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">Year to Date</span>
                <span className="text-3xl font-bold text-educational-orange">${monthlyEarnings * 4}</span>
                <span className="text-sm text-gray-500">Total earnings in 2025</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Earnings chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Monthly Earnings (2025)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Earnings']}
                    labelFormatter={(label) => `${label} 2025`}
                  />
                  <Bar dataKey="earnings" fill="#7e56da">
                    {monthlyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={entry.earnings > 0 ? "#7e56da" : "#e2e8f0"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Payment history */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span>Payment History</span>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" /> Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="completed">
              <TabsList className="mb-4">
                <TabsTrigger value="completed">
                  Completed
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="completed">
                <div className="divide-y">
                  {completedPayments.map((payment) => (
                    <div key={payment.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-green-600" />
                          Payment received
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(payment.date).toLocaleDateString()} • {payment.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 sm:mt-0">
                        <span className="font-medium">${payment.amount}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="pending">
                <div className="divide-y">
                  {pendingPayments.map((payment) => (
                    <div key={payment.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-amber-600" />
                          Payment pending
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(payment.date).toLocaleDateString()} • {payment.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 sm:mt-0">
                        <span className="font-medium">${payment.amount}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Payment methods */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Payment Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-medium flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Bank Account (Primary)
                  </h3>
                  <p className="text-sm text-gray-500">
                    Chase Bank ••••1234
                  </p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
              
              <div className="p-4 border rounded-lg bg-amber-50">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">Payment verification required</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      To receive payouts, please complete the verification process. This helps us 
                      ensure the security of your payments.
                    </p>
                    <Button size="sm" className="mt-2 flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
                      Complete Verification <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
