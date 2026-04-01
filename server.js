// 1. Import tools
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

// 2. Load environment variables
dotenv.config();

// 3. Initialize the App
const app = express();
app.use(express.json()); // Allows the server to read JSON from Postman

// 4. Connect to Database (Simplified for now)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// 5. Link your Routes (The Waiter)
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);
const authRoute = require('./routes/authRoutes');
app.use('/api/auth',authRoute);


// ... other middleware ...

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// 6. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});