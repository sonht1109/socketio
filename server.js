const io = require('socket.io')(6969, {
    cors: {
        origin: '*'
    }
})

const users = {}

io.on('connection', socket=>{
    socket.on('new-user', name=>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-mess', mess=> {
        socket.broadcast.emit('chat-mess', {
            mess: mess,
            name: users[socket.id]
        })
    })

    socket.on('disconnect', ()=>{
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})