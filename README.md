# pbtoweb
Convert Powerbuilder UI to web Automatically.

**Read this in other languages: [English](README_EN.md), [中文](README.md).**

## 支持转换控件
* [x] Window
* [x] DataWindow
* [x] CommandButton
* [x] CheckBox
* [x] RadioButton
* [x] Tab
* [x] DropdownListbox
* [x] StaticText
* [x] EditMask
* [x] SinglelineEdit
* [x] GroupBox
* [x] UserObject
* [x] Progress
* [x] Picture
* [x] Line
* [x] Oval
* [x] Rectangle
* [ ] TreeView

## 转换功能
* [x] 窗口转换
* [x] 对象转换
* [x] 事件转换
* [x] 全局函数
* [x] 嵌入式SQL

## 使用说明：
1. 如未安装nodejs, 需要安装nodejs， 可以 https://nodejs.org/en 下载安装
2. 进入命令行窗口cmd, 输入以下命令安装pbtoweb
如已经安装pbtoweb，先卸载
```shell
npm uninstall pbtoweb -g
```  
```shell
npm i pbtoweb -g
```   

1. 导出pb代码，包括窗口和继承的对象到一个目录（如示例中的pbocde目录中）,也可以使用tool/pbldump 工具导出整个pbl到指定文件夹中，pbldump在安装的pbtoweb目录中，目录可以通过命令`npm config get prefix` 查看
2. 如果要转化单独的窗口，输入命令
```shell
pbtoweb convert d:/pbcode w_test_amis d:/demo/page/w_test_amis.js --js
```
如需转换该窗口和关联对象
```shell
pbtoweb convert d:/pbcode w_test_amis d:/demo/page/w_test_amis.js --js --r
```
如需转换所有对象
```shell
pbtoweb convert d:/pbcode all d:/demo/page/index.js --js
```

窗口将转化为web窗口form.js, 参数说明如下：
|参数|说明|
|----|----|
convert|执行的命令|
pbcode|pb导出的源码目录,需要包括继承的对象|
w_test_amis|源码的窗口名或者all,为all表示导出所有对象|
d:/w_test_amis.js|导出的文件名或者文件夹（参数为all时只找文件夹)|
--js|导出为js窗口文件|

## 单独网页中查看
1. 下载源码的文件夹demo
2. 放到文件服务器中，如ngnix等，或者直接放到下载的satrda的 server/public 目录, 运行satserver.exe
3. 浏览器输入 http://127.0.0.1:5555/demo
其中demo/page文件夹中是导出的所有文件 

## 在satweb中显示效果
1. 将生成的form.js放到 server\plugins\web\dist\data\page 目录下面,并运行satserver.exe
2. 浏览器输入 http://127.0.0.1:5555/webui ,如果未配置数据库，请参考http://www.satrda.com/doc/satweb/config.html 中的开始使用配置
3. 在系统管理->菜单管理中随意找一个菜单，点击修改  修改-> 组件路径:amispage, 路由地址为 /data/page/vd.js 并保存。
4. 刷新浏览器进入菜单可以看到效果。参考demo/vd.js 中的事件可以写实现自己的事件，代码基本和pb一样
了解更多satweb可以进入 http://www.satrda.com/doc/satweb/config.html

## 在amis网站上查看效果
1. 命令行运行以下命令,会导出amis的json文件
```shell
pbtoweb convert d:/pbcode w_test_amis d:/out.json --demo
```

2. 打开d:/out.json并复制文本
3. 进入 [amis网站](https://aisuda.bce.baidu.com/amis/zh-CN/components/page), 找一个示例点击编码代码
4. 粘贴就可以

## 代码说明
导出后的form.js类似这样
```js
class w_test_web extends pbwindow {
    
  constructor(options) {
    let props = {
      "name": "w_test_web",
      "width": 694,
      "height": 330,
      "titlebar": "true",
      "title": "Untitled",
      "controlmenu": "true",
      "minbox": "true",
      "maxbox": "true",
      "resizable": "true",
      "backcolor": "#F0F0F0",
      "icon": "AppIcon!",
      "center": "true"
    };
    Object.assign(props, options);
    super(props);
  }
    // Events
  create() {
    this.cb_2 = create(commandbutton, {
      "name": "cb_2",
      "x": 198,
      "y": 58,
      "width": 100,
      "height": 32,
      "taborder": "20",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "按钮二",
      "events": {
        "clicked": "cb_2_clicked"
      }
    }, this);
    this.cb_1 = create(commandbutton, {
      "name": "cb_1",
      "x": 87,
      "y": 60,
      "width": 100,
      "height": 32,
      "taborder": "10",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "按钮一",
      "events": {
        "clicked": "cb_1_clicked"
      }
    }, this);
    this.control = [this.cb_2, this.cb_1];
  }

  destroy() {
    destroy(this.cb_2);
    this.cb_2 = null;
    destroy(this.cb_1);
    this.cb_1 = null;
  }

  cb_2_clicked() {//
  }

  cb_1_clicked() {//messagebox("", cb_1.text)
  }

  onOpen() {
  }

  onResize(sizetype, newwidth, newheight) {
  }

  onClose() {
  }
}
```
代码事件对应关系

|JS事件|PB事件|说明|
| --- | --- | --- |
onOpen|open|窗口打开,如没有可自行添加
onResize|resize|窗口改变大小,如没有可自行添加
onClose|close|窗口关闭,如没有可自行添加
cb_1_clicked|click!|名称为cb_1控件的click事件，根据按钮的click事件自动生成|

程序会自动转化代码，也可以在事件中添加自己的处理代码，控件操作和pb中基本一致
```js
  ...
  onResize(sizetype, newwidth, newheight) {
    this.cb_1.x = 10;
    this.cb_1.y = 100;
    this.cb_1.resize(100, 30);
  }

  async cb_3_clicked(e, props) {
    let ll_rtn = await PB.messageBox("消息", "您好", "", "YesNo!");
    if (ll_rtn == 1)  {
      this.tab_1.tabpage_2.cbx_1.checked = true;
      this.tab_1.tabpage_2.cbx_2.checked = false;
    } else {
      this.tab_1.tabpage_2.cbx_2.checked = true;
      this.tab_1.tabpage_2.cbx_1.checked = false;
    }
    console.log(ll_rtn);
  }


  cb_2_clicked(e, props) {
    // code
    this.tab_1.tabpage_2.sle_1.text = "amis演示";
    this.tab_1.tabpage_2.cbx_2.checked = true;
  }


  cb_1_clicked(e, props) {
    // code
    this.tab_1.tabpage_1.dw_1.retrieve()
  }
```

## 对象补充
我实现了常用的pb标准对象和函数，标准对象和函数可以在pbvm.js中进行查看, 代码如下：
```js
...
let PB = {
    create(cls, options, parent2) {
      const a = new cls(options, parent2);
      return a;
    },
    destroy(obj) {
    },
    trim(str) {
      return str.trim();
    },
    lefttrim(str) {
      return str.trimStart();
    },
    righttrim(str) {
      return str.trimEnd();
    },
    ...
    //可以补充自己的函数在这里 
}
...
// checkbox控件,可以参考补充控件
class checkbox extends windowobject {
  _className = "checkbox";
  toUI(options) {
    const attr = this._pbprops;
    let actl = super.toUI(options);
    delete actl.tpl;
    actl.type = "checkbox";
    actl.option = attr.text;
    return actl;
  }
  get checked() {
    return this.text;
  }
  set checked(value) {
    this.text = !!value;
  }
}
root.checkbox = checkbox;

```
如果代码中有没有找到的对象，如一些第三方对象，会自动在other.js中定义该对象，如果没有添加的也可以自己在other.js中添加实现，添加后可以正常运行,如
```js
(function(root) {
    root = root || global

//实现 uo_webbrowser,代码中使用了uo_webbrowser可以正常运行
class uo_webbrowser extends multilineedit {
    _className = 'uo_webbrowser'
}

root.uo_webbrowser = uo_webbrowser;
})(typeof window !== "undefined" ? window : null);
```
如果用到了第三方控件，如解析json的uo_json，因为用到了第三方dll没办法直接转代码，
因为js原生支持json,我们可以在other.js中添加一个uo_json对象，如下:
```js
(function(root) {
    root = root || global
...
//实现 uo_json, 只是举例未完全实现，建议是通过js代码改写,如果使用太多，才构造对象.
class uo_json extends nonvisualobject {
    _className = 'uo_json'
    _json = {};
    set(key, value) {
      _json[key] = value;
    }
}

root.uo_webbrowser = uo_webbrowser;
})(typeof window !== "undefined" ? window : null);
```
如果一些pb运行函数没有实现，请修改`src/pbvm.js`进行函数添加或者pb标准对象的实现，并放到`demo/common`中可以看到效果。
如果补充了`pbvm.js`标准库，请联系我(9091178@qq.com)更新，方便大家使用。感谢贡献力量推动pbtoweb前进。



更多信息，QQ群：836173975