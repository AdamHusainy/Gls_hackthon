const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const mentorRoutes = require('./routes/mentors');
const sessionRoutes = require('./routes/sessions');
const roadmapRoutes = require('./routes/roadmaps');
const taskRoutes = require('./routes/tasks');
const feedbackRoutes = require('./routes/feedback');
const aiRoutes = require('./routes/ai');
const dashboardRoutes = require('./routes/dashboard');
const messageRoutes = require('./routes/messages');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors({
    origin: true,
    credentials: true
}));

// Set static folder
app.use(express.static(path.join(__dirname, '../public')));

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/mentors', mentorRoutes);
app.use('/api/v1/sessions', sessionRoutes);
app.use('/api/v1/roadmaps', roadmapRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/messages', messageRoutes);

// Error handler middleware
const errorHandler = require('./middlewares/error');
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
