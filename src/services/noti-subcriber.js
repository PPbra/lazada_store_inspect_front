import io from 'socket.io-client';
var socket = io.connect('http://34.221.114.49:8081', {reconnect: true});

function subscribeToNoti(cb) {
    console.log("connected!")
    socket.on('get-noti', data => {
        cb(data)
    });
}
export { subscribeToNoti };