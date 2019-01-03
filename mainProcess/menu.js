const {Menu, BrowserWindow, dialog, ipcMain} = require('electron');
var path = require('path');
const url = require('url');

//构建具体的菜单项
let template = [
    //单个菜单项
    {
        label: '计算器',
        submenu: [
            {
                label: '关于',
                click: function () {
                    hm_aboutWindow()
                }
            },
            {
                label: '退出',
                // role: 'quit'
                click: function (item, win, event) {
                    //询问用户是否真的需要退出
                    dialog.showMessageBox({
                        //设置当前消息框的类型
                        type: 'info',
                        //标题
                        title: '退出提示',
                        message: "请问是否真的要退出",
                        buttons: ['确定', '取消']
                    }, (index) => {
                        if (index == 0) {
                            //销毁当前窗体
                            win.destroy()
                        }
                    })
                }
            }
        ]
    },
    {
        label: '格式',
        submenu: [
            {
                label: '颜色',
                // accelerator: 'F11',   设置快捷键
                accelerator: (function () {
                    //判断系统的类型
                    if (process.platform == 'darwin') {
                        return 'Command + shift + c'
                    } else {
                        return 'control + shift + c'
                    }
                })(),
                click: function () {
                    hm_setCol()
                }
            },
            {
                label: '字体增大',
                accelerator: 'F11',
                click: function () {

                }
            },
            {
                label: '字体减小',
                accelerator: 'F12',
                click: function () {

                }
            },
            {
                label: '恢复默认',
                accelerator: 'F10',
                click: function () {

                }
            }
        ]
    }
];

//为应用程序构建菜单项
let menu = Menu.buildFromTemplate(template);

//将构建好的菜单项添加到应用程序
Menu.setApplicationMenu(menu);

//展示关于页面
function hm_aboutWindow() {
    let win = new BrowserWindow({
        width: 250,
        height: 250,
        title: '关于noom计算器',
        webPreferences: {
            webSecurity: false
        }
    });

    //设置当前窗体不显示菜单项（怎么没用？？？）
    // win.setMenu(null);   没用  发现新API可用
    win.setMenuBarVisibility(false);

    //加载about静态页面
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../views/about.html'),
        protocol: 'file:',
    }));

    // win.webContents.openDevTools();
}

//展示选择颜色页面
function hm_setCol() {
    let win = new BrowserWindow({
        width: 250,
        height: 60,
        title: '选择颜色',
        resizable: false
    });

    // win.webContents.openDevTools();

    win.loadURL(url.format({
        pathname: path.join(__dirname, '../views/color.html'),
        protocol: 'file:'
    }));

    win.setMenuBarVisibility(false)
}

