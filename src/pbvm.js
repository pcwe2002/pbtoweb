// pbvm/pbattr.js
function attrToMinMax(value) {
  value = value.substr(1, value.length - 2);
  const values = value.split("~~");
  return values.map((v) => parseInt(v));
}
function attrToPixels(value, isX, units) {
  value = attrToInt(value);
  units || (units = 0);
  switch (units) {
    case 0:
      if (isX) {
        return Math.round(value * 0.219);
      }
      return Math.round(value * 0.25);
    case 1:
      return value;
    case 2:
      return value;
    case 3:
      return value;
    default:
      return value;
  }
}
function attrToInt(value) {
  if (typeof value === "string") {
    if (value.length > 0) {
      if (value.charAt(0) === '"') {
        if (value.charAt(value.length - 1) !== '"') {
          value = value.substring(1);
        } else {
          value = value.substring(1, value.length - 1);
        }
      }
      return parseInt(value);
    }
    return 0;
  }
  return value;
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
function addEnabledProperty(obj, page) {
  Object.defineProperties(obj, {
    "enabled": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        const props = page.getProps();
        props.store.changeValue(`disabled.${obj.name}`, !value);
      },
      get: () => {
        const data = page.getProps().data;
        const key = obj.name;
        const disabled = data.disabled[key];
        return !disabled;
      }
    }
  });
}
function addVisibleProperty(obj, page) {
  Object.defineProperties(obj, {
    "visible": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        const props = page.getProps();
        props.store.changeValue(`${obj.name}_invisible`, !value);
      },
      get: () => {
        const data = page.getProps().data;
        const key = obj.name + "_invisible";
        const invisible = data[key];
        return !invisible;
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
    },
    "visible": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        const v = value ? "visible" : "hidden";
        getDom().style["visibility"] = v;
      },
      get: () => {
        const v = getDom().style["visibility"];
        return v !== "hidden";
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
  obj.setfocus = () => {
    getDom().focus();
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

// pbvm/pbdate.js
var PBDate = {
  datetime(str) {
    if (typeof str === "string") {
      return new Date(str);
    } else if (arguments.length === 1) {
      return new Date(str);
    } else {
      let d1 = arguments[0];
      let t1 = arguments[1];
      return new Date(
        d1.getFullYear(),
        d1.getMonth(),
        d1.getDate(),
        t1.getHours(),
        t1.getMinutes(),
        t1.getSeconds()
      );
    }
  },
  date(str) {
    const d = new Date(str);
    d.setHours(0, 0, 0, 0);
    return d;
  },
  time(str) {
    if (typeof str === "string") {
      const value = "1970-01-01 " + str;
      return new Date(value);
    }
    return new Date(str);
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
  relativedate(d, n) {
    let someDate = new Date(d);
    someDate.setDate(d.getDate() + n);
    return someDate;
  },
  daysafter(date1, date2) {
    if (date1 && date2) {
      return (date2.getTime() - date1.getTime()) / (1e3 * 60 * 60 * 24);
    } else {
      return null;
    }
  }
};
var pbdate_default = PBDate;

// pbvm/pbfile.js
var profile = {
  "satrda": {
    "section": {
      "key": 1
    }
  }
};
var PBFile = {
  profilestring(filename, section, key, value) {
    let p = profile[filename];
    if (p) {
      p = p[section];
      if (p[key] !== void 0) {
        return p[key];
      }
    }
    return value;
  },
  setprofilestring(filename, section, key, value) {
    if (!profile[filename]) {
      profile[filename] = {};
    }
    let obj = profile[filename];
    if (!obj[section]) {
      obj = obj[section] = {};
    }
    obj[key] = value;
  }
};
var pbfile_default = PBFile;

// pbvm/pbvm.js
(function(root) {
  root = root || global;
  if (root.powerobject) {
    return;
  }
  let PB = {
    create(cls, options, parent2) {
      const a = new cls(options, parent2);
      if (a instanceof nonvisualobject) {
        a.pbconstructor();
      }
      return a;
    },
    destroy(obj) {
    },
    trim(str) {
      return str ? str.trim() : "";
    },
    lefttrim(str) {
      return str ? str.trimStart() : "";
    },
    righttrim(str) {
      return str ? str.trimEnd() : "";
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
    pbyeild() {
    },
    async triggerevent(obj, func, ...args) {
      let key = null;
      if (obj._pbprops && obj._pbprops.events) {
        key = obj._pbprops.events[func];
      }
      let f;
      let win = obj;
      while (win && !win[key] && win.parent) {
        win = win.parent;
      }
      if (win && win[key]) {
        f = win[key];
        if (f) {
          if (func === "pbconstructor") {
            await f.call(obj, { ctl: obj, pro: win.__proto__, name: key, func }, ...args);
          } else {
            await f.call(win, { ctl: obj, pro: win.__proto__, name: key, func }, ...args);
          }
        }
      } else {
        f = obj[func];
        if (f) {
          await f.call(obj, ...args);
        }
      }
    },
    // 实现事件super的功能，先找窗口和继承窗口中是否有这个事件，如果有就执行，如果没有，执行对象的事件
    async superevent({ ctl, pro, name, func }, ...arg) {
      const p = pro.__proto__;
      if (p[name]) {
        await p[name].call(this, { ctl, pro: p, name, func }, ...arg);
      } else if (ctl[func]) {
        await ctl[func].call(ctl, ...arg);
      }
    },
    setnull() {
    },
    pixelstounits(pixels, type) {
      return pixels;
    },
    // XUnitsToPixels! YUnitsToPixels! 
    unitstopixels(units, type) {
      if (type === "xunitstopixels!" || type === "x") {
        return attrToPixels(units, true, 0);
      } else {
        return attrToPixels(units, false, 0);
      }
    }
  };
  Object.assign(PB, pbdate_default);
  Object.assign(PB, pbfile_default);
  function messagebox(title, text, icon, button = "OK!") {
    const amis = amisRequire("amis");
    return new Promise((resolve) => {
      if (button === "OK!") {
        amis.alert(text, title);
        setTimeout(() => {
          let footer = document.querySelector(".cxd-Modal-footer");
          let cb = footer.children[0];
          let f = () => {
            cb.removeEventListener("click", f);
            setTimeout(() => {
              resolve(1);
            }, 10);
          };
          cb.addEventListener("click", f);
        }, 10);
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
  PB.message = {
    stringparm: "",
    doubleparm: 0,
    powerobjectparm: null
  };
  function getenvironment(env) {
    env.screenheight = window.innerHeight;
    env.screenwidth = window.innerWidth;
  }
  PB.getenvironment = getenvironment;
  PB.openwithparam = function(windowvar, parameter) {
    PB.message.stringparm = void 0;
    PB.message.doubleparm = void 0;
    PB.message.powerobjectparm = void 0;
    const ptype = typeof parameter;
    if (ptype === "string") {
      PB.message.stringparm = parameter;
    } else if (ptype === "number") {
      PB.message.doubleparm = parameter;
    } else {
      PB.message.powerobjectparm = parameter;
    }
    const content = document.createElement("div");
    const w = new windowvar();
    const d = new H5UI.Modal(w._pbprops.title, [content], w._pbprops.width);
    w._dialog = d;
    return new Promise((resolve) => {
      d.show((returnvalue) => {
        resolve(returnvalue);
      });
      w.show(content);
    });
  };
  PB.closewithreturn = function(windowname, returnvalue) {
    PB.message.stringparm = void 0;
    PB.message.doubleparm = void 0;
    PB.message.powerobjectparm = void 0;
    const ptype = typeof returnvalue;
    if (ptype === "string") {
      PB.message.stringparm = returnvalue;
    } else if (ptype === "number") {
      PB.message.doubleparm = returnvalue;
    } else {
      PB.message.powerobjectparm = returnvalue;
    }
    windowname.close(returnvalue);
  };
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
    _pbprops = {};
    constructor(options) {
      this._join_props(options);
    }
    typeof() {
      const typename = this.__proto__.constructor.name;
      return typename + "!";
    }
    classname() {
      if (this.name) {
        return this.name;
      } else {
        return this.__proto__.constructor.name;
      }
    }
    triggerevent(eventName, ...args) {
      PB.triggerevent(this, eventName, ...args);
    }
    postevent(eventName, ...args) {
      setTimeout(() => {
        PB.triggerevent(this, eventName, ...args);
      }, 0);
    }
    _join_props(props) {
      if (props && props.name) {
        this.name = props.name;
      }
      Object.assign(this._pbprops, props);
    }
  }
  class transaction extends powerobject {
    dbms = "";
    sqlcode = 0;
    sqlerrtext = "";
    sqlnrows = 0;
    id = 0;
    autocommit = false;
    async ping() {
      if (this.id <= 0) {
        clearTimeout(this._timerPing);
        this._timerPing = 0;
        return 0;
      }
      let ret = await axios.post("/sqlca/ping", { id: this.id });
      if (ret.status === 200) {
        return 0;
      } else {
        return -1;
      }
    }
    async connect() {
      let ret = await axios.post("/sqlca/connect", { key: this.dbms });
      if (ret.status === 200) {
        this.id = ret.data.id;
        this._timerPing = setTimeout(() => {
          this.ping();
        }, 3e4);
      } else {
        this.sqlerrtext = ret.data.msg;
      }
      return this.id;
    }
    async disconnect() {
      if (this.id <= 0) {
        return;
      }
      let ret = await axios.post("/sqlca/disconnect", { id: this.id });
      if (ret.status === 200) {
        this.id = 0;
        clearTimeout(this._timerPing);
        this._timerPing = 0;
      }
    }
    async begintrans() {
      if (this.id <= 0) {
        return;
      }
      let ret = await axios.post("/sqlca/begintrans", { id: this.id });
      if (ret.status === 200) {
        return 0;
      }
      return -1;
    }
    async commit() {
      if (this.id <= 0) {
        return;
      }
      let ret = await axios.post("/sqlca/commit", { id: this.id });
      if (ret.status === 200) {
        return 0;
      }
      return -1;
    }
    async rollback() {
      if (this.id <= 0) {
        return;
      }
      let ret = await axios.post("/sqlca/rollback", { id: this.id });
      if (ret.status === 200) {
        return 0;
      }
      return -1;
    }
    async retrieveDW(sql, ...arg) {
      let ret = await axios.post("/h5dw/retrieve", { key: sql, args: arg, id: this.id });
      if (ret.status === 200) {
        return ret.data.data;
      }
      throw `retrieve error ${ret.status}`;
    }
    async updateDW(key, data) {
      let ret = await axios.post("/h5dw/update", { key, data, id: this.id });
      if (ret.status === 200) {
        return ret.data.status === 0 ? 1 : -1;
      } else {
        return -1;
      }
    }
    async syntaxFromSQL(sql) {
      let ret = await axios.post("/h5dw/syntax", { sql, id: this.id });
      if (ret.status === 200) {
        return ret.data.data;
      }
      throw `syntaxFromSQL error ${ret.status}`;
    }
    async execute(key, args) {
      let ret = await axios.post("/embedsql", { key, args, id: this.id, autocommit: this.autocommit });
      if (ret.status === 200) {
        return ret.data.data;
      }
      throw `execute error ${ret.status}`;
    }
  }
  root.transaction = transaction;
  class nonvisualobject extends powerobject {
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
      if (!attr.text) {
        attr.text = "";
      }
      this.width = attr.width;
      this.height = attr.height;
      const { events } = options;
      const key = events ? events["create"] : null;
      if (key) {
        let win = this;
        while (win && !win[key] && win.parent) {
          win = win.parent;
        }
        win[key].apply(this);
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
    setredraw() {
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
        },
        disabledOn: "disabled." + attr.name
      };
      this.name = attr.name;
      if (attr.textsize) {
        actl.style.fontSize = attr.textsize + "pt";
      }
      if (attr.visible === false) {
        actl.style.visibility = "hidden";
      }
      if (attr.enabled === false) {
        options.page.data.disabled[attr.name] = true;
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
        addEnabledProperty(this, options.win);
        options.win[this.name] = this;
      }
      if (options.objects) {
        options.objects.push(this);
      }
      return actl;
    }
  }
  class userobject extends windowobject {
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
        const vkey = attrs.name + "_invisible";
        actl.disabledOn = attrs.disabledOn;
        actl.visibleOn = "${!(" + vkey + " === true)}";
        childs = actl.tab.body;
        if (options.win) {
          addVisibleProperty(this, options.win);
        }
        if (attr.visible === false) {
          delete actl.tab.style.visibility;
        }
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
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "tabs";
      actl.mountOnEnter = false;
      const childs = actl.tabs = [];
      for (const c of this.control) {
        let ui = c.toUI(options);
        ui.tab.style.height = "calc(100% - 31px)";
        ui.tab.style.width = "100%";
        ui.tab.style.top = 31;
        childs.push(ui);
      }
      if (options.js && attr.events && attr.events["selectionchanged"]) {
        const inst2 = this;
        actl.onEvent = {
          "change": {
            "actions": [
              {
                "actionType": "custom",
                "script": (ev, ev1, event, ev3) => {
                  inst2.postevent("selectionchanged", ev.activeKey + 1, event.data.value + 1);
                }
              }
            ]
          }
        };
      }
      return actl;
    }
  }
  class pbwindow extends windowobject {
    constructor(options) {
      super(options);
    }
    /* 系统默认事件 */
    onResize(sizetype, newwidth, newheight) {
    }
    onOpen() {
    }
    onTimer() {
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
    timer(interval) {
      if (this._interval) {
        clearInterval(this._timer);
      }
      if (interval > 0) {
        this._interval = setInterval(() => {
          this.onTimer();
        }, interval * 1e3);
      }
    }
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options, true);
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
          "--checkbox-checkbox-default-fontSize": "",
          "--Page-body-padding": 0
          // "--Form-selectOption-height":"",
          // "--select-base-default-fontSize":"",
        },
        data: { showLoading: false, disabled: {} },
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
      const options = { css: amisJson.css, page: amisJson, js: true, win: this, objects: [] };
      let ui = this.toUI(options);
      amisJson.body.push(ui);
      let objects = options.objects;
      const page = this._page = {
        root: root2,
        onResize: (sizetype, newwidth, newheight) => {
          this.resize(newwidth, newheight);
          this.onResize(sizetype, newwidth, newheight);
        },
        onInit: async () => {
          let p = this._page.loadDW;
          if (p) {
            await Promise.all(p);
            this._page.loadDW = null;
          }
          for (let index = objects.length - 1; index >= 0; index--) {
            const obj = objects[index];
            obj.triggerevent("pbconstructor");
          }
          this.onOpen();
        }
      };
      page.inst = this;
      this.root = root2;
      const amis = amisRequire("amis/embed");
      const config = window.baseConfig || parent.baseConfig;
      this.amisLib = amisRequire("amis");
      this.amisScoped = amis.embed(this.root, amisJson, { data: { apiurl: config.api, page: () => {
        return page;
      } } });
    }
    getProps() {
      let ctls = this.amisScoped.getComponents();
      const props = ctls[0].props;
      return props;
    }
    close(rtn) {
      if (this._dialog) {
        this._dialog.hide(rtn);
      }
    }
  }
  class rectangle extends windowobject {
  }
  root.rectangle = rectangle;
  class roundrectangle extends windowobject {
  }
  root.roundrectangle = roundrectangle;
  class statictext extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      actl.type = "tpl";
      actl.tpl = "${" + attr.name + "}";
      options.page.data[attr.name] = attr.text;
      if (options.js && attr.events && attr.events["clicked"]) {
        const inst2 = this;
        actl.onEvent = {
          "click": {
            "actions": [
              {
                "actionType": "custom",
                "script": (e, props) => {
                  inst2.triggerevent("clicked", e, props);
                }
              }
            ]
          }
        };
        actl.style.cursor = "pointer";
      }
      return actl;
    }
  }
  class singlelineedit extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "input-text";
      actl.value = attr.text;
      actl.inputControlClassName = `${this.name}`;
      options.css[`.${attr.name}`] = { "height": attr.height + "px!important", "padding": "0px 5px!important" };
      if (options.js && attr.events && attr.events["modified"]) {
        actl.onEvent = {
          "change": {
            "actions": [
              {
                "actionType": "custom",
                "script": () => {
                  inst.postevent("modified");
                }
              }
            ]
          }
        };
      }
      return actl;
    }
  }
  class multilineedit extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "textarea";
      actl.value = attr.text;
      options.css[`.${attr.name} textarea`] = { "max-height": `${attr.height}px`, "min-height": `${attr.height}px`, "resize": "none" };
      if (options.js && attr.events && attr.events["modified"]) {
        actl.onEvent = {
          "change": {
            "actions": [
              {
                "actionType": "custom",
                "script": () => {
                  inst.postevent("modified");
                }
              }
            ]
          }
        };
      }
      return actl;
    }
  }
  class editmask extends windowobject {
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
      if (options.js && attr.events && attr.events["modified"]) {
        const inst2 = this;
        actl.onEvent = {
          "change": {
            "actions": [
              {
                "actionType": "custom",
                "script": () => {
                  inst2.postevent("modified");
                }
              }
            ]
          }
        };
      }
      return actl;
    }
  }
  class richtextedit extends multilineedit {
  }
  root.richtextedit = richtextedit;
  class commandbutton extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "button";
      actl.label = attr.text;
      if (options.js && attr.events && attr.events["clicked"]) {
        const inst2 = this;
        actl.onClick = (e, props) => {
          inst2.triggerevent("clicked", e, props);
        };
      }
      return actl;
    }
  }
  class checkbox extends windowobject {
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
      this._position = value;
      this.text = this._getValue();
    }
    get position() {
      return this._position;
    }
    set position(value) {
      this._position = value;
      this.text = this._getValue();
    }
  }
  class picture extends windowobject {
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
  function addDWProperties(dwCls) {
    const p = dwCls.prototype;
    p.accepttext = function() {
    };
    p.settransobject = function(db) {
      return this._dw.setTransObject(db);
    };
    p.dbcancel = function() {
    };
    p.getchild = function(name) {
      let dw = this._dw.getChild(name);
      if (dw) {
        return new datawindowchild(dw);
      } else {
        return null;
      }
    };
    p.rowcount = function() {
      return this._dw.rowCount();
    };
    p.setitem = function(row, column, value) {
      return this._dw.setItem(...arguments);
    };
    p.getitem = function(row, column = null) {
      return this._dw.setItem(...arguments);
    };
    p.setitemstatus = function(row, column, dwbuffer, status) {
      return this._dw.setItemsSatus(...arguments);
    };
    p.getitemstatus = function(row, column, dwbuffer) {
      return this._dw.getItemStatus(...arguments);
    };
    p.insertrow = function(row) {
      return this._dw.insertRow(...arguments);
    };
    p.deleterow = function(row) {
      return this._dw.deleteRow(...arguments);
    };
    p.retrieve = async function(...args) {
      return this._dw.retrieve(...arguments);
    };
    p.update = function(accept = true, resetflag = true) {
      return this._dw.update(...arguments);
    };
    p.resetupdate = function() {
      return this._dw.resetUpdate();
    };
    p.reset = function() {
      return this._dw.reset();
    };
    p.setrow = function(row) {
      return this._dw.setRow(...arguments);
    };
    p.scrolltorow = function(row) {
      return this._dw.scrollToRow(...arguments);
    };
    p.getrow = function() {
      return this._dw.getRow(...arguments);
    };
    p.selectrow = function(row, select) {
      return this._dw.selectRow(...arguments);
    };
    p.isselected = function(row) {
      return this._dw.isSelected(...arguments);
    };
    p.getselectedrows = function() {
      return this._dw.getSelectedRows(...arguments);
    };
    p.sharedata = function(dwsecondary) {
      return this._dw.shareData(...arguments);
    };
    p.sharedataoff = function() {
      return this._dw.shareDataOff(...arguments);
    };
    p.rowsmove = function(startrow, endrow, movebuffer, targetdw, beforerow, targetbuffer) {
      return this._dw.rowsMove(...arguments);
    };
    p.rowscopy = function(startrow, endrow, copybuffer, targetdw, beforerow, targetbuffer) {
      return this._dw.rowsCopy(...arguments);
    };
    p.rowsdiscard = function(startrow, endrow, buffer = DWBuffer.Primary) {
      return this._dw.rowsDiscard(...arguments);
    };
    p.setsort = function(format) {
      return this._dw.setSort(...arguments);
    };
    p.sort = function() {
      return this._dw.sort(...arguments);
    };
    p.setfilter = function(format) {
      return this._dw.setFilter(...arguments);
    };
    p.filter = function() {
      return this._dw.filter(...arguments);
    };
    p.filterall = function(text) {
      return this._dw.filterAll(...arguments);
    };
    p.find = function(expression, start, end) {
      return this._dw.find(...arguments);
    };
    p.deletedcount = function() {
      return this._dw.deletedCount(...arguments);
    };
    p.filteredcount = function() {
      return this._dw.filteredCount(...arguments);
    };
    p.modifiedcount = function() {
      return this._dw.modifiedCount(...arguments);
    };
    p.getchanges = function(data) {
      return this._dw.getChanges(...arguments);
    };
    p.setchanges = function(data) {
      return this._dw.setChanges(...arguments);
    };
    p.setrow = function(row) {
      return this._dw.setRow(...arguments);
    };
    p.scrolltorow = function(row) {
      return this._dw.scrollToRow(...arguments);
    };
    p.setredraw = function(redraw) {
      return this._dw.setRedraw(...arguments);
    };
  }
  class datastore extends powerobject {
    constructor(ds) {
      super({});
      if (ds) {
        this._dw = ds;
      } else {
        this._dw = new DataStore();
      }
    }
    get dataobject() {
      return this._dw.dataobject;
    }
    set dataobject(value) {
      this._dw.dataobject = value;
    }
  }
  addDWProperties(datastore);
  class datawindow extends windowobject {
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
            const inst2 = this;
            actl[evName] = (...args) => {
              inst2.triggerevent(key, ...args);
            };
          }
        }
      }
      if (options.win) {
        this._win = options.win;
        this._dataobject = attr.dataobject;
        addPositionProperty(this, () => {
          return this._dw._.targetEl;
        });
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
    get object() {
      return this._dw.object;
    }
    // settransobject(db) {
    //   return this._dw.setTransObject();
    // }
    // rowcount () {
    //   return this._dw.rowCount();
    // }
    // setitem(row,column,value) {
    //   return this._dw.setItem(...arguments);
    // }
    // getitem(row,column = null) {
    //   return this._dw.setItem(...arguments);
    // }
    // setitemstatus ( row, column, dwbuffer, status ) {
    //   return this._dw.setItemsSatus(...arguments);
    // }
    // getitemstatus ( row, column, dwbuffer) {
    //   return this._dw.getItemStatus(...arguments);
    // }
    // insertrow(row) {
    //   return this._dw.insertRow(...arguments);
    // }
    // deleterow ( row ) {
    //   return this._dw.deleteRow(...arguments);
    // }
    // async retrieve(...args) {
    //   return this._dw.retrieve(...arguments);
    // }
    // update(accept = true,resetflag = true) {
    //   return this._dw.update(...arguments);
    // }
    // resetupdate() {
    //   return this._dw.resetUpdate();
    // }
    // reset() {
    //   return this._dw.reset();
    // }
    // setrow(row) {
    //   return this._dw.setRow(...arguments);
    // }
    // scrolltorow(row) {
    //   return this._dw.scrollToRow(...arguments);
    // }
    // getrow() {
    //   return this._dw.getRow(...arguments);
    // }
    // selectrow(row, select) {
    //   return this._dw.selectRow(...arguments);
    // }
    // isselected(row) {
    //   return this._dw.isSelected(...arguments);
    // }
    // getselectedrows() {
    //   return this._dw.getSelectedRows(...arguments);
    // }
    // sharedata(dwsecondary) {
    //   return this._dw.shareData(...arguments);
    // }
    // sharedataoff() {
    //   return this._dw.shareDataOff(...arguments);
    // }
    // rowsmove (  startrow,  endrow, movebuffer, targetdw, beforerow, targetbuffer ) {
    //   return this._dw.rowsMove(...arguments);
    // }
    // rowscopy (  startrow,  endrow, copybuffer, targetdw, beforerow, targetbuffer ) {
    //   return this._dw.rowsCopy(...arguments);
    // }
    // rowsdiscard(startrow,endrow,buffer = DWBuffer.Primary) {
    //   return this._dw.rowsDiscard(...arguments);
    // }
    // setsort(format) {
    //   return this._dw.setSort(...arguments);
    // }
    // sort() {
    //   return this._dw.sort(...arguments);
    // }
    // setfilter(format) {
    //   return this._dw.setFilter(...arguments);
    // }
    // filter() {
    //   return this._dw.filter(...arguments);
    // }
    // filterall(text) {
    //   return this._dw.filterAll(...arguments);
    // }
    // find(expression,start,end) {
    //   return this._dw.find(...arguments);
    // }
    // deletedcount() {
    //   return this._dw.deletedCount(...arguments);
    // }
    // filteredcount() {
    //   return this._dw.filteredCount(...arguments);
    // }
    // modifiedcount() {
    //   return this._dw.modifiedCount(...arguments);
    // }
    // getchanges(data) {
    //   return this._dw.getChanges(...arguments);
    // }
    // setchanges(data) {
    //   return this._dw.setChanges(...arguments);
    // }
  }
  addDWProperties(datawindow);
  class datawindowchild extends datastore {
    constructor(ds) {
      super(ds);
    }
  }
  root.datawindowchild = datawindowchild;
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
  root.datastore = datastore;
})(typeof window !== "undefined" ? window : null);
