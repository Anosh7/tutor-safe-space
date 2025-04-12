
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { billing, students } from "@/data/mockData";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { CreditCard, Calendar, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentPayments() {
  const { user } = useAuth();
  const [processingPayment, setProcessingPayment] = useState(false);
  
  const student = students.find(s => s.id === "student1"); // In a real app, this would use the current user's ID
  const pendingBills = billing.filter(bill => bill.status === "pending");
  const paidBills = billing.filter(bill => bill.status === "paid");
  
  // Simulate payment processing
  const handlePayment = () => {
    setProcessingPayment(true);
    setTimeout(() => {
      setProcessingPayment(false);
      toast.success("Payment processed successfully!");
    }, 2000);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
        </div>
        
        {/* Billing Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingBills.length > 0 && (
            <Card className="md:col-span-1">
              <CardHeader className="bg-orange-50 border-b">
                <CardTitle className="text-orange-800">Pending Payment</CardTitle>
                <CardDescription className="text-orange-600">
                  Due on {format(new Date(pendingBills[0].dueDate), "MMMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Amount Due</p>
                    <p className="text-3xl font-bold">${pendingBills[0].amount.toFixed(2)}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg">
                        Pay Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Complete Payment</DialogTitle>
                        <DialogDescription>
                          Process payment for {pendingBills[0].month}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="py-4">
                        <div className="border rounded-md p-4 mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-500">Bill Period</span>
                            <span className="font-medium">{pendingBills[0].month}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Amount</span>
                            <span className="font-medium">${pendingBills[0].amount.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Card Information</label>
                            <div className="mt-1 p-3 border rounded-md bg-gray-50 text-sm text-gray-500 flex items-center">
                              <CreditCard className="h-4 w-4 mr-2" /> 
                              <span>Secure payment via Stripe</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              <span>Your payment info is secure</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              <span>Receipt will be sent to parent email</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline">
                          Cancel
                        </Button>
                        <Button 
                          onClick={handlePayment} 
                          disabled={processingPayment}
                        >
                          {processingPayment ? "Processing..." : "Pay $" + pendingBills[0].amount.toFixed(2)}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="text-sm">
                  <p className="flex items-center text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Bill Period: {pendingBills[0].month}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                    Bill will be sent to parent email: {student?.parentEmail}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className={pendingBills.length > 0 ? "md:col-span-1" : "md:col-span-2"}>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
              <CardDescription>Overview of your billing history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600">Monthly Fee</p>
                    <p className="font-bold text-lg">$599.00</p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600">Payments Made</p>
                    <p className="font-bold text-lg">{paidBills.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Record of all your previous payments</CardDescription>
          </CardHeader>
          <CardContent>
            {paidBills.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paidBills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell>
                        {format(new Date(bill.paidDate!), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>{bill.month}</TableCell>
                      <TableCell>${bill.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                          Paid
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No payment history available yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
