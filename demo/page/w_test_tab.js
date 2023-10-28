
(function(root) {
    root = root || global
    
class w_test_tab extends pbwindow {


  constructor(options) {
    let props = {
      "name": "w_test_tab",
      "width": 694,
      "height": 358,
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
      "x": 22,
      "y": 288,
      "width": 100,
      "height": 32,
      "taborder": "30",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "窗口按钮",
      "events": {
        "clicked": "cb_2_clicked"
      }
    }, this);
    this.tab_1 = create(tab, {
      "name": "tab_1",
      "x": 20,
      "y": 6,
      "width": 645,
      "height": 267,
      "taborder": "10",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "backcolor": "#F0F0F0",
      "raggedright": "true",
      "focusonbuttondown": "true",
      "selectedtab": "1",
      "events": {
        "create": "tab_1_create",
        "destroy": "tab_1_destroy"
      }
    }, this);
    this.control = [this.cb_2, this.tab_1];
  }


  destroy() {
    destroy(this.cb_2);
    this.cb_2 = null;
    destroy(this.tab_1);
    this.tab_1 = null;
  }


  async cb_2_clicked() {
    await messagebox(``, `窗口按钮事件`);
  }


  async tab_1_create() {
    this.tabpage_1 = create(userobject, {
      "name": "tabpage_1",
      "x": 4,
      "y": 30,
      "width": 637,
      "height": 233,
      "backcolor": "#F0F0F0",
      "text": "首页",
      "tabtextcolor": "33554432",
      "picturemaskcolor": "536870912",
      "events": {
        "create": "tabpage_1_create",
        "destroy": "tabpage_1_destroy"
      }
    }, this);
    this.control = [this.tabpage_1];
  }


  async tab_1_destroy() {
    destroy(this.tabpage_1);
    this.tabpage_1 = null;
  }


  async tabpage_1_create() {
    this.cb_1 = create(commandbutton, {
      "name": "cb_1",
      "x": 67,
      "y": 57,
      "width": 100,
      "height": 32,
      "taborder": "20",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "tab按钮",
      "events": {
        "clicked": "cb_1_clicked"
      }
    }, this);
    this.control = [this.cb_1];
  }


  async tabpage_1_destroy() {
    destroy(this.cb_1);
    this.cb_1 = null;
  }


  async cb_1_clicked() {
    await messagebox(``, `tab按钮事件`);
  }
}

root.w_test_tab = w_test_tab;
})(typeof window !== "undefined" ? window : null);
