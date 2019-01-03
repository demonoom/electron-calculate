//electron项目的入口文件
//开启一个应用，需要引入app
const {app, BrowserWindow, ipcMain} = require('electron');
var path = require('path');
const url = require('url');

//当我们启动main.js文件的时候，会自动的出发app的ready事件
app.on('ready', function () {
    //在这个事件中，一般进行当前应用的窗口的创建
    hm_createWindow()
});

//通过一个函数来创建应用的窗口
let win;

function hm_createWindow() {
    win = new BrowserWindow({
        //宽度
        width: 300,
        //高度
        height: 480,
        //标题
        title: 'noom计算器'
        //背景色
    });

    //设置窗口中所加载的页面的内容(通过loadURL这个函数可以指定一个静态路径把页面加载在窗口中)

    //采用这种写法页面会白屏，就是缺少protocol: 'file:'的原因，具体尚不知
    // win.loadURL(path.join(__dirname, 'https://www.baidu.com/'));

    win.loadURL(url.format({
        pathname: path.join(__dirname, './views/index.html'),
        protocol: 'file:',
        // slashes: true
    }));

    //打开调试工具
    // win.webContents.openDevTools();

    //添加事件——当窗口关闭的时候出发
    win.on('close', function (event) {
        //将win置为null
        win = null;
        //应用程序的退出
        app.quit();
    });

    //当窗口加载完毕之后，准备显示的时候处罚
    win.on('ready-to-show', function () {
        win.show();
        //将当前窗口激活
        win.focus();
    });

    //主进程主动向渲染进程发送消息,要在webContents的did-finish-load中发送
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('finishLoad', '主进程主动向渲染进程发送消息')
    });

    //引入菜单模块
    require('./mainProcess/menu')
}

//主进程接收渲染进程发送的消息
ipcMain.on('changeCol', (e, msg) => {
    //使用sender.send向渲染进程发送会发送到原来的那个渲染进程，而使用webContents发动会发送到win这个窗体的渲染进程
    // e.sender.send('doChangeCol', msg)
    win.webContents.send('doChangeCol', msg)
});

global.numCol = {
    color: 'white'
};
