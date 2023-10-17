// pbvm/pbattr.js
function attrToMinMax(value) {
  value = value.substr(1, value.length - 2);
  const values = value.split("~~");
  return values.map((v) => parseInt(v));
}
function addTextProperty(obj, page) {
  Object.defineProperties(obj, {
    "text": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        const props = page.getProps();
        props.store.changeValue(obj.name, value);
      },
      get: () => {
        const data = page.getProps().data;
        return data[obj.name];
      }
    }
  });
}
function addPositionProperty(obj, dom) {
  function getDom() {
    if (typeof dom === "function") {
      return dom();
    } else {
      return dom;
    }
  }
  Object.defineProperties(obj, {
    "x": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        getDom().style["left"] = value + "px";
      },
      get: () => {
        return getDom().offsetLeft;
      }
    },
    "y": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        getDom().style["top"] = value + "px";
      },
      get: () => {
        return getDom().offsetTop;
      }
    },
    "width": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        getDom().style["width"] = value + "px";
      },
      get: () => {
        return getDom().offsetWidth;
      }
    },
    "height": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        getDom().style["height"] = value + "px";
      },
      get: () => {
        return getDom().offsetHeight;
      }
    }
  });
  obj.resize = function(width, height) {
    obj.width = width;
    obj.height = height;
  };
  obj.move = (x, y) => {
    obj.x = x;
    obj.y = y;
  };
}
function getTypeofSign(name) {
  let key = name;
  if (name.substr(-1) === "!") {
    key = name.substr(0, name.length - 1);
  }
  switch (key) {
    case "integer":
    case "long":
    case "number":
    case "decimal":
      return "I";
    case "string":
      return "S";
    case "boolean":
      return "B";
    case "userobject":
      return "U";
    case "object":
      return "O";
    case "windowobject":
    case "window":
      return "W";
    case "powerobject":
      return "P";
    case "datawindow":
      return "D";
    case "datastore":
      return "A";
  }
  return null;
}

// pbvm/pbvm.js
(function(root) {
  root = root || global;
  if (root.powerobject) {
    return;
  }
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
    space(n) {
      const arr = [];
      arr.length = n;
      arr.fill(" ");
      return arr.join("");
    },
    char(value) {
      if (typeof value === "string") {
        return value.charCodeAt(0);
      } else {
        throw new Error("char() argument is not string");
      }
    },
    left(value, n) {
      return value.substr(0, n);
    },
    right(value, n) {
      let l = value.length - n;
      if (l < 0) {
        l = 0;
      }
      return value.substr(l);
    },
    mid(value, start, length) {
      return value.substr(start - 1, length);
    },
    lower(value) {
      return value.toLowerCase();
    },
    upper(value) {
      return value.toUpperCase();
    },
    pos(value, s, n) {
      if (n) {
        return value.indexOf(s, n - 1) + 1;
      } else {
        return value.indexOf(s) + 1;
      }
    },
    len(value) {
      return value.length;
    },
    today() {
      return /* @__PURE__ */ new Date();
    },
    now() {
      return /* @__PURE__ */ new Date();
    },
    month(value) {
      return value.getMonth() + 1;
    },
    year(value) {
      return value.getFullYear();
    },
    day(value) {
      return value.getDate();
    },
    mod(x, y) {
      return x % y;
    },
    string(value, fmt) {
      if (typeof fmt === "string") {
        if (value.format) {
          return value.format(fmt);
        } else {
          return `${value}`;
        }
      } else {
        return `${value}`;
      }
    },
    integer(value) {
      return parseInt(value, 10);
    },
    long(value) {
      return parseInt(value, 10);
    },
    double(value) {
      return parseFloat(value);
    },
    dec(value) {
      return parseFloat(value);
    },
    real(value) {
      return parseFloat(value);
    },
    number(value) {
      return Number(value);
    },
    round(x, n = 0) {
      const c = x * Math.pow(10, n);
      return Math.round(c) / Math.pow(10, n);
    },
    ceiling(n) {
      return Math.ceil(n);
    },
    upperbound(value) {
      return value.length;
    },
    lowerbound(value) {
      return 1;
    },
    max(x, y) {
      return Math.max(x, y);
    },
    min(x, y) {
      return Math.min(x, y);
    },
    isnull(value) {
      return value === null || value === void 0;
    },
    isvalid(value) {
      return !(value === null || value === void 0);
    },
    triggerevent() {
    }
  };
  function messagebox(title, text, icon, button = "OK!") {
    const amis = amisRequire("amis");
    return new Promise((resolve) => {
      if (button === "OK!") {
        amis.alert(text, title);
        resolve(1);
      } else if (button === "YesNo!") {
        const p = amis.confirm(text, title, { confirmBtnLevel: "primary", confirmText: "\u662F", cancelText: "\u5426" });
        p.then((rtn) => {
          resolve(rtn ? 1 : 0);
        });
      } else {
        const p = amis.confirm(text, title, { confirmBtnLevel: "primary" });
        p.then((rtn) => {
          resolve(rtn ? 1 : 0);
        });
      }
    });
  }
  PB.messagebox = messagebox;
  Object.assign(root, PB);
  root.getTypeofSign = getTypeofSign;
  function findfunctionbyargs(data, args) {
    const func = data[args.length];
    if (func.length > 1) {
      const sign = getArgumentsSign(args);
      for (const f of func) {
        if (f.sign === sign) {
          return f.name;
        }
      }
      throw "not find sign:" + sign;
    } else {
      const f = func[0];
      return f.name;
    }
  }
  root.findfunctionbyargs = findfunctionbyargs;
  function calloverload(obj, data, args) {
    const func = data[args.length];
    if (func.length > 1) {
      const sign = getArgumentsSign(args);
      for (const f of func) {
        if (f.sign === sign) {
          return obj[f.name].apply(obj, args);
        }
      }
      throw "not find sign:" + sign;
    } else {
      const f = func[0];
      return obj[f.name].apply(obj, args);
    }
  }
  root.calloverload = calloverload;
  function getArgumentSign(value) {
    let typename = typeof value;
    switch (typename) {
      case "object":
        if (value["typeof"]) {
          const name = value.typeof();
          const t = getTypeofSign(name);
          if (t) {
            return t;
          } else {
            return "O";
          }
        }
      default:
        return getTypeofSign(typename);
    }
  }
  function getArgumentsSign(values) {
    let signs = [];
    for (let i = 0; i < values.length; ++i) {
      const value = values[i];
      signs.push(getArgumentSign(value));
    }
    return signs.join("");
  }
  class powerobject {
    _className = "powerobject";
    _pbprops = {};
    constructor(options) {
      this._join_props(options);
    }
    typeof() {
      return this._className + "!";
    }
    classname() {
      return this._className;
    }
    triggerevent(eventName, ...args) {
      const { events } = this._pbprops;
      if (events && events[eventName]) {
        let win = this.parent;
        while (win && !(win instanceof pbwindow)) {
          win = win.parent;
        }
        const evName = events[eventName];
        win[evName].apply(this, args);
      }
    }
    _join_props(props) {
      Object.assign(this._pbprops, props);
    }
  }
  class nonvisualobject extends powerobject {
    _className = "nonvisualobject";
    constructor() {
      super();
      this.create();
    }
    create() {
    }
    destroy() {
    }
    pbconstructor() {
    }
    destructor() {
    }
  }
  class windowobject extends powerobject {
    _className = "windowobject";
    tag;
    visible;
    name;
    width = 800;
    height = 500;
    x = 0;
    y = 0;
    control = [];
    constructor(options, parent2) {
      super(options);
      this.parent = parent2;
      const attr = this._pbprops;
      this.width = attr.width;
      this.height = attr.height;
      const { events } = options;
      if (events && events["create"]) {
        let win = this.parent;
        while (win && !(win instanceof pbwindow)) {
          win = win.parent;
        }
        const evName = events["create"];
        win[evName].apply(this);
      } else {
        this.create();
      }
    }
    move(x, y) {
    }
    resize(w, h) {
    }
    show() {
    }
    create() {
    }
    destroy() {
    }
    toUI(options, addprop = true) {
      const attr = this._pbprops;
      let actl = {
        type: "tpl",
        id: attr.name,
        name: attr.name,
        className: attr.name,
        style: {
          left: attr.x,
          top: attr.y,
          width: attr.width,
          height: attr.height,
          position: "absolute",
          whiteSpace: "nowrap"
        }
      };
      this.name = attr.name;
      if (attr.textsize) {
        actl.style.fontSize = attr.textsize + "px";
      }
      if (attr.visible === false) {
        actl.visible = false;
      }
      actl.tpl = `${this._className}:${attr.name}`;
      if (addprop && options.win) {
        let control = null;
        let win = options.win;
        addPositionProperty(this, () => {
          if (control) {
            return control;
          }
          control = win.root.querySelector(`.${attr.name}`);
          return control;
        });
      }
      if (options.win) {
        addTextProperty(this, options.win);
      }
      return actl;
    }
  }
  class userobject extends windowobject {
    _className = "userobject";
    pbconstructor() {
    }
    destructor() {
    }
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      let childs;
      if (this.parent instanceof tab) {
        const attrs = actl;
        actl = {};
        actl.title = attr.text;
        actl.tab = {
          type: "wrapper",
          body: []
        };
        delete attrs.type;
        Object.assign(actl.tab, attrs);
        childs = actl.tab.body;
      } else {
        actl.type = "wrapper";
        childs = actl.body = [];
      }
      for (const c of this.control) {
        childs.unshift(c.toUI(options));
      }
      return actl;
    }
  }
  class tab extends windowobject {
    _className = "tab";
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "tabs";
      const childs = actl.tabs = [];
      for (const c of this.control) {
        childs.push(c.toUI(options));
      }
      return actl;
    }
  }
  class pbwindow extends windowobject {
    _className = "window";
    constructor(options) {
      super(options);
    }
    /* 系统默认事件 */
    onResize(sizetype, newwidth, newheight) {
    }
    onOpen() {
    }
    workspacewidth() {
      return this.width;
    }
    workspaceheight() {
      return this.height;
    }
    workspacex() {
      return this.x;
    }
    workspacey() {
      return this.y;
    }
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options, false);
      delete actl.tpl;
      actl.type = "wrapper";
      actl.style.position = "relative";
      delete actl.style.left;
      delete actl.style.top;
      const childs = actl.body = [];
      for (const c of this.control) {
        childs.unshift(c.toUI(options));
      }
      if (options.js) {
        childs.push({ "type": "loaddetector" });
      }
      return actl;
    }
    show(root2) {
      const amisJson = {
        type: "page",
        cssVars: {
          "--checkbox-checkbox-default-fontSize": ""
          // "--Form-selectOption-height":"",
          // "--select-base-default-fontSize":"",
        },
        data: { showLoading: false },
        css: {},
        body: [{
          "type": "spinner",
          "show": true,
          "overlay": true,
          "size": "lg",
          "visibleOn": "${showLoading}"
        }],
        events: []
      };
      const options = { css: amisJson.css, page: amisJson, js: true, win: this };
      let ui = this.toUI(options);
      amisJson.body.push(ui);
      const amis = amisRequire("amis/embed");
      const config = window.baseConfig || parent.baseConfig;
      this.amisLib = amisRequire("amis");
      const page = this._page = {
        root: root2,
        onResize: (sizetype, newwidth, newheight) => {
          this.onResize(sizetype, newwidth, newheight);
        },
        onInit: () => {
          this.onOpen();
        }
      };
      this.root = root2;
      this.amisScoped = amis.embed(this.root, amisJson, { data: { apiurl: config.api, page: () => {
        return page;
      } } });
    }
    getProps() {
      let ctls = this.amisScoped.getComponents();
      const props = ctls[0].props;
      return props;
    }
  }
  class statictext extends windowobject {
    _className = "statictext";
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      actl.type = "tpl";
      actl.tpl = "${" + attr.name + "}";
      options.page.data[attr.name] = attr.text;
      return actl;
    }
  }
  class singlelineedit extends windowobject {
    _className = "singlelineedit";
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "input-text";
      actl.value = attr.text;
      actl.inputControlClassName = `${this.name}`;
      options.css[`.${attr.name}`] = { "height": attr.height + "px!important", "padding": "0px 5px!important" };
      return actl;
    }
  }
  class multilineedit extends windowobject {
    _className = "multilineedit";
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "textarea";
      actl.value = attr.text;
      options.css[`.${attr.name} textarea`] = { "max-height": `${attr.height}px`, "min-height": `${attr.height}px`, "resize": "none" };
      return actl;
    }
  }
  class editmask extends windowobject {
    _className = "editmask";
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      const { maskdatatype } = attr;
      if (maskdatatype === "datemask!") {
        actl.type = "input-date";
        actl.value = attr.text;
        actl.format = "YYYY-MM-DD";
      } else {
        actl.type = "input-number";
        actl.value = attr.text;
        actl.showSteps = attr.spin;
        if (actl.showSteps && attr.minmax) {
          const mm = attrToMinMax(attr.minmax);
          actl.min = mm[0];
          actl.max = mm[1];
          actl.step = attr.increment;
        }
      }
      return actl;
    }
  }
  class commandbutton extends windowobject {
    _className = "commandbutton";
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "button";
      actl.label = attr.text;
      if (options.js && attr.events && attr.events["clicked"]) {
        const key = `${attr.name}_clicked`;
        const inst = options.win;
        actl.onClick = (e, props) => {
          inst[key](e, props);
        };
      }
      return actl;
    }
  }
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
  class radiobutton extends windowobject {
    _className = "radiobutton";
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "radios";
      actl.name = "radios";
      actl.options = [{ label: attr.text, value: attr.name }];
      if (attr.options) {
        this.rvalue = attr.options[0].value;
      }
      return actl;
    }
    get checked() {
      return this.text === this.rvalue;
    }
    set checked(value) {
      if (value) {
        this.text = this.rvalue;
      } else {
        this.text = void 0;
      }
    }
  }
  class groupbox extends windowobject {
    _className = "radiobutton";
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "html";
      actl.html = `<fieldset style="border: 1px solid #DCDFE6;position: relative;height:${attr.height}px"><legend>${attr.text}</legend></fieldset>`;
      return actl;
    }
  }
  class dropdownlistbox extends windowobject {
    _className = "dropdownlistbox";
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "select";
      actl.name = attr.name;
      attr.options = actl.options = [];
      if (attr["item[]"]) {
        for (const o of attr["item[]"]) {
          actl.options.push({ label: o, value: o });
        }
      }
      return actl;
    }
    selectitem(index) {
      const attr = this._pbprops;
      if (attr.options) {
        this.text = attr.options[index - 1].label;
      }
    }
  }
  class hprogressbar extends windowobject {
    _className = "progress";
    _minposition = 0;
    _maxposition = 0;
    _position = 0;
    _setstep = 10;
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "progress";
      this._position = attr.position;
      if (attr.minposition !== void 0) {
        this._minposition = attr.minposition;
      } else {
        this._minposition = 0;
      }
      this._maxposition = attr.maxposition;
      actl.value = this._getValue();
      return actl;
    }
    _getValue() {
      return (this._maxposition - this._minposition) * this._position / 100;
    }
    setrange(startpos, endpos) {
      this._minposition = startpos;
      this._maxposition = endpos;
      this.text = this._getValue();
    }
    get setstep() {
      return this._position;
    }
    set setstep(value) {
      this.text = value;
    }
  }
  class picture extends windowobject {
    _className = "picture";
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "static-image";
      actl.src = attr.picturename;
      actl.width = attr.width + "px";
      actl.height = attr.height + "px";
      actl.thumbMode = "cover";
      actl.innerClassName = "no-border";
      return actl;
    }
  }
  class datawindow extends windowobject {
    _className = "datawindow";
    toUI(options) {
      let actl = super.toUI(options);
      const attr = this._pbprops;
      delete actl.tpl;
      actl.type = "datawindow";
      actl.dataObjectURI = attr.dataobject;
      if (options.js && attr.events) {
        const dwEvent = {
          "clicked": "onClicked",
          "itemchanged": "onItemChanged",
          "itemfocuschanged": "onItemFocusChanged",
          "rowfocuschanged": "onRowFocusChanged",
          "buttonclicked": "onButtonClicked",
          "dropdownselected": "onDropDownSelected",
          "doubleclicked": "onDoubleClicked",
          "toolbarchanged": "onToolbarChanged"
        };
        for (const key in attr.events) {
          const evName = dwEvent[key];
          if (evName) {
            const inst = options.win;
            const evKey = `${attr.name}_${key}`;
            actl[evName] = (e, props) => {
              inst[evKey](e, props);
            };
          }
        }
      }
      if (options.win) {
        this._win = options.win;
        this._dataobject = attr.dataobject;
      }
      return actl;
    }
    get _dw() {
      return this._win._page[this.name];
    }
    get dataobject() {
      return this._dataobject;
    }
    set dataobject(value) {
      this._dataobject = value;
      this._dw.dataobject = value;
    }
    settransobject(db) {
      return this._dw.setTransObject();
    }
    rowcount() {
      return this._dw.rowCount();
    }
    setitem(row, column, value) {
      return this._dw.setItem(...arguments);
    }
    getitem(row, column = null) {
      return this._dw.setItem(...arguments);
    }
    setitemstatus(row, column, dwbuffer, status) {
      return this._dw.setItemsSatus(...arguments);
    }
    getitemstatus(row, column, dwbuffer) {
      return this._dw.getItemStatus(...arguments);
    }
    insertrow(row) {
      return this._dw.insertRow(...arguments);
    }
    deleterow(row) {
      return this._dw.deleteRow(...arguments);
    }
    retrieve(...args) {
      return this._dw.retrieve(...arguments);
    }
    update(accept = true, resetflag = true) {
      return this._dw.update(...arguments);
    }
    resetupdate() {
      return this._dw.resetUpdate();
    }
    reset() {
      return this._dw.reset();
    }
    setrow(row) {
      return this._dw.setRow(...arguments);
    }
    scrolltorow(row) {
      return this._dw.scrollToRow(...arguments);
    }
    getrow() {
      return this._dw.getRow(...arguments);
    }
    selectrow(row, select) {
      return this._dw.selectRow(...arguments);
    }
    isselected(row) {
      return this._dw.isSelected(...arguments);
    }
    getselectedrows() {
      return this._dw.getSelectedRows(...arguments);
    }
    sharedata(dwsecondary) {
      return this._dw.shareData(...arguments);
    }
    sharedataoff() {
      return this._dw.shareDataOff(...arguments);
    }
    rowsmove(startrow, endrow, movebuffer, targetdw, beforerow, targetbuffer) {
      return this._dw.rowsMove(...arguments);
    }
    rowscopy(startrow, endrow, copybuffer, targetdw, beforerow, targetbuffer) {
      return this._dw.rowsCopy(...arguments);
    }
    rowsdiscard(startrow, endrow, buffer = DWBuffer.Primary) {
      return this._dw.rowsDiscard(...arguments);
    }
    setsort(format) {
      return this._dw.setSort(...arguments);
    }
    sort() {
      return this._dw.sort(...arguments);
    }
    setfilter(format) {
      return this._dw.setFilter(...arguments);
    }
    filter() {
      return this._dw.filter(...arguments);
    }
    filterall(text) {
      return this._dw.filterAll(...arguments);
    }
    find(expression, start, end) {
      return this._dw.find(...arguments);
    }
    deletedcount() {
      return this._dw.deletedCount(...arguments);
    }
    filteredcount() {
      return this._dw.filteredCount(...arguments);
    }
    modifiedcount() {
      return this._dw.modifiedCount(...arguments);
    }
    getchanges(data) {
      return this._dw.getChanges(...arguments);
    }
    setchanges(data) {
      return this._dw.setChanges(...arguments);
    }
  }
  root.powerobject = powerobject;
  root.nonvisualobject = nonvisualobject;
  root.userobject = userobject;
  root.pbwindow = pbwindow;
  root.windowobject = windowobject;
  root.statictext = statictext;
  root.singlelineedit = singlelineedit;
  root.multilineedit = multilineedit;
  root.editmask = editmask;
  root.commandbutton = commandbutton;
  root.checkbox = checkbox;
  root.tab = tab;
  root.radiobutton = radiobutton;
  root.dropdownlistbox = dropdownlistbox;
  root.groupbox = groupbox;
  root.picture = picture;
  root.hprogressbar = hprogressbar;
  root.datawindow = datawindow;
})(typeof window !== "undefined" ? window : null);
