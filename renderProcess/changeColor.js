var {ipcRenderer} = require('electron');

var num = document.querySelector('.result-text');

//监听主进程发送过来的消息，改变数字的颜色
ipcRenderer.on('doChangeCol', (e, msg) => {
    num.style.color = msg
});

ipcRenderer.on('finishLoad', (e, msg) => {
    // alert(msg)
});