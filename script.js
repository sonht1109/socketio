const socket = io('http://localhost:6969')

const form = document.querySelector('form')
const messContainer = document.querySelector('.mess')
const input = document.querySelector('input[type="text"]')

const name = prompt("Your username: ") || "User"
addMess("You", "have connected !", "inform")
socket.emit('new-user', name)

socket.on('chat-mess', data => {
    addMess(data.name, data.mess, "mess-receive")
})

socket.on('user-connected', name=>{
    addMess(name, "have connected !", "inform")
})

socket.on('user-disconnected', name => {
    addMess(name, "have disconnected !", "inform")
})

form.addEventListener('submit', e=>{
    e.preventDefault()
    const mess = input.value
    if(mess !== ""){
        addMess("You", mess, "mess-send")
        socket.emit("send-mess", mess)
        input.value = ''
    }
})

function addMess(name, mess, type){
    const messElement = document.createElement('div')
    const p = document.createElement('p')
    const span = document.createElement('span')
    switch(type){
        case "inform":
            p.innerText = `${name} ${mess}`
            p.classList.add('inform')
            messContainer.append(p)
            break;
        case "mess-send":
        case "mess-receive":
            messElement.classList.add(type)
            span.innerText = name
            p.innerText = mess
            messElement.append(span)
            messElement.append(p)
            messContainer.append(messElement)
            break;
    }
}