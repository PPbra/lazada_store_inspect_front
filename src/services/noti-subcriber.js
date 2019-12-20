import io from 'socket.io-client';
var socket = io.connect('http://localhost:8081', {reconnect: true});

function subscribeToNoti(cb) {
    console.log("connected!")
    socket.on('get-noti', data => {
        cb(data)
    });
}
export { subscribeToNoti };