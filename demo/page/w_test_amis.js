
(function(root) {
    root = root || global
    
class w_test_amis extends pbwindow {


  constructor(options) {
    let props = {
      "name": "w_test_amis",
      "width": 709,
      "height": 461,
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
    this.cb_7 = create(commandbutton, {
      "name": "cb_7",
      "x": 445,
      "y": 7,
      "width": 100,
      "height": 32,
      "taborder": "30",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "visible",
      "events": {
        "clicked": "cb_7_clicked"
      }
    }, this);
    this.cb_4 = create(commandbutton, {
      "name": "cb_4",
      "x": 334,
      "y": 6,
      "width": 100,
      "height": 32,
      "taborder": "30",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "enabled",
      "events": {
        "clicked": "cb_4_clicked"
      }
    }, this);
    this.cb_3 = create(commandbutton, {
      "name": "cb_3",
      "x": 229,
      "y": 6,
      "width": 100,
      "height": 32,
      "taborder": "20",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "弹框提示",
      "events": {
        "clicked": "cb_3_clicked"
      }
    }, this);
    this.tab_1 = create(tab, {
      "name": "tab_1",
      "x": 16,
      "y": 45,
      "width": 672,
      "height": 374,
      "taborder": "30",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "backcolor": "#F0F0F0",
      "raggedright": "true",
      "focusonbuttondown": "true",
      "selectedtab": "1",
      "events": {
        "create": "tab_1_create",
        "destroy": "tab_1_destroy",
        "selectionchanged": "tab_1_selectionchanged"
      }
    }, this);
    this.cb_2 = create(commandbutton, {
      "name": "cb_2",
      "x": 122,
      "y": 6,
      "width": 100,
      "height": 32,
      "taborder": "20",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "设置",
      "events": {
        "clicked": "cb_2_clicked"
      }
    }, this);
    this.cb_1 = create(commandbutton, {
      "name": "cb_1",
      "x": 12,
      "y": 6,
      "width": 100,
      "height": 32,
      "taborder": "10",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "检索",
      "events": {
        "clicked": "cb_1_clicked"
      }
    }, this);
    this.control = [this.cb_7, this.cb_4, this.cb_3, this.tab_1, this.cb_2, this.cb_1];
  }


  destroy() {
    destroy(this.cb_7);
    this.cb_7 = null;
    destroy(this.cb_4);
    this.cb_4 = null;
    destroy(this.cb_3);
    this.cb_3 = null;
    destroy(this.tab_1);
    this.tab_1 = null;
    destroy(this.cb_2);
    this.cb_2 = null;
    destroy(this.cb_1);
    this.cb_1 = null;
  }


  onResize(sizetype, newwidth, newheight) {// resize
  }


  cb_7_clicked() {
    //messagebox("",tab_1.tabpage_2.ddlb_1.text)
    this.tab_1.tabpage_2.sle_1.visible = !this.tab_1.tabpage_2.sle_1.visible;
  }


  cb_4_clicked() {
    //messagebox("",tab_1.tabpage_2.ddlb_1.text)
    this.tab_1.tabpage_2.sle_1.enabled = !this.tab_1.tabpage_2.sle_1.enabled;
  }


  async cb_3_clicked() {
    let ll_rtn = 0;
    ll_rtn = await messagebox(`提示`, `选择1?`, `Information!`, `YesNo!`);
    if (ll_rtn === 1) {
      this.tab_1.tabpage_2.cbx_1.checked = true;
      this.tab_1.tabpage_2.cbx_2.checked = false;
    } else {
      this.tab_1.tabpage_2.cbx_2.checked = true;
      this.tab_1.tabpage_2.cbx_1.checked = false;
    }
  }


  async tab_1_create() {
    this.tabpage_1 = create(userobject, {
      "name": "tabpage_1",
      "x": 4,
      "y": 30,
      "width": 664,
      "height": 340,
      "backcolor": "#F0F0F0",
      "text": "第1页",
      "tabtextcolor": "33554432",
      "picturemaskcolor": "536870912",
      "events": {
        "create": "tabpage_1_create",
        "destroy": "tabpage_1_destroy"
      }
    }, this);
    this.tabpage_2 = create(userobject, {
      "name": "tabpage_2",
      "x": 4,
      "y": 30,
      "width": 664,
      "height": 340,
      "backcolor": "#F0F0F0",
      "text": "第2页",
      "tabtextcolor": "33554432",
      "picturemaskcolor": "536870912",
      "events": {
        "create": "tabpage_2_create",
        "destroy": "tabpage_2_destroy"
      }
    }, this);
    this.control = [this.tabpage_1, this.tabpage_2];
  }


  async tab_1_destroy() {
    destroy(this.tabpage_1);
    this.tabpage_1 = null;
    destroy(this.tabpage_2);
    this.tabpage_2 = null;
  }


  async tab_1_selectionchanged() {
    this.tab_1.tabpage_1.dw_1.retrieve();
  }


  async tabpage_1_create() {
    this.cb_6 = create(commandbutton, {
      "name": "cb_6",
      "x": 130,
      "y": 293,
      "width": 100,
      "height": 32,
      "taborder": "80",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "保存",
      "events": {
        "clicked": "cb_6_clicked"
      }
    }, this);
    this.cb_5 = create(commandbutton, {
      "name": "cb_5",
      "x": 18,
      "y": 294,
      "width": 100,
      "height": 32,
      "taborder": "70",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "插入",
      "events": {
        "clicked": "cb_5_clicked"
      }
    }, this);
    this.dw_1 = create(datawindow, {
      "name": "dw_1",
      "x": 10,
      "y": 15,
      "width": 638,
      "height": 257,
      "taborder": "30",
      "title": "none",
      "dataobject": "d_test1",
      "livescroll": "true"
    }, this);
    this.control = [this.cb_6, this.cb_5, this.dw_1];
  }


  async tabpage_1_destroy() {
    destroy(this.cb_6);
    this.cb_6 = null;
    destroy(this.cb_5);
    this.cb_5 = null;
    destroy(this.dw_1);
    this.dw_1 = null;
  }


  async cb_6_clicked() {
    //tab_1.tabpage_1.dw_1.setTransObject(sqlca)
    //tab_1.tabpage_1.dw_1.update()
    this.cb_3.triggerevent(`clicked`);
  }


  async cb_5_clicked() {
    this.tab_1.tabpage_1.dw_1.insertrow(0);
  }


  async tabpage_2_create() {
    this.p_1 = create(picture, {
      "name": "p_1",
      "x": 459,
      "y": 7,
      "width": 177,
      "height": 107,
      "picturename": "./image/1.jpeg",
      "focusrectangle": "false"
    }, this);
    this.hpb_1 = create(hprogressbar, {
      "name": "hpb_1",
      "x": 32,
      "y": 290,
      "width": 577,
      "height": 17,
      "minposition": 10,
      "maxposition": 100,
      "position": 70,
      "setstep": 10
    }, this);
    this.rb_3 = create(radiobutton, {
      "name": "rb_3",
      "x": 292,
      "y": 197,
      "width": 100,
      "height": 23,
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "k2"
    }, this);
    this.rb_2 = create(radiobutton, {
      "name": "rb_2",
      "x": 292,
      "y": 162,
      "width": 100,
      "height": 23,
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "k1"
    }, this);
    this.rb_1 = create(radiobutton, {
      "name": "rb_1",
      "x": 16,
      "y": 203,
      "width": 80,
      "height": 23,
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "none"
    }, this);
    this.cbx_2 = create(checkbox, {
      "name": "cbx_2",
      "x": 108,
      "y": 163,
      "width": 100,
      "height": 23,
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "选项2",
      "checked": "true"
    }, this);
    this.cbx_1 = create(checkbox, {
      "name": "cbx_1",
      "x": 19,
      "y": 163,
      "width": 100,
      "height": 23,
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "选项1"
    }, this);
    this.ddlb_1 = create(dropdownlistbox, {
      "name": "ddlb_1",
      "x": 71,
      "y": 118,
      "width": 183,
      "height": 113,
      "taborder": "50",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "item[]": ["中国", "美国", "日本"]
    }, this);
    this.st_2 = create(statictext, {
      "name": "st_2",
      "x": 19,
      "y": 81,
      "width": 45,
      "height": 18,
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "数字",
      "focusrectangle": "false"
    }, this);
    this.em_1 = create(editmask, {
      "name": "em_1",
      "x": 71,
      "y": 74,
      "width": 344,
      "height": 32,
      "taborder": "40",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "enabled": false,
      "text": "2020-1-2",
      "mask": "yyyy-mm-dd",
      "increment": 1,
      "minmax": "1~20"
    }, this);
    this.sle_1 = create(singlelineedit, {
      "name": "sle_1",
      "x": 72,
      "y": 21,
      "width": 206,
      "height": 32,
      "taborder": "40",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "text": "1111"
    }, this);
    this.st_1 = create(statictext, {
      "name": "st_1",
      "x": 25,
      "y": 28,
      "width": 48,
      "height": 18,
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "演示",
      "focusrectangle": "false"
    }, this);
    this.gb_1 = create(groupbox, {
      "name": "gb_1",
      "x": 277,
      "y": 128,
      "width": 272,
      "height": 141,
      "taborder": "60",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "KKKK"
    }, this);
    this.control = [this.p_1, this.hpb_1, this.rb_3, this.rb_2, this.rb_1, this.cbx_2, this.cbx_1, this.ddlb_1, this.st_2, this.em_1, this.sle_1, this.st_1, this.gb_1];
  }


  async tabpage_2_destroy() {
    destroy(this.p_1);
    this.p_1 = null;
    destroy(this.hpb_1);
    this.hpb_1 = null;
    destroy(this.rb_3);
    this.rb_3 = null;
    destroy(this.rb_2);
    this.rb_2 = null;
    destroy(this.rb_1);
    this.rb_1 = null;
    destroy(this.cbx_2);
    this.cbx_2 = null;
    destroy(this.cbx_1);
    this.cbx_1 = null;
    destroy(this.ddlb_1);
    this.ddlb_1 = null;
    destroy(this.st_2);
    this.st_2 = null;
    destroy(this.em_1);
    this.em_1 = null;
    destroy(this.sle_1);
    this.sle_1 = null;
    destroy(this.st_1);
    this.st_1 = null;
    destroy(this.gb_1);
    this.gb_1 = null;
  }


  async cb_2_clicked() {
    this.tab_1.tabpage_2.sle_1.text = `amis演示`;
    this.tab_1.tabpage_2.cbx_2.checked = true;
  }


  async cb_1_clicked() {
    this.tab_1.tabpage_1.dw_1.retrieve();
  }
}

root.w_test_amis = w_test_amis;
})(typeof window !== "undefined" ? window : null);
