import { Server } from 'socket.io'
import express from 'express'
import http from 'http'
import os from 'os'
import cors from 'cors'
const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })
const PORT = process.env.PORT || 4000
app.use(cors())
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
  socket.on('join-room', (data) => {
    socket.join(data.roomId)
    socket.broadcast.to(data.roomId).emit('user-joined', data)
  })

  socket.on('send-message', (data) => {
    socket.broadcast.to(data.roomId).emit('incoming-message', data)
  })
})

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
