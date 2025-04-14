
// Mock Data for the Educational Platform

// Course Data
export const courses = [
  {
    id: "course1",
    title: "Advanced Mathematics",
    description: "Covers calculus, linear algebra, and statistics",
    subjects: ["Mathematics"],
    grades: ["9", "10", "11", "12"],
    image: "/placeholder.svg",
    price: 299,
    duration: "3 months",
    enrolledCount: 42
  },
  {
    id: "course2",
    title: "Physics Fundamentals",
    description: "Learn mechanics, thermodynamics, and electromagnetism",
    subjects: ["Physics"],
    grades: ["11", "12"],
    image: "/placeholder.svg",
    price: 279,
    duration: "3 months",
    enrolledCount: 38
  },
  {
    id: "course3",
    title: "Computer Science Basics",
    description: "Introduction to programming, algorithms, and data structures",
    subjects: ["Computer Science"],
    grades: ["10", "11", "12"],
    image: "/placeholder.svg",
    price: 349,
    duration: "4 months",
    enrolledCount: 65
  },
  {
    id: "course4",
    title: "English Literature",
    description: "Study classic novels, poetry, and essay writing",
    subjects: ["English"],
    grades: ["8", "9", "10", "11", "12"],
    image: "/placeholder.svg",
    price: 229,
    duration: "3 months",
    enrolledCount: 27
  }
];

// Session Data
export const sessions = [
  {
    id: "session1",
    courseId: "course1",
    studentId: "student1",
    teacherId: "teacher1",
    title: "Calculus Introduction",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    durationMinutes: 60,
    status: "scheduled" as const,
    meetingLink: "https://teams.microsoft.com/meetinglink1",
    homeworkId: "homework1"
  },
  {
    id: "session2",
    courseId: "course1",
    studentId: "student1",
    teacherId: "teacher1",
    title: "Linear Algebra Basics",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    durationMinutes: 60,
    status: "completed" as const,
    meetingLink: "https://teams.microsoft.com/meetinglink2",
    homeworkId: "homework2",
    feedback: {
      rating: 4.5,
      comment: "Great session, very informative!"
    }
  },
  {
    id: "session3",
    courseId: "course2",
    studentId: "student1",
    teacherId: "teacher1",
    title: "Mechanics: Force and Motion",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    durationMinutes: 60,
    status: "scheduled" as const,
    meetingLink: "https://teams.microsoft.com/meetinglink3"
  }
];

// Homework Data
export type HomeworkItem = {
  id: string;
  sessionId: string;
  studentId: string;
  title: string;
  description: string;
  assignedDate: Date;
  dueDate: Date;
  fileUrl: string;
  status: string;
  submissionDate?: Date;
  submissionFileUrl?: string;
};

export const homework: HomeworkItem[] = [
  {
    id: "homework1",
    sessionId: "session1",
    studentId: "student1",
    title: "Calculus Practice Problems",
    description: "Complete problems 1-20 from Chapter 3",
    assignedDate: new Date(Date.now()),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Due in 7 days
    fileUrl: "/placeholder.svg",
    status: "assigned"
  },
  {
    id: "homework2",
    sessionId: "session2",
    studentId: "student1",
    title: "Linear Algebra Worksheet",
    description: "Solve matrix operations and vector space problems",
    assignedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Assigned 7 days ago
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Due 2 days ago
    fileUrl: "/placeholder.svg",
    status: "submitted",
    submissionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    submissionFileUrl: "/placeholder.svg"
  }
];

// Billing Data
export const billing = [
  {
    id: "bill1",
    studentId: "student1",
    month: "April 2025",
    amount: 599,
    status: "paid",
    dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    paidDate: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000)
  },
  {
    id: "bill2",
    studentId: "student1",
    month: "May 2025",
    amount: 599,
    status: "pending",
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
  }
];

// Student Data
export interface Student {
  id: string;
  name: string;
  email: string;
  board: string;
  grade: string;
  subjects: string[];
  timezone: string;
  parentEmail: string;
  profileImage: string;
  assignedTeacher?: string;
  username?: string;
  password?: string;
}

export const students: Student[] = [
  {
    id: "student1",
    name: "Alex Johnson",
    email: "student@example.com",
    board: "CBSE",
    grade: "10",
    subjects: ["Mathematics", "Physics"],
    timezone: "Asia/Kolkata",
    parentEmail: "parent@example.com",
    profileImage: "/placeholder.svg",
    username: "alexj1234",
    password: "password123",
    assignedTeacher: "teacher1"
  }
];

// Teacher Data
export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  qualifications: string;
  experience: string;
  timezone: string;
  profileImage: string;
  username?: string;
  password?: string;
}

export const teachers: Teacher[] = [
  {
    id: "teacher1",
    name: "Prof. Sarah Miller",
    email: "teacher@example.com",
    subjects: ["Mathematics", "Physics"],
    qualifications: "PhD in Mathematics",
    experience: "10 years",
    timezone: "America/New_York",
    profileImage: "/placeholder.svg",
    username: "sarahm1234",
    password: "password123"
  }
];

// Tickets Data
export const tickets = [
  {
    id: "ticket1",
    title: "Homework clarification",
    description: "Need help understanding question 5 in homework 1",
    createdBy: "student1", 
    assignedTo: "teacher1",
    createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "open",
    priority: "medium",
    messages: [
      {
        id: "msg1",
        sender: "student1",
        text: "I'm having trouble understanding question 5 in the homework. Could you please clarify?",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ]
  }
];
