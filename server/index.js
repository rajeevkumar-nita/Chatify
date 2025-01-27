// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose"); 
// const authRoutes = require("./routes/auth");
// const messageRoutes = require("./routes/messages");
// const app = express();
// const socket = require("socket.io");
// require("dotenv").config();

// app.use(cors());
// app.use(express.json());


// console.log("the vlaue of url is",process.env.MONGO_URL);
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB Connetion Successfull");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// const server = app.listen(process.env.PORT, () =>
//   console.log(`Server started on ${process.env.PORT}`)
// );
// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });



// Import required modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
require("dotenv").config(); // Load environment variables

// Initialize the Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log("The value of URL is:", process.env.MONGO_URL);

// Fix the mongoose strictQuery warning
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
  });

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start the server
const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on port ${process.env.PORT || 5000}`)
);

// Initialize Socket.IO
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000", // Replace this with your client URL in production
    credentials: true,
  },
});

// Global variable to track online users
global.onlineUsers = new Map();

// Socket.IO event listeners
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Save userId and socketId in the global map
  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
    console.log(`User added: ${userId}, Socket ID: ${socket.id}`);
  });

  // Handle sending messages
  socket.on("send-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    } else {
      console.log(`User ${data.to} is not online.`);
    }
  });

  // Cleanup when a user disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    global.onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        global.onlineUsers.delete(key);
      }
    });
  });
});
