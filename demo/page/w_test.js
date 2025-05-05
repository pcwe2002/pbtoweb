
(function(root) {
    root = root || this || global
    
class w_test extends pbwindow {


  constructor(options, parent) {
    let props = {
      "name": "w_test",
      "tag": "尼玛",
      "width": 534,
      "height": 399,
      "titlebar": "true",
      "title": "测试一把",
      "controlmenu": "true",
      "minbox": "true",
      "maxbox": "true",
      "resizable": "true",
      "backcolor": "#a6caf0",
      "icon": "AppIcon!",
      "center": "true"
    };
    super(props, parent);
  }
    // Events

  create() {
    this.cb_3 = create(commandbutton, {
      "name": "cb_3",
      "x": 286,
      "y": 39,
      "width": 100,
      "height": 33,
      "taborder": "10",
      "textsize": 12,
      "weight": "400",
      "facename": "Tahoma",
      "text": "none",
      "events": {
        "clicked": "cb_3_clicked"
      }
    }, this);
    this.cb_2 = create(commandbutton, {
      "name": "cb_2",
      "x": 178,
      "y": 62,
      "width": 100,
      "height": 33,
      "taborder": "20",
      "textsize": 12,
      "weight": "400",
      "facename": "Tahoma",
      "text": "测算",
      "events": {
        "clicked": "cb_2_clicked"
      }
    }, this);
    this.dw_1 = create(datawindow, {
      "name": "dw_1",
      "x": 21,
      "y": 110,
      "width": 486,
      "height": 195,
      "taborder": "20",
      "title": "none",
      "dataobject": "d_test1",
      "livescroll": true,
      "events": {
        "rbuttondown": "dw_1_rbuttondown"
      }
    }, this);
    this.cb_1 = create(commandbutton, {
      "name": "cb_1",
      "tag": "尼玛",
      "accessiblename": "abc",
      "accessibledescription": "def",
      "x": 404,
      "y": 39,
      "width": 100,
      "height": 33,
      "taborder": "10",
      "textsize": 12,
      "weight": "400",
      "facename": "Tahoma",
      "pointer": "Icon!",
      "text": "测试1",
      "events": {
        "clicked": "cb_1_clicked"
      }
    }, this);
    this.control = [this.cb_3, this.cb_2, this.dw_1, this.cb_1];
  }


  destroy() {
    destroy(this.cb_3);
    this.cb_3 = null;
    destroy(this.cb_2);
    this.cb_2 = null;
    destroy(this.dw_1);
    this.dw_1 = null;
    destroy(this.cb_1);
    this.cb_1 = null;
  }


  onResize(sizetype, newwidth, newheight) {
    this.cb_1.x = newwidth - unitstopixels(650, "x!");
  }


  onOpen() {
    this.dw_1.insertrow(0);
    this.dw_1.setitem(1, "aa", 1);
    this.dw_1.setitem(1, "bb", "张磊");
    this.dw_1.setitem(1, "cc", 18.5);
  }


  async cb_3_clicked() {
    //messagebox( ""  , a )
    await messagebox("", this.dw_1.getitemstring(1, "aa"));
    await messagebox("", this.dw_1.getitemstring(1, "bb"));
    await messagebox("", this.dw_1.getitemstring(1, "cc"));
  }


  cb_2_clicked() {
    this.dw_1.print();
  }


  async dw_1_rbuttondown(ev, row, dwo, evt) {
    //
    //await messagebox("", "123");
    //console.log('rbuttondown');
    const menus = [
      { key: 'open', title: '编辑' },
      { key: 'divider'},
      { key: 'c1', title: '右键1' },
      { key: 'c2', title: '右键2' },
    ];
    H5UI.ContextMenu.showMenu(evt, menus, (key) => {
      console.log('menu clicked', key);
      messagebox("", key);
    });
  }


  async cb_1_clicked() {
    let i = 0,
      sum = 0;
    for (i = 1; i <= 100; i += 1) {
      sum = sum + i;
    }
    await messagebox("", sum);
  }
}

root.w_test = w_test;
})(typeof window !== "undefined" ? window : null);
