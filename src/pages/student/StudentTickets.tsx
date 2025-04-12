
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { tickets } from "@/data/mockData";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { PlusCircle, MessageSquare, Send, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentTickets() {
  const { user } = useAuth();
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  
  // Get user tickets
  const userTickets = tickets.filter(ticket => ticket.createdBy === "student1");
  
  // Find active ticket
  const activeTicket = userTickets.find(ticket => ticket.id === activeTicketId);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would call an API to add the message
    toast.success("Message sent!");
    setNewMessage("");
  };
  
  // Handle creating a new ticket
  const handleCreateTicket = () => {
    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      toast.error("Please fill out all fields");
      return;
    }
    
    toast.success("Support ticket created!");
    setNewTicket({
      title: "",
      description: "",
      priority: "medium",
    });
  };
  
  // Function to get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Function to get priority badge styling
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Support Tickets</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Support Ticket</DialogTitle>
                <DialogDescription>
                  Submit a new ticket to get help from our support team
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="ticket-title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="ticket-title"
                    placeholder="Brief description of your issue"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="ticket-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="ticket-description"
                    placeholder="Please provide details about your issue"
                    rows={4}
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="ticket-priority" className="text-sm font-medium">
                    Priority
                  </label>
                  <Select 
                    value={newTicket.priority}
                    onValueChange={(value) => setNewTicket({...newTicket, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleCreateTicket}>Create Ticket</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Tickets list and conversation display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tickets list */}
          <div className="lg:col-span-1 space-y-4">
            {userTickets.length > 0 ? (
              userTickets.map((ticket) => (
                <Card 
                  key={ticket.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${activeTicketId === ticket.id ? 'ring-2 ring-educational-purple' : ''}`}
                  onClick={() => setActiveTicketId(ticket.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{ticket.title}</CardTitle>
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusBadge(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <CardDescription className="text-xs">
                      Created on {format(new Date(ticket.createdDate), "MMM d, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${getPriorityBadge(ticket.priority)}`}>
                        {ticket.priority} priority
                      </span>
                      <span className="text-xs text-gray-500">
                        {ticket.messages.length} {ticket.messages.length === 1 ? 'message' : 'messages'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-600">No tickets yet</p>
                  <p className="text-sm text-gray-500 mb-6">
                    Create your first support ticket to get help
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Create a ticket</Button>
                    </DialogTrigger>
                    <DialogContent>
                      {/* Same content as the other dialog */}
                      <DialogHeader>
                        <DialogTitle>Create Support Ticket</DialogTitle>
                        <DialogDescription>
                          Submit a new ticket to get help from our support team
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {/* Same fields as above */}
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleCreateTicket}>Create Ticket</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Conversation panel */}
          <div className="lg:col-span-2">
            {activeTicket ? (
              <Card className="h-full flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{activeTicket.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusBadge(activeTicket.status)}`}>
                          {activeTicket.status}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className={`text-xs px-2 py-1 rounded-full capitalize ${getPriorityBadge(activeTicket.priority)}`}>
                          {activeTicket.priority} priority
                        </span>
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      {activeTicket.status === "resolved" ? "Reopen" : "Mark as resolved"}
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
                  {/* Initial ticket description */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">You</span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(activeTicket.createdDate), "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </div>
                    <p className="text-gray-700">{activeTicket.description}</p>
                  </div>
                  
                  {/* Messages */}
                  {activeTicket.messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`rounded-lg p-4 ${
                        message.sender === "student1" 
                          ? "bg-educational-purple/10 ml-6" 
                          : "bg-gray-50 mr-6"
                      }`}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">
                          {message.sender === "student1" ? "You" : "Support Staff"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {format(new Date(message.timestamp), "MMM d, yyyy 'at' h:mm a")}
                        </span>
                      </div>
                      <p className="text-gray-700">{message.text}</p>
                    </div>
                  ))}
                </CardContent>
                
                <CardFooter className="border-t p-4">
                  <div className="flex w-full gap-2">
                    <Textarea
                      placeholder="Type your message here..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-grow"
                    />
                    <Button onClick={handleSendMessage} className="self-end">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-600">No ticket selected</p>
                  <p className="text-sm text-gray-500 mb-6">
                    Select a ticket from the list or create a new one
                  </p>
                  {userTickets.length > 0 ? (
                    <div className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>You have {userTickets.length} active tickets</span>
                    </div>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Create a ticket</Button>
                      </DialogTrigger>
                      <DialogContent>
                        {/* Same content as the other dialog */}
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
