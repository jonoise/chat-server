import { Server } from 'socket.io'
import express from 'express'
import http from 'http'
import os from 'os'
const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })
const PORT = process.env.PORT || 4000
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('s', (msg) => {
    console.log(msg)
    socket.emit('r', `Hello from ${os.hostname()}`)
  })
})

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
