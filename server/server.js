import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";

import connectDB from "./lib/db.js";

const app = express();
const server = http.createServer(app);

// Socket.IO setup
import { Server } from "socket.io";
export const io = new Server(server, { cors: { origin: "*" } });
export const userSocketMap = {};

app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.get("/api/status", (req, res) => {
  res.json("Server is live");
});

// Socket handlers
io.on("connection", (socket) => {
  const userId = socket.handshake.query?.userId;
  console.log("Socket connected", userId, socket.id);
  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Mount routes after creating io
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MongoDB and start server
async function start() {
  // Connect to MongoDB
  await connectDB();

  if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
}

start().catch((err) => console.error(err));

export default server;
