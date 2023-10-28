
(function(root) {
    root = root || global
    
class w_sqlconverter extends w_chart_base {


  constructor(options) {
    let props = {
      "name": "w_sqlconverter",
      "tag": "sqlconverter",
      "width": 966,
      "height": 680,
      "title": "SQLConverter",
      "icon": "png\\converter.ico"
    };
    Object.assign(props, options);
    super(props);
  }
    // Events

  create() {
    let icurrent;
    super.create();
    this.st_8 = create(statictext, {
      "name": "st_8",
      "x": 35,
      "y": 93,
      "width": 1022,
      "height": 16,
      "textsize": 9,
      "weight": "400",
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "● Click the Copy button above the generated PowerScript to copy and then paste it in the application (for example, paste in the Clicked event of a button for loading the graph in a WebBrowser).",
      "focusrectangle": "false"
    }, this);
    this.st_4 = create(statictext, {
      "name": "st_4",
      "x": 17,
      "y": 54,
      "width": 51,
      "height": 17,
      "textsize": 9,
      "weight": "400",
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "You may:",
      "focusrectangle": "false"
    }, this);
    this.cb_2 = create(commandbutton, {
      "name": "cb_2",
      "x": 516,
      "y": 123,
      "width": 60,
      "height": 22,
      "taborder": "60",
      "textsize": 9,
      "facename": "Segoe UI",
      "text": "Copy",
      "events": {
        "clicked": "cb_2_clicked"
      }
    }, this);
    this.st_14 = create(statictext, {
      "name": "st_14",
      "x": 35,
      "y": 74,
      "width": 678,
      "height": 16,
      "textsize": 9,
      "weight": "400",
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "● Click the Convert button to generate the corresponding PowerScript code based on the SQL query and the associated settings.",
      "focusrectangle": "false"
    }, this);
    this.st_7 = create(statictext, {
      "name": "st_7",
      "x": 17,
      "y": 37,
      "width": 885,
      "height": 17,
      "textsize": 9,
      "weight": "400",
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "This converter helps convert a SQL query to appropriate PowerScript code which you can paste into the application for quickly  creating graph in a WebBrowser control.",
      "focusrectangle": "false"
    }, this);
    this.st_6 = create(statictext, {
      "name": "st_6",
      "x": 17,
      "y": 10,
      "width": 143,
      "height": 18,
      "textsize": 11,
      "weight": "700",
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "SQL to PowerScript Converter",
      "focusrectangle": "false",
      "events": {
        "ue_clicked": "st_6_ue_clicked"
      }
    }, this);
    this.st_13 = create(statictext, {
      "name": "st_13",
      "x": 17,
      "y": 315,
      "width": 34,
      "height": 16,
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "Value:",
      "focusrectangle": "false"
    }, this);
    this.sle_value = create(singlelineedit, {
      "name": "sle_value",
      "x": 88,
      "y": 312,
      "width": 175,
      "height": 25,
      "taborder": "20",
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "text": "num"
    }, this);
    this.sle_category = create(singlelineedit, {
      "name": "sle_category",
      "x": 88,
      "y": 274,
      "width": 294,
      "height": 25,
      "taborder": "20",
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "text": "name"
    }, this);
    this.st_12 = create(statictext, {
      "name": "st_12",
      "x": 17,
      "y": 276,
      "width": 53,
      "height": 17,
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "Category:",
      "focusrectangle": "false"
    }, this);
    this.st_11 = create(statictext, {
      "name": "st_11",
      "x": 392,
      "y": 259,
      "width": 380,
      "height": 16,
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "Example graph loaded in WebBrowser using the generated PowerScript:",
      "focusrectangle": "false"
    }, this);
    this.mle_1 = create(multilineedit, {
      "name": "mle_1",
      "x": 17,
      "y": 150,
      "width": 367,
      "height": 95,
      "taborder": "10",
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "text": "SELECT (dept_name) AS name,Count(emp_id) AS num FROM employee, department WHERE employee.dept_id = department.dept_id GROUP BY dept_name",
      "vscrollbar": "true",
      "autovscroll": "true"
    }, this);
    this.st_10 = create(statictext, {
      "name": "st_10",
      "x": 17,
      "y": 127,
      "width": 114,
      "height": 17,
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "SQL query statement:",
      "focusrectangle": "false"
    }, this);
    this.mle_4 = create(multilineedit, {
      "name": "mle_4",
      "x": 392,
      "y": 150,
      "width": 556,
      "height": 95,
      "taborder": "60",
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "hscrollbar": "true",
      "vscrollbar": "true",
      "autohscroll": "true",
      "autovscroll": "true"
    }, this);
    this.st_9 = create(statictext, {
      "name": "st_9",
      "x": 392,
      "y": 127,
      "width": 126,
      "height": 18,
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "Generated PowerScript:",
      "focusrectangle": "false"
    }, this);
    this.em_width = create(editmask, {
      "name": "em_width",
      "x": 88,
      "y": 386,
      "width": 109,
      "height": 25,
      "taborder": "30",
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "enabled": false,
      "text": "800",
      "spin": true,
      "displaydata": "\t/"
    }, this);
    this.cb_1 = create(commandbutton, {
      "name": "cb_1",
      "x": 87,
      "y": 545,
      "width": 88,
      "height": 28,
      "taborder": "60",
      "textsize": 9,
      "facename": "Segoe UI",
      "text": "Convert",
      "events": {
        "clicked": "cb_1_clicked"
      }
    }, this);
    this.cbx_is3d = create(checkbox, {
      "name": "cbx_is3d",
      "x": 87,
      "y": 504,
      "width": 68,
      "height": 19,
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "enabled": false,
      "text": "is3D"
    }, this);
    this.st_5 = create(statictext, {
      "name": "st_5",
      "x": 17,
      "y": 462,
      "width": 30,
      "height": 18,
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "Style:",
      "focusrectangle": "false"
    }, this);
    this.ddlb_style = create(dropdownlistbox, {
      "name": "ddlb_style",
      "x": 88,
      "y": 458,
      "width": 175,
      "height": 173,
      "taborder": "50",
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "allowedit": "true",
      "sorted": "false",
      "item[]": ["line", "bar", "area", "pie", "scatter", "column", "donut"],
      "events": {
        "selectionchanged": "ddlb_style_selectionchanged"
      }
    }, this);
    this.em_height = create(editmask, {
      "name": "em_height",
      "x": 88,
      "y": 420,
      "width": 109,
      "height": 25,
      "taborder": "30",
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "enabled": false,
      "text": "550",
      "spin": true,
      "displaydata": "\t/"
    }, this);
    this.st_3 = create(statictext, {
      "name": "st_3",
      "x": 17,
      "y": 425,
      "width": 43,
      "height": 17,
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "Height:",
      "focusrectangle": "false"
    }, this);
    this.st_2 = create(statictext, {
      "name": "st_2",
      "x": 17,
      "y": 390,
      "width": 37,
      "height": 16,
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "Width:",
      "focusrectangle": "false"
    }, this);
    this.sle_title = create(singlelineedit, {
      "name": "sle_title",
      "x": 88,
      "y": 348,
      "width": 294,
      "height": 25,
      "taborder": "20",
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "text": "Default Title"
    }, this);
    this.st_1 = create(statictext, {
      "name": "st_1",
      "x": 17,
      "y": 353,
      "width": 29,
      "height": 17,
      "textsize": 9,
      "facename": "Segoe UI",
      "textcolor": "33554432",
      "backcolor": "#F0F0F0",
      "text": "Title:",
      "focusrectangle": "false"
    }, this);
    icurrent = upperbound(this.control);
    this.control[icurrent + 1 - 1] = this.st_8;
    this.control[icurrent + 2 - 1] = this.st_4;
    this.control[icurrent + 3 - 1] = this.cb_2;
    this.control[icurrent + 4 - 1] = this.st_14;
    this.control[icurrent + 5 - 1] = this.st_7;
    this.control[icurrent + 6 - 1] = this.st_6;
    this.control[icurrent + 7 - 1] = this.st_13;
    this.control[icurrent + 8 - 1] = this.sle_value;
    this.control[icurrent + 9 - 1] = this.sle_category;
    this.control[icurrent + 10 - 1] = this.st_12;
    this.control[icurrent + 11 - 1] = this.st_11;
    this.control[icurrent + 12 - 1] = this.mle_1;
    this.control[icurrent + 13 - 1] = this.st_10;
    this.control[icurrent + 14 - 1] = this.mle_4;
    this.control[icurrent + 15 - 1] = this.st_9;
    this.control[icurrent + 16 - 1] = this.em_width;
    this.control[icurrent + 17 - 1] = this.cb_1;
    this.control[icurrent + 18 - 1] = this.cbx_is3d;
    this.control[icurrent + 19 - 1] = this.st_5;
    this.control[icurrent + 20 - 1] = this.ddlb_style;
    this.control[icurrent + 21 - 1] = this.em_height;
    this.control[icurrent + 22 - 1] = this.st_3;
    this.control[icurrent + 23 - 1] = this.st_2;
    this.control[icurrent + 24 - 1] = this.sle_title;
    this.control[icurrent + 25 - 1] = this.st_1;
    this.wb_1._join_props({
      "name": "wb_1",
      "x": 392,
      "y": 281,
      "width": 556,
      "height": 346
    });
  }


  destroy() {
    super.destroy();
    destroy(this.st_8);
    this.st_8 = null;
    destroy(this.st_4);
    this.st_4 = null;
    destroy(this.cb_2);
    this.cb_2 = null;
    destroy(this.st_14);
    this.st_14 = null;
    destroy(this.st_7);
    this.st_7 = null;
    destroy(this.st_6);
    this.st_6 = null;
    destroy(this.st_13);
    this.st_13 = null;
    destroy(this.sle_value);
    this.sle_value = null;
    destroy(this.sle_category);
    this.sle_category = null;
    destroy(this.st_12);
    this.st_12 = null;
    destroy(this.st_11);
    this.st_11 = null;
    destroy(this.mle_1);
    this.mle_1 = null;
    destroy(this.st_10);
    this.st_10 = null;
    destroy(this.mle_4);
    this.mle_4 = null;
    destroy(this.st_9);
    this.st_9 = null;
    destroy(this.em_width);
    this.em_width = null;
    destroy(this.cb_1);
    this.cb_1 = null;
    destroy(this.cbx_is3d);
    this.cbx_is3d = null;
    destroy(this.st_5);
    this.st_5 = null;
    destroy(this.ddlb_style);
    this.ddlb_style = null;
    destroy(this.em_height);
    this.em_height = null;
    destroy(this.st_3);
    this.st_3 = null;
    destroy(this.st_2);
    this.st_2 = null;
    destroy(this.sle_title);
    this.sle_title = null;
    destroy(this.st_1);
    this.st_1 = null;
  }


  onOpen() {
    this.ieon_resize = create(eon_appeon_resize);
    this.ieon_resize.of_init(this, true);
    this.ieon_resize.of_fontresize(true, 3);
    this.ieon_resize.of_zoom(true, 3);
    this.ue_setflag();
    this.ddlb_style.selectitem(1);
  }


  cb_2_clicked() {
    let ls_script = ``;
    ls_script = this.mle_4.text;
    clipboard(ls_script);
  }


  st_6_ue_clicked() {//
  }


  cb_1_clicked() {
    let ls_title = ``,
      ls_style = ``,
      ls_data = ``,
      ls_option = ``;
    let ll_width = 0,
      ll_height = 0;
    let lb_is3d = false;
    let ls_sql = ``,
      ls_category = ``,
      ls_value = ``; //Title
    ls_title = this.sle_title.text; //Width
    ll_width = long(this.em_width.text); //Height
    ll_height = long(this.em_height.text); //Style
    ls_style = this.ddlb_style.text; //Is3D (Only for pie)
    lb_is3d = this.cbx_is3d.checked;
    ls_sql = this.mle_1.text;
    ls_category = this.sle_category.text;
    ls_value = this.sle_value.text; //Title
    this.wb_1.of_settitle(ls_title); //Style
    this.wb_1.of_setstyle(lower(ls_style)); //Width
    this.wb_1.of_setwidth(ll_width); //Height
    this.wb_1.of_setheight(ll_height); //Is3D
    if (ls_style === `pie`) {
      this.wb_1.of_setis3d(lb_is3d);
    } else {
      this.wb_1.of_setis3d(false);
    } //CreateData
    ls_data = this.wb_1.of_createdata(ls_sql, ls_category, ls_value);
    this.wb_1.of_setdata(ls_data); //CreateOption
    ls_option = this.wb_1.of_createoption(); //SetOption
    this.wb_1.of_setoption(ls_option); //Apply
    this.wb_1.of_apply_async();
    this.mle_4.text = `String ls_Title, ls_Style, ls_Data, ls_Option
` + `Long		ll_Width, ll_Height
` + `Boolean	lb_Is3D
` + `String		ls_SQL, ls_Category, ls_Value
` + `
` + `//Title
` + `ls_Title = sle_Title.Text
` + `//Width
` + `ll_Width = Long(em_Width.Text)
` + `//Height
` + `ll_Height = Long(em_Height.Text)
` + `//Style
` + `ls_Style = ddlb_Style.Text
` + `//Is3D (Only for pie)
` + `lb_Is3D = cbx_Is3D.Checked
` + `
` + `ls_SQL = mle_1.text
` + `ls_Category = sle_category.text
` + `ls_Value = sle_value.text
` + `
` + `//Title
` + `wb_1.of_SetTitle(ls_Title)
` + `//Style
` + `wb_1.of_SetStyle(lower(ls_Style))
` + `//Width
` + `wb_1.of_SetWidth(ll_Width )
` + `//Height
` + `wb_1.of_SetHeight(ll_Height)
` + `//Is3D
` + `If ls_Style = "pie" Then
` + `	wb_1.of_SetIs3D(lb_Is3D)
` + `Else
` + `	wb_1.of_SetIs3D(False)
` + `End If
` + `//CreateData
` + `ls_data = wb_1.of_CreateData(ls_SQL, ls_Category, ls_Value)
` + `wb_1.of_SetData(ls_data)
` + `//CreateOption
` + `ls_Option = wb_1.of_CreateOption()
` + `//SetOption
` + `wb_1.of_SetOption(ls_Option)
` + `//Apply
` + `wb_1.of_apply_async()
`;
  }


  ddlb_style_selectionchanged() {
    if (this.ddlb_style.text(index) === `pie`) {
      this.cbx_is3d.enabled = true;
    } else {
      this.cbx_is3d.enabled = false;
    }
  }
}

root.w_sqlconverter = w_sqlconverter;
})(typeof window !== "undefined" ? window : null);
