
const express = require('express')
const cors = require('cors')



const app = express()
const http = require('http').createServer(app)

const io = require ('socket.io')(http,{
    cors:{
        origin: '*'
    }
})

app.get('/',(req,res)=>{
    res.send('hello world')
})


const userList = new Map()

io.on('connection',(socket)=>{
    let userName = socket.handshake.query.userName
    addUser(userName,socket.id)
    


    socket.broadcast.emit('user_list',[...userList.keys()])
    socket.emit('user_list',[...userList.keys()])

    socket.on('message',(msg)=>{
    socket.broadcast.emit('message_brodcast',{message:msg,userName:userName})
    })

    socket.on('disconnect',(reason)=>{
        removeUser(userName,socket.id)
    })
})

function addUser(userName,id){
    if (!userList.has(userName)) {
        userList.set(userName,new Set(id))
    }else{
        userList.get(userName).add(id)
    }
}

function removeUser(userName,id) {
    if (userList.has(userName)) {
        let userIds = userList.get(userName)
        if (userIds.size==0) {
            userList.delete(userName)
        }
    }   
}

http.listen(3000,()=>{
    console.log('server is running');
})