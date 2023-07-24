const express = require('express')
const app = express()
const http = require('http').createServer(app)


const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

//Socket.io

const io = require('socket.io')(http)

// this specifies that when any browser is connected it shows the status as connected (in terminal also)
io.on('connection',(socket) => {
    console.log('Connected...')
    socket.on('message',(msg) => {
        socket.broadcast.emit('message', msg)
    })
})

//To start write in console cd to chatapp and write npm run dev