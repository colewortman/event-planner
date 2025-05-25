const express = require('express');
const cors = require('cors');

const eventRoutes = require('./routes/eventRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();

app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});