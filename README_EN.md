# pbtoweb
Convert Powerbuilder UI to web Automatically.

**Read this in other languages: [English](README_EN.md), [中文](README.md).**

## Supported Conversion Controls
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
* [ ] TreeView

## Conversion Features
* [x] Window
* [x] Object
* [x] Event
* [x] Global functions
* [x] Embedded SQL

## Usage:

1. If Node.js is not installed, you need to install it. You can download and install Node.js from https://nodejs.org/en.
2. Export the pb code, including the window and inherited objects to a directory (such as the pbcode directory in the example).
3. Open the command line window (cmd), and enter the following command to install pbtoweb.
```shell
npm i pbtoweb -g
```      
4. If you want to convert a single window:
```shell
pbtoweb convert d:/pbcode w_test_amis d:/demo/page/w_test_amis.js --js
```

If you want to convert all objects:
```shell
pbtoweb convert d:/pbcode all d:/demo/page/index.js --js
```

The window will be converted to a web window form.js. The parameters are explained below:
|Parameter|Description|
|----|----|
convert|The command being executed|
pbcode|The directory where the pb exported source code is located, including inherited objects|
w_test_amis|The source code window name or all, indicating all objects are exported|
d:/w_test_amis.js|The exported file name or folder (when 'all' is specified, only the folder will be searched)|
--js|Export as a js window file|

## View in Individual Webpage
1. Download the demo folder of the source code.
2. Place it on a file server such as ngnix, or directly put it in the server/public directory of the downloaded satrda and run satserver.exe.
3. Enter http://127.0.0.1:5555/demo in the browser, where the demo/page folder contains all the exported files.

## Display Effects in satweb
1. Place the generated form.js file in the server\plugins\web\dist\data\page directory and run satserver.exe.
2. Enter http://127.0.0.1:5555/webui in the browser, if the database is not configured, please refer to the "Getting Started" configuration in http://www.satrda.com/doc/satweb/config.html.
3. Choose any menu in System Management -> Menu Management, click on Modify, then select the component path: amispage, and set the route address to /data/page/vd.js and save it.
4. Refresh the browser and enter the menu to see the effect. You can refer to the events in demo/vd.js to implement your own events, which are basically similar to pb code. For more information about satweb, please visit http://www.satrda.com/doc/satweb/config.html.
   
## View Effects on amis Website
1. Run the following command in the command line to export the amis JSON file:
```shell
pbtoweb convert d:/pbcode w_test_amis d:/out.json --demo
```
2. Open d:/out.json and copy the text.
3. Go to the amis website (https://aisuda.bce.baidu.com/amis/zh-CN/components/page), find an example, and click on the "Code" button.
4. Paste the copied text into the code editor to view the effect.

## Code Description:
The exported form.js is similar to this: [Provide a sample of the exported form.js here]
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
Code Event Correspondence

|JS Event|PB Event|Description|
| --- | --- | --- |
onOpen|open|Window opening, if not available, can be added manually.
onResize|resize|Window resizing, if not available, can be added manually.
onClose|close|Window closing, if not available, can be added manually.
cb_1_clicked|click!|Click event for the control named cb_1 is automatically generated based on the button's click event.|

The program can automatically convert code, and you can also add your own processing code in the event. Control operations are basically the same as in PB.

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

## Object Supplement
I have implemented commonly used pb standard objects and functions. The standard objects and functions can be viewed in pbvm.js. The code is as follows:
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
    //You can add your own functions here
}
...
// checkbox,You can refer to the supplementary controls
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
The following is in English: If there are objects not found in the code, such as some third-party objects, they will be automatically defined in other.js. If they are not added, you can add them in other.js yourself. After adding them, they can run normally, such as
```js
(function(root) {
    root = root || global

//To implement uo_webbrowser, the code uses uo_webbrowser to run normally.
class uo_webbrowser extends multilineedit {
    _className = 'uo_webbrowser'
}

root.uo_webbrowser = uo_webbrowser;
})(typeof window !== "undefined" ? window : null);
```
If a third-party control is used, such as uo_json for parsing JSON, because the third-party DLL cannot be directly converted into code, since JS natively supports JSON, we can add an uo_json object in other.js. For example:
```js
(function(root) {
    root = root || global
...
//To implement uo_json, it is only an example and not fully implemented. It is recommended to rewrite it using js code, and only construct objects if there are too many of them.
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
If some pb runtime functions have not been implemented, please modify `src/pbvm.js` to add functions or implement pb standard objects, and put them in `demo/common` to see the effect. 

If you have supplemented the standard library of `pbvm.js`, please contact me (`9091178@qq.com`) to update it, so that everyone can use it conveniently. Thank you for contributing to the development of pbtoweb. 

For more information, please join QQ group: 836173975.