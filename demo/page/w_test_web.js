
(function(root) {
    root = root || global
    

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
}

root.w_test_web = w_test_web;
})(typeof window !== "undefined" ? window : null);
