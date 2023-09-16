
export default class PBPage extends PB.AmisPage {
  constructor(root, options, dialog) {
    super(root, options, dialog);
    const page = this;
    let amisJSON = {
      "type": "page",
      "cssVars": {
        "--checkbox-checkbox-default-fontSize": ""
      },
      "data": {
        "st_2": "数字",
        "st_1": "演示"
      },
      "css": {
        ".sle_1": {
          "height": "32px!important",
          "padding": "0px 5px!important"
        }
      },
      "body": {
        "id": "w_test_amis",
        "name": "w_test_amis",
        "className": "w_test_amis",
        "style": {
          "width": 708,
          "height": 461,
          "position": "relative"
        },
        "type": "wrapper",
        "body": [
          {
            "id": "cb_1",
            "name": "cb_1",
            "className": "cb_1",
            "style": {
              "left": 12,
              "top": 6,
              "width": 100,
              "height": 32,
              "position": "absolute",
              "fontSize": "12px"
            },
            "type": "button",
            "label": "检索",
            "onClick": (e, props) => {page.cb_1_clicked(e, props);},
          },
          {
            "id": "cb_2",
            "name": "cb_2",
            "className": "cb_2",
            "style": {
              "left": 122,
              "top": 6,
              "width": 100,
              "height": 32,
              "position": "absolute",
              "fontSize": "12px"
            },
            "type": "button",
            "label": "设置",
            "onClick": (e, props) => {page.cb_2_clicked(e, props);},
          },
          {
            "id": "tab_1",
            "name": "tab_1",
            "className": "tab_1",
            "style": {
              "left": 16,
              "top": 45,
              "width": 671,
              "height": 374,
              "position": "absolute",
              "fontSize": "12px"
            },
            "type": "tabs",
            "tabs": [
              {
                "title": "第1页",
                "tab": {
                  "type": "wrapper",
                  "body": [
                    {
                      "id": "dw_1",
                      "name": "dw_1",
                      "className": "dw_1",
                      "style": {
                        "left": 10,
                        "top": 15,
                        "width": 637,
                        "height": 315,
                        "position": "absolute"
                      },
                      "type": "datawindow",
                      "dataObjectURI": "d_test1",
                    }
                  ],
                  "id": "tabpage_1",
                  "name": "tabpage_1",
                  "className": "tabpage_1",
                  "style": {
                    "left": 4,
                    "top": 30,
                    "width": 663,
                    "height": 340,
                    "position": "absolute"
                  }
                }
              },
              {
                "title": "第2页",
                "tab": {
                  "type": "wrapper",
                  "body": [
                    {
                      "id": "gb_1",
                      "name": "gb_1",
                      "className": "gb_1",
                      "style": {
                        "left": 277,
                        "top": 128,
                        "width": 272,
                        "height": 141,
                        "position": "absolute",
                        "fontSize": "12px"
                      },
                      "type": "html",
                      "html": "<fieldset style=\"border: 1px solid #DCDFE6;position: relative;height:141px\"><legend>KKKK</legend></fieldset>"
                    },
                    {
                      "id": "st_1",
                      "name": "st_1",
                      "className": "st_1",
                      "style": {
                        "left": 25,
                        "top": 28,
                        "width": 48,
                        "height": 18,
                        "position": "absolute",
                        "fontSize": "12px"
                      },
                      "type": "tpl",
                      "tpl": "${st_1}"
                    },
                    {
                      "id": "sle_1",
                      "name": "sle_1",
                      "className": "sle_1",
                      "style": {
                        "left": 72,
                        "top": 21,
                        "width": 206,
                        "height": 32,
                        "position": "absolute",
                        "fontSize": "12px"
                      },
                      "type": "input-text",
                      "value": "1111",
                      "inputControlClassName": "sle_1"
                    },
                    {
                      "id": "em_1",
                      "name": "em_1",
                      "className": "em_1",
                      "style": {
                        "left": 71,
                        "top": 74,
                        "width": 344,
                        "height": 32,
                        "position": "absolute",
                        "fontSize": "12px"
                      },
                      "type": "input-date",
                      "value": "2020-1-2",
                      "format": "YYYY-MM-DD"
                    },
                    {
                      "id": "st_2",
                      "name": "st_2",
                      "className": "st_2",
                      "style": {
                        "left": 19,
                        "top": 81,
                        "width": 45,
                        "height": 18,
                        "position": "absolute",
                        "fontSize": "12px"
                      },
                      "type": "tpl",
                      "tpl": "${st_2}"
                    },
                    {
                      "id": "ddlb_1",
                      "name": "ddlb_1",
                      "className": "ddlb_1",
                      "style": {
                        "left": 71,
                        "top": 118,
                        "width": 183,
                        "height": 113,
                        "position": "absolute",
                        "fontSize": "12px"
                      },
                      "type": "select",
                      "options": [
                        {
                          "label": "中国",
                          "value": "中国"
                        },
                        {
                          "label": "美国",
                          "value": "美国"
                        },
                        {
                          "label": "日本",
                          "value": "日本"
                        }
                      ]
                    },
                    {
                      "id": "cbx_1",
                      "name": "cbx_1",
                      "className": "cbx_1",
                      "style": {
                        "left": 19,
                        "top": 163,
                        "width": 100,
                        "height": 23,
                        "position": "absolute",
                        "fontSize": "12px"
                      },
                      "type": "checkbox",
                      "option": "选项1"
                    },
                    {
                      "id": "cbx_2",
                      "name": "cbx_2",
                      "className": "cbx_2",
                      "style": {
                        "left": 108,
                        "top": 163,
                        "width": 100,
                        "height": 23,
                        "position": "absolute",
                        "fontSize": "12px"
                      },
                      "type": "checkbox",
                      "option": "选项2"
                    },
                    {
                      "id": "rb_1",
                      "name": "radios",
                      "className": "rb_1",
                      "style": {
                        "left": 16,
                        "top": 203,
                        "width": 80,
                        "height": 23,
                        "position": "absolute",
                        "fontSize": "12px"
                      },
                      "type": "radios",
                      "options": [
                        {
                          "label": "none",
                          "value": "rb_1"
                        }
                      ]
                    },
                    {
                      "id": "rb_2",
                      "name": "radios",
                      "className": "rb_2",
                      "style": {
                        "left": 292,
                        "top": 162,
                        "width": 100,
                        "height": 23,
                        "position": "absolute",
                        "fontSize": "12px"
                      },
                      "type": "radios",
                      "options": [
                        {
                          "label": "k1",
                          "value": "rb_2"
                        }
                      ]
                    },
                    {
                      "id": "rb_3",
                      "name": "radios",
                      "className": "rb_3",
                      "style": {
                        "left": 292,
                        "top": 197,
                        "width": 100,
                        "height": 23,
                        "position": "absolute",
                        "fontSize": "12px"
                      },
                      "type": "radios",
                      "options": [
                        {
                          "label": "k2",
                          "value": "rb_3"
                        }
                      ]
                    }
                  ],
                  "id": "tabpage_2",
                  "name": "tabpage_2",
                  "className": "tabpage_2",
                  "style": {
                    "left": 4,
                    "top": 30,
                    "width": 663,
                    "height": 340,
                    "position": "absolute"
                  }
                }
              }
            ]
          },
          {
            "id": "cb_3",
            "name": "cb_3",
            "className": "cb_3",
            "style": {
              "left": 229,
              "top": 6,
              "width": 100,
              "height": 32,
              "position": "absolute",
              "fontSize": "12px"
            },
            "type": "button",
            "label": "弹框提示",
            "onClick": (e, props) => {page.cb_3_clicked(e, props);},
          },
          {
            "type": "loaddetector"
          }
        ]
      }
    }
    this._init(amisJSON);
  }

  onLoad() {
  }

  onResize(sizetype, newwidth, newheight) {
    console.log('onResize', newwidth, newheight);
  }

  onClose() {
    console.log('onClose');
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
    this.tab_1.tabpage_2.cbx_2.checked = !this.tab_1.tabpage_2.cbx_2.checked;
  }


  cb_1_clicked(e, props) {
    // code
    this.tab_1.tabpage_1.dw_1.retrieve()
  }



}

