
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const socket = require("socket.io");
// const authRoutes = require("./routes/auth");
// const messageRoutes = require("./routes/messages");
// const avatarRoutes = require("./routes/avatar"); // ✅ New import
// require("dotenv").config();

// // Initialize Express
// const app = express();

// // Middlewares
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true,
// }));
// app.use(express.json());

// // MongoDB connection
// console.log("The value of URL is:", process.env.MONGO_URL);
// mongoose.set("strictQuery", true);
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("DB Connection Successful"))
//   .catch((err) => console.error("DB Connection Error:", err.message));

// // API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/avatar", avatarRoutes); // ✅ New route to serve avatars

// // Start server
// const server = app.listen(process.env.PORT || 5000, () =>
//   console.log(`Server started on port ${process.env.PORT || 5000}`)
// );

// // Socket.IO setup
// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();

// io.on("connection", (socket) => {
//   console.log("New user connected:", socket.id);

//   socket.on("add-user", (userId) => {
//     global.onlineUsers.set(userId, socket.id);
//     console.log(`User added: ${userId}, Socket ID: ${socket.id}`);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = global.onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-receive", data.msg);
//     } else {
//       console.log(`User ${data.to} is not online.`);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//     global.onlineUsers.forEach((value, key) => {
//       if (value === socket.id) {
//         global.onlineUsers.delete(key);
//       }
//     });
//   });
// });





const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const avatarRoutes = require("./routes/avatar");
require("dotenv").config();

// Initialize Express
const app = express();

// Middlewares
app.use(cors({
  origin: "https://chatify-wheat.vercel.app",  // your frontend domain
  credentials: true,
}));
app.use(express.json());

// MongoDB connection
console.log("The value of URL is:", process.env.MONGO_URL);
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.error("DB Connection Error:", err.message));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/avatar", avatarRoutes);

// Root route (important for Render)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Start server
const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on port ${process.env.PORT || 5000}`)
);

// Socket.IO setup
const io = socket(server, {
  cors: {
    origin: "https://chatify-wheat.vercel.app",,
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
    console.log(`User added: ${userId}, Socket ID: ${socket.id}`);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    } else {
      console.log(`User ${data.to} is not online.`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    global.onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        global.onlineUsers.delete(key);
      }
    });
  });
});
