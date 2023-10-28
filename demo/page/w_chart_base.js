
(function(root) {
    root = root || global
    
class w_chart_base extends w_child_base {


  constructor(options) {
    let props = {
      "name": "w_chart_base",
      "width": 666,
      "height": 314,
      "border": "false",
      "icon": "ReportIcon!"
    };
    Object.assign(props, options);
    super(props);
  }

  wf_getitemstring() {
      const func = {"3":[{"name":"wf_getitemstring_3_DII","sign":"DII"},{"name":"wf_getitemstring_3_AII","sign":"AII"}]}; 
      const name = findfunctionbyargs(func, arguments); 
      return this[name].apply(this, arguments)
    }


  async wf_getitemstring_3_DII(adw_1, ai_row, ai_column) {
    if (adw_1.rowcount() <= 0) {
      return ``;
    }
    if (adw_1.rowcount() < ai_row) {
      return ``;
    }
    let ls_string = ``,
      ls_type = ``;
    ls_type = adw_1.describe(`#` + string(ai_column) + `.ColType`);
    if (upper(left(ls_type, 3)) === `DAT`) {
      if (upper(ls_type) === `DATE`) {
        ls_string = string(adw_1.getitemdate(ai_row, ai_column));
      } else {
        ls_string = string(adw_1.getitemdatetime(ai_row, ai_column));
      }
    } else if (upper(left(ls_type, 3)) === `TIM`) {
      ls_string = string(adw_1.getitemtime(ai_row, ai_column));
    } else if (upper(left(ls_type, 3)) === `STR` || upper(left(ls_type, 3)) === `CHA` || upper(left(ls_type, 3)) === `VAR`) {
      ls_string = string(adw_1.getitemstring(ai_row, ai_column));
    } else if (upper(left(ls_type, 3)) === `DEC`) {
      ls_string = string(adw_1.getitemdecimal(ai_row, ai_column));
    } else if (upper(left(ls_type, 3)) === `NUM` || upper(left(ls_type, 3)) === `INT` || upper(left(ls_type, 3)) === `LON` || upper(left(ls_type, 3)) === `REA`) {
      ls_string = string(adw_1.getitemnumber(ai_row, ai_column));
    } else if (upper(left(ls_type, 3)) === `!` || upper(left(ls_type, 3)) === `?`) {
      return ``;
    } else {
      await messagebox(`Tip`, ls_type + ` is Not Match.`);
    }
    if (isnull(ls_string)) {
      ls_string = `Null`;
    }
    return ls_string;
  }


  async wf_getitemstring_3_AII(ads_1, ai_row, ai_column) {
    if (ads_1.rowcount() <= 0) {
      return ``;
    }
    if (ads_1.rowcount() < ai_row) {
      return ``;
    }
    let ls_string = ``,
      ls_type = ``;
    ls_type = ads_1.describe(`#` + string(ai_column) + `.ColType`);
    if (upper(left(ls_type, 3)) === `DAT`) {
      if (upper(ls_type) === `DATE`) {
        ls_string = string(ads_1.getitemdate(ai_row, ai_column));
      } else {
        ls_string = string(ads_1.getitemdatetime(ai_row, ai_column));
      }
    } else if (upper(left(ls_type, 3)) === `TIM`) {
      ls_string = string(ads_1.getitemtime(ai_row, ai_column));
    } else if (upper(left(ls_type, 3)) === `STR` || upper(left(ls_type, 3)) === `CHA` || upper(left(ls_type, 3)) === `VAR`) {
      ls_string = string(ads_1.getitemstring(ai_row, ai_column));
    } else if (upper(left(ls_type, 3)) === `DEC`) {
      ls_string = string(ads_1.getitemdecimal(ai_row, ai_column));
    } else if (upper(left(ls_type, 3)) === `NUM` || upper(left(ls_type, 3)) === `INT` || upper(left(ls_type, 3)) === `LON` || upper(left(ls_type, 3)) === `REA`) {
      ls_string = string(ads_1.getitemnumber(ai_row, ai_column));
    } else if (upper(left(ls_type, 3)) === `!` || upper(left(ls_type, 3)) === `?`) {
      return ``;
    } else {
      await messagebox(`Tip`, ls_type + ` is Not Match.`);
    }
    if (isnull(ls_string)) {
      ls_string = `Null`;
    }
    return ls_string;
  }
    // Events

  async ue_setoption(as_arg) {//ue_setoption(string as_arg)
  }


  async ue_print() {
    //Print
    this.wb_1.print();
  }


  async ue_viewurl() {
    //
    let ls_url = ``;
    let lw_msg;
    ls_url = this.wb_1.of_getweburl();
    openwithparm(lw_msg, ls_url);
  }


  async ue_viewsource() {
    //ue_viewsource
    let ls_source = ``;
    let lw_msg; //ls_Source = wb_1.of_GetWebSource()
    ls_source = this.wb_1.getsource();
    openwithparm(lw_msg, ls_source);
  }


  async ue_viewoption() {
    //ue_viewoption
    let ls_option = ``;
    let lw_msg;
    ls_option = this.wb_1.of_getoption();
    openwithparm(lw_msg, ls_option);
  }


  async ue_viewdata() {
    //ue_viewdata
    let ls_source = ``;
    let lw_msg;
    ls_source = this.wb_1.of_getdata();
    openwithparm(lw_msg, ls_source);
  }


  async create() {
    let icurrent;
    super.create();
    this.wb_1 = create(uo_webbrowser, {
      "name": "wb_1",
      "x": 139,
      "width": 523,
      "height": 296
    }, this);
    icurrent = upperbound(this.control);
    this.control[icurrent + 1 - 1] = this.wb_1;
  }


  async destroy() {
    super.destroy();
    destroy(this.wb_1);
    this.wb_1 = null;
  }
}

root.w_chart_base = w_chart_base;
})(typeof window !== "undefined" ? window : null);
