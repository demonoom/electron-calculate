var {ipcRenderer} = require('electron');

var remote = require('electron').remote;
var btns = document.getElementById('box').querySelectorAll('span');

for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = (e) => {
        //遍历，为每一个元素绑定点击事件，使用ipcRenderer从渲染进程向主进程发送颜色信息
        ipcRenderer.send('changeCol', e.target.getAttribute('data-color'));

        //遍历，通过更改global全局变量将颜色信息存储进去，想在另一个渲染进程监听改变后变色，但是无法监听这个值的改变，于是作罢
        // remote.getGlobal('numCol').color = e.target.getAttribute('data-color')
    }
}