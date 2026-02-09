require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const mentors = [
    {
        name: "Dr. Sarah Mitchell",
        email: "sarah.m@example.com",
        password: "password123",
        role: "mentor",
        profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        mentorProfile: {
            expertise: ["Machine Learning", "Python", "Data Science", "TensorFlow"],
            bio: "Ph.D. in AI from Stanford. Currently leading a team of data scientists at Google to solve complex problems using deep learning. I can help you with ML concepts, career guidance, and interview prep.",
            currentRole: "Lead Data Scientist",
            company: "Google",
            location: "California, USA",
            experience: "10+ Years",
            languages: ["English", "Spanish"],
            pricing: { hourlyRate: 150 },
            rating: 4.9,
            totalSessions: 120,
            availability: ["Weekends", "Evenings"]
        }
    },
    {
        name: "Alex Rivera",
        email: "alex.r@example.com",
        password: "password123",
        role: "mentor",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        mentorProfile: {
            expertise: ["React", "Node.js", "System Design", "AWS"],
            bio: "Senior Full Stack Engineer at Netflix. Passionate about building scalable distributed systems and high-performance UIs. Let's crack that system design interview!",
            currentRole: "Senior Engineer",
            company: "Netflix",
            location: "New York, USA",
            experience: "7+ Years",
            languages: ["English"],
            pricing: { hourlyRate: 120 },
            rating: 4.8,
            totalSessions: 85,
            availability: ["Weekdays"]
        }
    },
    {
        name: "Priya Sharma",
        email: "priya.s@example.com",
        password: "password123",
        role: "mentor",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        mentorProfile: {
            expertise: ["Product Management", "UI/UX", "Strategy", "User Research"],
            bio: "Product leader at Airbnb depending on data-driven decisions. I help aspiring PMs and designers build a strong portfolio and crack product interviews.",
            currentRole: "Product Manager",
            company: "Airbnb",
            location: "Bangalore, India",
            experience: "5+ Years",
            languages: ["English", "Hindi"],
            pricing: { hourlyRate: 90 },
            rating: 5.0,
            totalSessions: 45,
            availability: ["Sundays"]
        }
    },
    {
        name: "David Chen",
        email: "david.c@example.com",
        password: "password123",
        role: "mentor",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        mentorProfile: {
            expertise: ["Backend", "Java", "Spring Boot", "Microservices"],
            bio: "Backend Architect with extensive experience in banking systems. Tech Lead at DBS. I focus on clean code, architecture patterns, and scalability.",
            currentRole: "Tech Lead",
            company: "DBS Bank",
            location: "Singapore",
            experience: "12+ Years",
            languages: ["English", "Mandarin"],
            pricing: { hourlyRate: 140 },
            rating: 4.7,
            totalSessions: 200,
            availability: ["Flexible"]
        }
    },
    {
        name: "Emily Davis",
        email: "emily.d@example.com",
        password: "password123",
        role: "mentor",
        profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        mentorProfile: {
            expertise: ["DevOps", "Kubernetes", "Docker", "CI/CD"],
            bio: "DevOps Engineer automting everything at Amazon. I can teach you cloud native technologies and how to build robust CI/CD pipelines.",
            currentRole: "DevOps Engineer",
            company: "Amazon",
            location: "Seattle, USA",
            experience: "4+ Years",
            languages: ["English"],
            pricing: { hourlyRate: 100 },
            rating: 4.9,
            totalSessions: 60,
            availability: ["Weekends"]
        }
    },
    {
        name: "Rahul Verma",
        email: "rahul.v@example.com",
        password: "password123",
        role: "mentor",
        profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        mentorProfile: {
            expertise: ["Frontend", "Angular", "Vue.js", "Web Performance"],
            bio: "Frontend Specialist who loves optimizing web performance. Currently working at Microsoft to improve Azure portal experiences.",
            currentRole: "Senior Frontend Dev",
            company: "Microsoft",
            location: "Hyderabad, India",
            experience: "6+ Years",
            languages: ["English", "Hindi"],
            pricing: { hourlyRate: 80 },
            rating: 4.6,
            totalSessions: 95,
            availability: ["Evenings"]
        }
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB for seeding...");

        // Clear existing mentors only to avoid duplicate emails during re-runs
        await User.deleteMany({ role: 'mentor' });
        console.log("Existing mentors cleared.");

        for (const mentor of mentors) {
            await User.create(mentor);
        }

        console.log("Sample mentors seeded successfully!");
        process.exit();
    } catch (err) {
        console.error("Error seeding DB:", err);
        process.exit(1);
    }
};

seedDB();
