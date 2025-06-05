const express = require('express');
const cors = require('cors');

const eventRoutes = require('./routes/eventRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const eventUserRoutes = require('./routes/eventUserRoutes.js');

const app = express();

app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/', eventUserRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});