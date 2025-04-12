
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, AlertTriangle, CheckCircle, Clock, HelpCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";

// Mock ticket data
const tickets = [
  {
    id: "ticket-1",
    title: "Payment not received for completed sessions",
    status: "open",
    priority: "high",
    category: "payment",
    createdAt: "2025-04-10T10:30:00",
    lastUpdated: "2025-04-11T14:15:00",
    messages: 3
  },
  {
    id: "ticket-2",
    title: "Unable to download student reports",
    status: "in_progress",
    priority: "medium",
    category: "technical",
    createdAt: "2025-04-08T09:15:00",
    lastUpdated: "2025-04-11T11:30:00",
    messages: 5
  },
  {
    id: "ticket-3",
    title: "Missing hours on timesheet",
    status: "open",
    priority: "medium",
    category: "payment",
    createdAt: "2025-04-07T15:45:00",
    lastUpdated: "2025-04-07T15:45:00",
    messages: 1
  },
  {
    id: "ticket-4",
    title: "Question about student assessment tools",
    status: "closed",
    priority: "low",
    category: "educational",
    createdAt: "2025-04-01T11:20:00",
    lastUpdated: "2025-04-05T13:10:00",
    messages: 4
  },
  {
    id: "ticket-5",
    title: "Request for additional teaching materials",
    status: "closed",
    priority: "low",
    category: "educational",
    createdAt: "2025-03-28T14:05:00",
    lastUpdated: "2025-04-02T10:20:00",
    messages: 2
  }
];

export default function TeacherTickets() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Apply filters
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Sort tickets by last updated (newest first)
  const sortedTickets = [...filteredTickets].sort((a, b) => 
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );

  // Helper to display ticket status with appropriate icon and color
  const getStatusDisplay = (status) => {
    switch (status) {
      case "open":
        return { icon: <AlertTriangle className="h-4 w-4" />, color: "text-amber-500", label: "Open" };
      case "in_progress":
        return { icon: <Clock className="h-4 w-4" />, color: "text-blue-500", label: "In Progress" };
      case "closed":
        return { icon: <CheckCircle className="h-4 w-4" />, color: "text-green-500", label: "Closed" };
      default:
        return { icon: <HelpCircle className="h-4 w-4" />, color: "text-gray-500", label: "Unknown" };
    }
  };

  // Helper to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Support Tickets</h1>
          <Button 
            className="bg-educational-purple hover:bg-educational-purple/90"
            onClick={() => navigate("/teacher-dashboard/tickets/create")}
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Ticket
          </Button>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search tickets..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Tickets list */}
        <Card>
          <CardHeader>
            <CardTitle>Your Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedTickets.length > 0 ? (
              <div className="divide-y">
                {sortedTickets.map((ticket) => {
                  const status = getStatusDisplay(ticket.status);
                  
                  return (
                    <div key={ticket.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="space-y-2 mb-2 sm:mb-0">
                        <div className="flex items-center gap-2">
                          <span className={`flex items-center gap-1 ${status.color}`}>
                            {status.icon} {status.label}
                          </span>
                          
                          <Badge variant="outline" className="capitalize">
                            {ticket.category}
                          </Badge>
                          
                          {ticket.priority === "high" && (
                            <Badge variant="destructive">
                              High Priority
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-medium">{ticket.title}</h3>
                        <p className="text-xs text-gray-500">
                          Last updated: {formatDate(ticket.lastUpdated)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-100 px-2 py-1 rounded-md text-sm">
                          {ticket.messages} {ticket.messages === 1 ? "message" : "messages"}
                        </div>
                        <Button 
                          className="bg-educational-purple hover:bg-educational-purple/90"
                          onClick={() => navigate(`/teacher-dashboard/tickets/${ticket.id}`)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <p>No tickets match your search criteria</p>
                {(searchTerm || statusFilter !== "all" || categoryFilter !== "all") && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setCategoryFilter("all");
                    }} 
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
