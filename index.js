const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const cookieParser = require("cookie-parser");


const PORT = process.env.PORT || 5000;
const habitRoute = require("./src/routes/HabitRoute");
const router = require("./src/routes/userRoute");
const verifyToken = require("./src/middleware/authMiddleware");

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors({
  
  origin: ['http://localhost:3000','https://done.himanshuweb.space'],
  credentials: true,
}));
app.use((req, res, next) => {
  console.log(req.method, req.path,req.ip);
  next();
});

app.get("/", (req, res) => {
  res.json({ routes: ["/habits", "/users"] });
});
// app.get("/ip", (req, res) => {
//   let ip = req.header('x-forwarded-for') || req.ip;
//   console.log(ip)
//   res.json({ip});
// });

app.use("/auth", router);
app.use("/habits", verifyToken, habitRoute);
mongoose
  .connect(
    "mongodb+srv://prasadhimanshu789:bl6MYfdpTXzfdsQB@cluster0.dsuptde.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to db");

    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// import {crypto.randomUUID} from "crypto.randomUUID"
// const crypto = require("crypto");
// // const { v4 } = require('uuid')
// let users=[]
// let habits=[{
//     id: "1",
//     name: "Drinking Water",
//     color: "pink",
//     completed: {
//       "29-04-2023": true,
//       "23-04-2023": true,
//       "22-04-2023": true,
//       "21-04-2023": true,
//       "20-04-2023": true,
//       "19-04-2023": true,
//       "18-04-2023": true,
//       "17-04-2023": true,
//       "01-05-2023": true,
//       "02-05-2023": true,
//       "03-05-2023": true,
//       "04-05-2023": true,
//     }
// }]
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("user connected", socket.id);
//   users.push(socket.id);

//   socket.on("auth", (token) => {
//     console.log(token, "from", socket.id);
//   });
//   socket.on('habitUpdate', (data) => {

//   });
//   socket.on("disconnect", () => {
//     console.log(`User ${socket.id} disconnected.`);
//     users=[...users.filter((userid) => userid !== socket.id)];
//     console.log("ALL USERS", users);
//     // socket.broadcast.emit("updateUsers", userids);
//     socket.disconnect();
//   });
// });
// let userids = [];
// let roomids = [];

// io.on("connection", socket => {
//   console.log(`User connected: ${socket.id}`);

//   socket.emit("me", socket.id);
//   userids.push(socket.id);
//   console.log("ALL USERS",userids);

//   socket.broadcast.emit("updateUsers", userids);

//   socket.on("disconnect", () => {
//     console.log(`User ${socket.id} disconnected.`);
//     userids = userids.filter(userid => userid !== socket.id);
//     console.log("ALL USERS",userids);
//     socket.broadcast.emit("updateUsers", userids);
//     socket.disconnect();
//   });
//   socket.emit("getAllUsers", userids);

//   // rooms
//   socket.on("create_room", () => {
//     const room = {
//       id: crypto.randomUUID(),
//       chat: []
//     };
//     socket.join(room);
//     socket.emit("get_room", room);
//     roomids.push(room);
//     socket.broadcast.emit("updateRooms", roomids);
//     console.log('rooms',roomids)
//   });

//   socket.on("join_room", room => {
//     socket.join(room.id);
//     console.log(`user ${socket.id} joined room: ${room.id}`);
//   });

//   socket.emit('getAllRooms',roomids)
//   socket.broadcast.emit("updateRooms", roomids);
//   socket.on("message", payload => {
//     roomids.map(room =>{
//         if(room.id===payload.room){
//           const singleChat={message: payload.message,writer:payload.socketId};
//           room.chat.push(singleChat);
//           payload.chat=room.chat;
//         }
//     })
//     io.to(payload.room).emit('chat',payload)
//   });

// });
// server.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });
