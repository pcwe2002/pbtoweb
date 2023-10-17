
(function(root) {
    root = root || global
    

class w_websocket extends pbwindow {
    
  constructor(options) {
    let props = {
      "name": "w_websocket",
      "width": 678,
      "height": 436,
      "titlebar": "true",
      "title": "server",
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

  of_append_info(as_info) {
    this.mle_info.text = this.mle_info.text + as_info + `
`;
    this.mle_info.scroll(this.mle_info.linecount());
  }
    // Events
  create() {
    this.cb_4 = create(commandbutton, {
      "name": "cb_4",
      "x": 574,
      "y": 50,
      "width": 77,
      "height": 32,
      "taborder": "20",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "清屏",
      "events": {
        "clicked": "cb_4_clicked"
      }
    }, this);
    this.cb_3 = create(commandbutton, {
      "name": "cb_3",
      "x": 581,
      "y": 356,
      "width": 77,
      "height": 32,
      "taborder": "20",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "发送",
      "events": {
        "clicked": "cb_3_clicked"
      }
    }, this);
    this.sle_context = create(singlelineedit, {
      "name": "sle_context",
      "x": 87,
      "y": 361,
      "width": 482,
      "height": 25,
      "taborder": "30",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "text": "内容1"
    }, this);
    this.st_3 = create(statictext, {
      "name": "st_3",
      "x": 15,
      "y": 364,
      "width": 70,
      "height": 18,
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "内容：",
      "focusrectangle": "false"
    }, this);
    this.sle_server = create(singlelineedit, {
      "name": "sle_server",
      "x": 95,
      "y": 8,
      "width": 373,
      "height": 25,
      "taborder": "10",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "text": "ws://121.40.165.18:8088"
    }, this);
    this.st_server = create(statictext, {
      "name": "st_server",
      "x": 23,
      "y": 11,
      "width": 70,
      "height": 18,
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "server：",
      "focusrectangle": "false"
    }, this);
    this.mle_info = create(multilineedit, {
      "name": "mle_info",
      "x": 15,
      "y": 52,
      "width": 555,
      "height": 295,
      "taborder": "10",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "textcolor": "33554432",
      "hscrollbar": "true",
      "vscrollbar": "true"
    }, this);
    this.cb_2 = create(commandbutton, {
      "name": "cb_2",
      "x": 565,
      "y": 3,
      "width": 86,
      "height": 32,
      "taborder": "10",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "停止",
      "events": {
        "clicked": "cb_2_clicked"
      }
    }, this);
    this.cb_1 = create(commandbutton, {
      "name": "cb_1",
      "x": 480,
      "y": 4,
      "width": 77,
      "height": 32,
      "taborder": "10",
      "textsize": 12,
      "weight": "400",
      "facename": "Arial",
      "text": "打开",
      "events": {
        "clicked": "cb_1_clicked"
      }
    }, this);
    this.uo_client = create(u_websocket, {
      "name": "uo_client",
      "x": 572,
      "y": 99,
      "taborder": "10",
      "events": {
        "destroy": "uo_client_destroy",
        "ue_msgerror": "uo_client_ue_msgerror",
        "ue_msgevent": "uo_client_ue_msgevent",
        "ue_msgstate": "uo_client_ue_msgstate"
      }
    }, this);
    this.control = [this.cb_4, this.cb_3, this.sle_context, this.st_3, this.sle_server, this.st_server, this.mle_info, this.cb_2, this.cb_1, this.uo_client];
  }

  destroy() {
    destroy(this.cb_4);
    this.cb_4 = null;
    destroy(this.cb_3);
    this.cb_3 = null;
    destroy(this.sle_context);
    this.sle_context = null;
    destroy(this.st_3);
    this.st_3 = null;
    destroy(this.sle_server);
    this.sle_server = null;
    destroy(this.st_server);
    this.st_server = null;
    destroy(this.mle_info);
    this.mle_info = null;
    destroy(this.cb_2);
    this.cb_2 = null;
    destroy(this.cb_1);
    this.cb_1 = null;
    destroy(this.uo_client);
    this.uo_client = null;
  }

  onOpen() {
    this.sle_server.text = `ws://101.37.151.228:8097/websocket`;
  }

  cb_4_clicked() {
    this.mle_info.text = ``;
  }

  cb_3_clicked() {
    this.uo_client.of_send(this.sle_context.text);
  }

  cb_2_clicked() {
    let ll_m = 0;
    ll_m = cpu();
    this.uo_client.of_close();
    this.of_append_info(`退出时间：` + string(cpu() - ll_m));
  }

  cb_1_clicked() {
    this.uo_client.of_open(this.sle_server.text);
  }

  uo_client_destroy() {// parse code error, line:1, column:6 
    /* call u_websocket::destroy */}

  uo_client_ue_msgerror() {
    super.this.ue_msgerror(...arguments);
    this.of_append_info(`MsgError:` + as_error);
  }

  uo_client_ue_msgevent() {
    super.this.ue_msgevent(...arguments);
    this.of_append_info(`接收到内容：` + as_msg);
  }

  uo_client_ue_msgstate() {
    super.this.ue_msgstate(...arguments);
    if (ai_state === state_closing) {
      this.of_append_info(`MsgState:STATE_CLOSING`);
    } else if (ai_state === state_closed) {
      this.of_append_info(`MsgState:STATE_CLOSED`);
    } else if (ai_state === state_connecting) {
      this.of_append_info(`MsgState:STATE_CONNECTING`);
    } else if (ai_state === state_open) {
      this.of_append_info(`MsgState:STATE_OPEN`);
    }
  }
}

root.w_websocket = w_websocket;
})(typeof window !== "undefined" ? window : null);
