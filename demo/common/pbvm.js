// pbvm/pbattr.js
var MouseStyle = {
  "hourglass!": "wait",
  "arrow!": "default",
  "cross!": "crosshair",
  "sizens!": "ns-resize",
  "sizenesw!": "nesw-resize",
  "sizewe!": "ew-resize",
  "sizenwse!": "nwse-resize",
  "uparrow!": "n-resize"
};
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
  let _text2;
  Object.defineProperties(obj, {
    "text": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        obj.setvalues("text", !value);
        _text2 = value;
        setTimeout(() => {
          _text2 = void 0;
        }, 30);
      },
      get: () => {
        if (_text2 !== void 0) {
          return _text2;
        }
        return obj.getvalues("text");
      }
    }
  });
}
function addEnabledProperty(obj, page) {
  let tmpValue;
  Object.defineProperties(obj, {
    "enabled": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        const props = page.getProps();
        props.store.changeValue(`disabled.${obj._id}`, !value);
        tmpValue = value;
        setTimeout(() => {
          _text = void 0;
        }, 30);
      },
      get: () => {
        if (tmpValue !== void 0) {
          return tmpValue;
        }
        const props = page.getProps();
        const disabled = props.store.data[`disabled.${obj._id}`];
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
        props.store.changeValue(`${obj._id}_invisible`, !value);
      },
      get: () => {
        const data = page.getProps().data;
        const key = obj._id + "_invisible";
        const invisible = data[key];
        return !invisible;
      }
    }
  });
}
function addPositionProperty(obj, dom, nofocus = false) {
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
    },
    "backcolor": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        getDom().style["background"] = value;
      },
      get: () => {
        const v = getDom().style["background"];
        return v;
      }
    },
    "background": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        getDom().style["background"] = value;
      },
      get: () => {
        const v = getDom().style["background"];
        return v;
      }
    },
    "textcolor": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        getDom().style["color"] = value;
      },
      get: () => {
        const v = getDom().style["color"];
        return v;
      }
    },
    "pointer": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        value = value.toLowerCase();
        let style = MouseStyle[value];
        if (style) {
          getDom().style["cursor"] = style;
        } else {
          getDom().style["cursor"] = value;
        }
      },
      get: () => {
        const v = getDom().style["cursor"];
        for (const key in MouseStyle) {
          if (MouseStyle[key] === v) {
            return key;
          }
        }
        return v;
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
  obj.setposition = (tag) => {
    switch (tag) {
      case "totop!":
      case "topmost!":
        getDom().style["zIndex"] = 100;
        break;
      case "tobottom!":
        getDom().style["zIndex"] = -1;
        break;
    }
  };
  obj.pointerx = () => {
    const rect = getDom().getBoundingClientRect();
    return integer(globalKeyMouse.clientX - rect.left);
  };
  obj.pointery = () => {
    const rect = getDom().getBoundingClientRect();
    return integer(globalKeyMouse.clientY - rect.top);
  };
  if (!nofocus) {
    obj.setfocus = () => {
      getDom().focus();
    };
  }
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
function addPlaceholderProperty(obj, actl, options, direct = false) {
  const attr = obj._pbprops;
  if (direct) {
    if (attr.placeholder) {
      actl.placeholder = attr.placeholder;
    }
  } else {
    actl.placeholder = `\${${obj._id}_values.placeholder}`;
    if (attr.placeholder) {
      options.page.data[this._id + "_values.placeholder"] = attr.placeholder;
    }
  }
  Object.defineProperties(obj, {
    "placeholder": {
      enumerable: true,
      configurable: true,
      set: (value) => {
        const attr2 = obj._pbprops;
        attr2.placeholder = value;
        obj.setvalues("placeholder", value);
      },
      get: () => {
        const attr2 = obj._pbprops;
        return attr2.placeholder;
      }
    }
  });
}
var keyCodes = {
  "ArrowUp": "keyuparrow!",
  "ArrowDown": "keydownarrow!",
  "ArrowLeft": "keyleftarrow!",
  "ArrowRight": "keyrightarrow!",
  "Backspace": "keyback!",
  "Tab": "keytab!",
  "Enter": "keyenter!"
};
function keyConvert(key) {
  const k = keyCodes[key];
  if (k) {
    return k;
  }
  return `key${key}!`.toLowerCase();
}
function toPBKeyFlag(e) {
  const {
    key,
    ctrlKey,
    shiftKey,
    metaKey
  } = e;
  let flag = shiftKey ? 1 : 0;
  flag = flag + ctrlKey ? 2 : 0;
  const k = keyConvert(key);
  return { flag, key: k };
}
function toPBMouseEventArgs(event, control) {
  const rect = control.getBoundingClientRect();
  const xpos = event.clientX - rect.left;
  const ypos = event.clientY - rect.top;
  let flags = 1;
  if (event.button === 2) {
    flags += 2;
  }
  if (event.shiftKey) {
    flags += 4;
  }
  if (event.ctrlKey) {
    flags += 8;
  }
  if (event.button === 1) {
    flags += 16;
  }
  return { flags, xpos, ypos };
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
      const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
      return parseInt((d2.getTime() - d1.getTime()) / (1e3 * 60 * 60 * 24));
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
var curDir = "/";
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
  },
  getcurrentdirectory() {
    return curDir;
  },
  setcurrentdirectory(dir) {
    curDir = dir;
  }
};
var pbfile_default = PBFile;

// pbvm/pbother.js
var PBUtil = {
  generateuuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  },
  setpbparm(parameter) {
    message.stringparm = void 0;
    message.doubleparm = void 0;
    message.powerobjectparm = void 0;
    const ptype = typeof parameter;
    if (ptype === "string") {
      message.stringparm = parameter;
    } else if (ptype === "number") {
      message.doubleparm = parameter;
    } else {
      message.powerobjectparm = parameter;
    }
  }
};
var pbother_default = PBUtil;

// pbvm/pbvm.js
(function(root) {
  root = root || global;
  if (root.powerobject) {
    return;
  }
  root.globalKeyMouse = {};
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
      return " ".repeat(n);
    },
    char(n) {
      return String.fromCharCode(n);
    },
    asc(value) {
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
      if (value === null || value === void 0) {
        return "";
      }
      if (typeof fmt === "string") {
        if (value.format) {
          if (value instanceof Date) {
            if (fmt.indexOf("yymm") !== -1) {
              fmt = fmt.replace("yymm", "yyMM");
            } else if (fmt.indexOf("yy-mm") !== -1) {
              fmt = fmt.replace("yy-mm", "yy-MM");
            }
          }
          return value.format(fmt);
        } else {
          return `${value}`;
        }
      } else if (value instanceof Uint8Array) {
        const de = new TextDecoder();
        return de.decode(value);
      } else {
        return `${value}`;
      }
    },
    integer(value) {
      return parseInt(value, 10);
    },
    int(value) {
      return this.integer(value);
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
    blob(value) {
      if (typeof value === "string") {
        let en = new TextEncoder();
        return en.encode(value);
      } else if (value instanceof Uint8Array) {
        return value;
      } else {
        return null;
      }
    },
    isnumber(value) {
      if (typeof value === "string") {
        if (value.trim() === "") {
          return false;
        }
      }
      return isNaN(Number(value));
    },
    round(x, n = 0) {
      const c = x * Math.pow(10, n);
      return Math.round(c) / Math.pow(10, n);
    },
    abs(n) {
      return Math.abs(n);
    },
    sign(n) {
      return n === 0 ? 0 : n > 0 ? 1 : -1;
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
    hex(d) {
      let str = d.toString(16);
      if (str.length % 2 === 1) {
        str = `0${str}`;
      }
      return str;
    },
    pbcolor(value) {
      const r = value & 255;
      const g = value >> 8 & 255;
      const b = value >> 16 & 255;
      const color = `#${hex(r)}${hex(g)}${hex(b)}`;
      return color;
    },
    rgb(r, g, b) {
      return `#${hex(r)}${hex(g)}${hex(b)}`;
    },
    randomize(n) {
      return n;
    },
    garbagecollect() {
    },
    async triggerevent(obj, func, ...args) {
      let key = null;
      if (obj._pbprops && obj._pbprops.events) {
        key = obj._pbprops.events[func];
        if (obj._pbprops.events[key]) {
          key = obj._pbprops.events[key];
        }
      }
      let f;
      let win = obj;
      while (win && !win[key] && win.parent) {
        win = win.parent;
      }
      if (win && win[key]) {
        f = win[key];
        if (f) {
          return await f.call(win, { ctl: obj, pro: win.__proto__, name: key, func }, ...args);
        }
      } else {
        f = obj[func];
        if (f) {
          return await f.call(obj, { ctl: obj, name: key, func }, ...args);
        }
      }
    },
    // 实现事件super的功能，先找窗口和继承窗口中是否有这个事件，如果有就执行，如果没有，执行对象的事件
    // 注意：如果窗口使用自定义对象，自定义对象也有这个事件，那么窗口事件的名称需要和自定义对象的名称一样，自定义对象本身的事件方法才能执行
    // async superevent( {ctl, pro, name, func}, ...arg) {
    //   const p = pro.__proto__;
    //     if (p[name]) {
    //       await p[name].call(this, { ctl, pro: p, name, func }, ...arg);
    //     } else if (ctl[func]) {
    //       await ctl[func].call(ctl, { ctl, pro: p, name, func }, ...arg);
    //     } else {
    //       // func:pbm_size , events: {pbm_size:onresize}
    //       if (ctl._pbprops && ctl._pbprops.events) {
    //         const key = obj._pbprops.events[func]
    //         if (ctl[key]) {
    //           await ctl[key].call(ctl, { ctl, pro: p, name, func }, ...arg);
    //         }
    //       }
    //     }
    // },
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
    },
    base64Encode(data) {
      const maxargs = 4096;
      const strs = [];
      for (var i = 0, l = data.length; i < l; i += maxargs) {
        strs.push(String.fromCharCode.apply(null, data.subarray(i, i + maxargs)));
      }
      return window.btoa(strs.join(""));
    },
    base64Decode(base64Str) {
      let binaryString = window.atob(base64Str);
      let uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }
      return uint8Array;
    }
  };
  PB.message = {};
  PB.posa = PB.pos;
  PB.lena = PB.len;
  PB.mida = PB.mid;
  PB.lefta = PB.left;
  PB.righta = PB.right;
  Object.assign(PB, pbdate_default);
  Object.assign(PB, pbfile_default);
  window.PBUtil = pbother_default;
  const MouseStyle2 = {
    "hourglass!": "wait",
    "arrow!": "default",
    "cross!": "crosshair",
    "sizens!": "ns-resize",
    "sizenesw!": "nesw-resize",
    "sizewe!": "ew-resize",
    "sizenwse!": "nwse-resize",
    "uparrow!": "n-resize"
  };
  PB.setpointer = function(style) {
    console.warn("pbvm setpointer\u5728\u51FD\u6570\u7ED3\u675F\u8981\u81EA\u52A8\u6062\u590D\u9F20\u6807\uFF0Cjs\u4E0D\u652F\u6301\uFF0C\u8981\u624B\u52A8\u6062\u590D");
    const key = style.toLowerCase();
    const m = MouseStyle2[key];
    if (m) {
      document.body.style.cursor = m;
    } else {
      console.warn("pbvm setpointer\u672A\u5B9E\u73B0");
    }
  };
  PB.send = function(style) {
    console.warn("pbvm send\u51FD\u6570\u4E0D\u652F\u6301");
  };
  PB.handle = function(style) {
    console.warn("pbvm handle\u51FD\u6570\u4E0D\u652F\u6301");
  };
  PB.keydown = function(keycode) {
    keycode = keycode.toLowerCase();
    switch (keycode) {
      case "keyleftbutton!":
        return globalKeyMouse.buttons === 1;
      case "keymiddlebutton!":
        return globalKeyMouse.buttons === 1;
      case "keyrightbutton!":
        return globalKeyMouse.buttons === 2;
      case "Keyshift!":
        return globalKeyMouse.shiftKey;
      case "keycontrol!":
        return globalKeyMouse.ctrlKey;
      case "keyalt!":
        return globalKeyMouse.altKey;
    }
    const { key } = toPBKeyFlag(globalKeyMouse);
    return key === keycode;
  };
  PB.mouseMoveUp = function(target, movefunc, upfunc) {
    target.removeEventListener("mouseup", target.xEvtUp);
    target.removeEventListener("mousemove", movefunc);
    target.addEventListener("mousemove", movefunc);
    const t = target;
    t.xEvtUp = (evt) => {
      target.removeEventListener("mousemove", movefunc);
      target.removeEventListener("mouseup", target.xEvtUp);
      upfunc(evt);
    };
    target.addEventListener("mouseup", target.xEvtUp);
  };
  function setAmisRoot(amis) {
    if (!amis) {
      amis = amisRequire("amis/embed");
    }
    let aroot = document.querySelector("#__amisroot");
    if (!aroot) {
      const div = document.createElement("div");
      div.style.top = "-5000px";
      div.style.width = "0px";
      div.style.height = "0px";
      div.style.position = "absolute";
      div.id = "__amisroot";
      document.body.appendChild(div);
      aroot = div;
    }
    amis.embed(aroot, {});
  }
  function messagebox(title, text, icon2, button = "OK!") {
    const amis = amisRequire("amis");
    return new Promise((resolve) => {
      const key = button.toLowerCase();
      if (key === "ok!") {
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
      } else if (key === "yesno!") {
        const p = amis.confirm(text, title, { confirmBtnLevel: "primary", confirmText: "\u662F", cancelText: "\u5426" });
        p.then((rtn) => {
          resolve(rtn ? 1 : 2);
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
  PB.openwithparm = function(windowvar, parameter, root2) {
    pbother_default.setpbparm(parameter);
    const w = new windowvar();
    let windowtype = w._pbprops.windowtype;
    const modalOptions = {
      width: w._pbprops.width,
      resizeable: true,
      maximized: false
    };
    if (w._pbprops.windowtype === "response!" || w._pbprops.resizeable === false) {
      modalOptions.resizeable = false;
    }
    if (w._pbprops.windowstate === "maximized!") {
      modalOptions.maximized = true;
    }
    modalOptions.titlebar = false;
    if (w._pbprops.titlebar === "true" || w._pbprops.titlebar === true) {
      modalOptions.titlebar = true;
    }
    let content;
    if (root2) {
      content = root2;
      windowvar.instance = w;
      w.show(content);
      return;
    }
    content = document.createElement("div");
    const d = new H5UI.Modal(w._pbprops.title, [content], modalOptions);
    w._dialog = d;
    return new Promise((resolve) => {
      d.show((returnvalue) => {
        setAmisRoot();
        pbother_default.setpbparm(returnvalue);
        delete windowvar.instance;
        if (windowtype === "response!") {
          resolve(returnvalue);
        }
      }, () => {
        PB.closewithreturn(windowvar);
      });
      windowvar.instance = w;
      w.show(content);
      if (windowtype !== "response!") {
        resolve(1);
      }
    });
  };
  PB.closewithreturn = async function(windowname, returnvalue) {
    PB.message.stringparm = void 0;
    PB.message.doubleparm = void 0;
    PB.message.powerobjectparm = void 0;
    let instance = windowname;
    if (typeof windowname === "function" && typeof windowname.instance === "object") {
      instance = windowname.instance;
    }
    if (instance.closequery) {
      if (await instance.closequery() === 1) {
        return;
      }
    }
    if (instance.onClose) {
      instance.onClose();
    }
    if (instance.close) {
      instance.close(returnvalue);
    }
  };
  Object.assign(root, PB);
  PB.close = PB.closewithreturn;
  PB.open = PB.openwithparm;
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
    async triggerevent(eventName, ...args) {
      if (PB.right(eventName, 1) === "!") {
        eventName = eventName.substring(0, eventName.length - 1);
      }
      await PB.triggerevent(this, eventName, ...args);
    }
    postevent(eventName, ...args) {
      setTimeout(() => {
        PB.triggerevent(this, eventName, ...args);
      }, 0);
    }
    // 实现事件super的功能，先找窗口和继承窗口中是否有这个事件，如果有就执行，如果没有，执行对象的事件
    // 注意：如果窗口使用自定义对象，自定义对象也有这个事件，那么窗口事件的名称需要和自定义对象的名称一样，自定义对象本身的事件方法才能执行
    async superevent(f, ...arg) {
      if (arg.length > 0) {
        const { ctl, pro, name, func } = arg[0];
        if (ctl) {
          if (f) {
            await f.call(this, ...arg);
          } else if (ctl[func]) {
            await ctl[func].call(ctl, ...arg);
          } else if (ctl._pbprops && ctl._pbprops.events) {
            const key = ctl._pbprops.events[func];
            if (key && ctl[key]) {
              await ctl[key].call(ctl, ...arg);
            }
          }
          return;
        }
      }
      await f.call(this, ...arg);
    }
    _join_props(props) {
      if (!props) return;
      if (props && props.name) {
        this.name = props.name;
      }
      let events;
      if (this._pbprops.events && props.events) {
        events = {};
        Object.assign(events, this._pbprops.events, props.events);
      }
      Object.assign(this._pbprops, props);
      if (events) {
        this._pbprops.events = events;
      }
    }
    pbconstructor() {
    }
    destructor() {
    }
  }
  class pbcursor extends powerobject {
    constructor(key, args, db) {
      super({});
      this.key = key;
      this.db = db;
      this.args = args;
    }
    open() {
      this.data = this.db.opencursor(this.key, this.args);
      this.index = 0;
    }
    close() {
      this.data = null;
    }
    fetch() {
      if (this.data && this.data.length >= this.index) {
        this.db.sqlcode = 0;
        return this.data[this.index];
        this.index++;
      } else {
        this.db.sqlcode = -1;
      }
    }
  }
  root.pbcursor = pbcursor;
  const config = root.baseConfig;
  if (config && config.api) {
    axios.defaults.baseURL = config.api;
  }
  class transaction extends powerobject {
    dbms = "";
    sqlcode = 0;
    sqlerrtext = "";
    sqlnrows = 0;
    id = 0;
    autocommit = false;
    cursor = {};
    url = "";
    async ping() {
      if (this.id <= 0) {
        clearInterval(this._timerPing);
        this._timerPing = 0;
        return 0;
      }
      let ret = await axios.post(this.url + "/sqlca/ping", { id: this.id });
      if (ret.status === 200) {
        return 0;
      } else {
        return -1;
      }
    }
    async connect() {
      let ret = await axios.post(this.url + "/sqlca/connect", { key: this.dbms });
      if (ret.status === 200) {
        this.id = ret.data.id;
        this._timerPing = setInterval(() => {
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
      let ret = await axios.post(this.url + "/sqlca/disconnect", { id: this.id });
      if (ret.status === 200) {
        this.id = 0;
        clearInterval(this._timerPing);
        this._timerPing = 0;
      }
    }
    async begintrans() {
      if (this.id <= 0) {
        return;
      }
      let ret = await axios.post(this.url + "/sqlca/begintrans", { id: this.id });
      if (ret.status === 200) {
        return 0;
      }
      return -1;
    }
    async commit() {
      if (this.id <= 0) {
        return;
      }
      let ret = await axios.post(this.url + "/sqlca/commit", { id: this.id });
      if (ret.status === 200) {
        return 0;
      }
      return -1;
    }
    async rollback() {
      if (this.id <= 0) {
        return;
      }
      let ret = await axios.post(this.url + "/sqlca/rollback", { id: this.id });
      if (ret.status === 200) {
        return 0;
      }
      return -1;
    }
    async retrieveDW(sql, ...arg) {
      for (let i = 0; i < arg.length; ++i) {
        if (arg[i] instanceof Date) {
          arg[i] = arg[i].format("yyyy-MM-dd hh:mm:ss");
        }
      }
      let ret = await axios.post(this.url + "/h5dw/retrieve", { key: sql, args: arg, id: this.id });
      if (ret.status === 200) {
        return ret.data.data;
      }
      throw `retrieve error ${ret.status}`;
    }
    async updateDW(key, data) {
      let ret = await axios.post(this.url + "/h5dw/update", { key, data, id: this.id });
      if (ret.status === 200) {
        return ret.data.status === 0 ? 1 : -1;
      } else {
        return -1;
      }
    }
    async syntaxfromsql(sql) {
      let ret = await axios.post(this.url + "/h5dw/syntax", { sql, id: this.id });
      if (ret.status === 200) {
        this.sqlcode = ret.data.status === 0 ? 0 : -1;
        if (this.sqlcode !== 0) {
          this.sqlerrtext = ret.data.msg;
          throw `syntaxFromSQL error ${ret.data.msg}`;
        }
        return ret.data.dataobject;
      }
      throw `syntaxFromSQL error ${ret.status}`;
    }
    async query(key, args) {
      let ret = await axios.post(this.url + "/queryembedsql", { key, args, id: this.id });
      this.sqlnrows = 0;
      if (ret.status === 200) {
        this.sqlcode = ret.data.status === 0 ? 0 : -1;
        if (this.sqlcode !== 0) {
          this.sqlerrtext = ret.data.msg;
          return [];
        } else {
          this.sqlnrows = ret.data.data.length;
        }
        return ret.data.data;
      } else {
        this.sqlcode = -1;
        return [];
      }
    }
    async queryblob(key, args) {
      let r = await this.query(key, args);
      if (r.length > 0) {
        let a = base64Decode(r[0]);
        r[0] = a;
      }
      return r;
    }
    async execute(key, args) {
      let ret = await axios.post(this.url + "/embedsql", { key, args, id: this.id });
      this.sqlnrows = 0;
      if (ret.status === 200) {
        this.sqlcode = ret.data.status === 0 ? 0 : -1;
        this.sqlnrows = ret.data.data;
        if (this.sqlcode !== 0) {
          this.sqlerrtext = ret.data.msg;
          return -1;
        }
        return ret.data.data;
      } else {
        this.sqlcode = -1;
        return -1;
      }
    }
    async opencursor(key, args) {
      let ret = await axios.post(this.url + "/queryembedsql", { key, args, id: this.id, cursor: true });
      if (ret.status === 200) {
        this.sqlcode = ret.data.status;
        const data = ret.data.data;
        if (data.length > 0) {
          this.sqlcode = 0;
        } else {
          this.sqlcode = -1;
        }
        return data;
      } else {
        this.sqlcode = -1;
        return [];
      }
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
  }
  root.nonvisualobject = nonvisualobject;
  class windowobject extends powerobject {
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
      if (attr.x === void 0) {
        attr.x = 0;
      }
      if (attr.y === void 0) {
        attr.y = 0;
      }
      this.width = attr.width;
      this.height = attr.height;
      const { events } = options;
      let key = events ? events["create"] : null;
      if (key === null && attr.name) {
        key = attr.name + "_create";
      }
      if (key) {
        let win = this;
        while (win && !win[key] && win.parent) {
          win = win.parent;
        }
        if (win[key]) {
          if (!attr.events) {
            attr.events = { "create": key };
          } else {
            attr.events["create"] = key;
          }
          win[key].apply(this);
          return;
        }
      }
      this.create();
    }
    get tag() {
      const attr = this._pbprops;
      return attr.tag;
    }
    set tag(value) {
      const attr = this._pbprops;
      attr.tag = value;
    }
    move(x, y) {
    }
    resize(w, h) {
    }
    show() {
      this.visible = true;
    }
    hide() {
      this.visible = false;
    }
    setredraw(value) {
      for (const c of this.control) {
        if (typeof c.setredraw === "function") {
          c.setredraw(value);
        }
      }
    }
    create() {
    }
    destroy() {
    }
    getparent() {
      return this.parent;
    }
    parentwindow() {
      let p = this.parent;
      while (p) {
        if (p.typeof() === "window!") {
          return p;
        }
        p = p.parent;
      }
      return null;
    }
    toUI(options, addprop = true) {
      const attr = this._pbprops;
      let uiKey = attr.name;
      this._uiOptions = options;
      if (options.win) {
        const id = options.win.getnewid();
        uiKey = attr.name + "_" + id;
        this._id = uiKey;
      }
      let actl = {
        type: "tpl",
        id: uiKey,
        name: uiKey,
        className: uiKey,
        style: {
          left: attr.x,
          top: attr.y,
          width: attr.width,
          height: attr.height,
          position: "absolute",
          whiteSpace: "nowrap"
        },
        disabledOn: `disabled.${uiKey}`
      };
      this.name = attr.name;
      if (attr.textsize) {
        actl.style.fontSize = attr.textsize + "pt";
      }
      if (attr.textcolor) {
        actl.style.color = attr.textcolor;
      }
      if (attr.background) {
        actl.style.background = attr.background;
      }
      if (attr.bringtotop === "true" || attr.bringtotop === true) {
        actl.style.zIndex = 100;
      }
      if (attr.visible === false) {
        actl.style.visibility = "hidden";
      }
      if (attr.fontsize) {
        actl.style.fontSize = attr.fontsize;
      }
      if (attr.enabled === false) {
        options.page.data.disabled[uiKey] = true;
      }
      if (attr.html) {
        actl.tpl = attr.html;
      } else {
        actl.tpl = `${this._className}:${attr.name}`;
      }
      if (options.win) {
        const attrKeys = Object.keys(attr);
        for (const key of attrKeys) {
          if (this.hasOwnProperty(key)) {
            this[key] = attr[key];
          }
        }
        let control = null;
        let win = options.win;
        this.raw = () => {
          if (control) {
            return control;
          }
          control = win.root.querySelector(`.${uiKey}`);
          return control;
        };
        this.style = new Proxy(this, {
          get(target, key) {
            let result = target.raw().style[key];
            return result;
          },
          set(target, key, value) {
            const style = target.raw().style;
            style[key] = value;
            return true;
          }
        });
      }
      if (addprop && options.win) {
        addPositionProperty(this, this.raw);
      }
      if (options.win) {
        addTextProperty(this, options.win);
        addEnabledProperty(this, options.win);
        options.win[this.name] = this;
        const inst = this;
        this.setvalues = (key, data) => {
          const props = options.win.getProps();
          props.store.changeValue(`${inst._id}_values.${key}`, data);
        };
        this.getvalues = (key) => {
          const props = options.win.getProps();
          return props.store.data[`${inst._id}_values.${key}`];
        };
        this.doaction = (action) => {
          const props = options.win.getProps();
          let ctls = options.win.amisScoped.getComponents();
          ctls[0].handleAction(void 0, action, props.store.data, true);
        };
      }
      if (options.objects) {
        options.objects.push(this);
      }
      return actl;
    }
    //控件完成创建后操作dom
    pbattributes() {
      const attr = this._pbprops;
      if (!attr.events) return;
      let control = this.raw();
      if (control) {
        if (attr.events["pbm_keyup"]) {
          control.onkeyup = (e) => {
            globalKeyMouse = e;
            const { key, flag } = toPBKeyFlag(e);
            this.triggerevent("pbm_keyup", key, flag, e);
            globalKeyMouse = {};
          };
        }
        if (attr.events["pbm_keydown"]) {
          control.onkeydown = (e) => {
            globalKeyMouse = e;
            const { key, flag } = toPBKeyFlag(e);
            this.triggerevent("pbm_keydown", key, flag, e);
            globalKeyMouse = {};
          };
        }
        if (attr.events["pbm_mousemove"]) {
          control.onmousemove = (e) => {
            globalKeyMouse = e;
            const { flag, xpos, ypos } = toPBMouseEventArgs(e, control);
            this.triggerevent("pbm_mousemove", flag, xpos, ypos, e);
            globalKeyMouse = {};
          };
        }
        if (attr.events["pbm_lbuttondown"]) {
          control.onmousedown = (e) => {
            globalKeyMouse = e;
            const { flag, xpos, ypos } = toPBMouseEventArgs(e, control);
            this.triggerevent("pbm_lbuttondown", flag, xpos, ypos, e);
            globalKeyMouse = {};
          };
        }
        if (attr.events["pbm_lbuttonup"]) {
          control.onmouseup = (e) => {
            globalKeyMouse = e;
            const { flag, xpos, ypos } = toPBMouseEventArgs(e, control);
            this.triggerevent("pbm_lbuttonup", flag, xpos, ypos, e);
            globalKeyMouse = {};
          };
        }
        if (attr.events["pbm_size"]) {
          let lastWidth, lastHeight, lastTime;
          let rt;
          const resizeObserver = new ResizeObserver((entries, observer) => {
            const width = this.width;
            const height = this.height;
            if (rt) clearTimeout(rt);
            if (lastHeight !== height || lastWidth !== width || /* @__PURE__ */ new Date() - lastTime > 1e3) {
              rt = setTimeout(() => {
                lastTime = /* @__PURE__ */ new Date();
                lastWidth = width;
                lastHeight = height;
                this.triggerevent("pbm_size", 0, width, height);
              }, 15);
            }
          });
          resizeObserver.observe(control);
        }
      }
    }
  }
  class userobject extends windowobject {
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
        const vkey = this._id + "_invisible";
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
        actl.style.padding = 0;
        childs = actl.body = [];
      }
      for (const c of this.control) {
        childs.unshift(c.toUI(options));
      }
      if (attr.schema) {
        childs.push(attr.schema);
      }
      return actl;
    }
  }
  class tab extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.style.display = "flex";
      actl.style.flexDirection = "column";
      actl.type = "tabs";
      actl.mountOnEnter = false;
      actl.activeKey = "${" + this._id + "_values.activeKey|toInt}";
      if (attr.selectedtab !== void 0) {
        let index = parseInt(attr.selectedtab);
        if (index > 0) index = index - 1;
        options.page.data[this._id + "_values.activeKey"] = index;
        this._selectedtab = index + 1;
      }
      const childs = actl.tabs = [];
      for (const c of this.control) {
        let ui = c.toUI(options);
        ui.tab.style.height = "100%";
        ui.tab.style.width = "100%";
        ui.tab.style.left = 0;
        ui.tab.style.top = 0;
        ui.tab.style.position = "relative";
        ui.tab.style.padding = 0;
        childs.push(ui);
        this._addTabPageTitle(c);
      }
      if (options.js && attr.events && attr.events["selectionchanged"]) {
        const inst = this;
        actl.onEvent = {
          "change": {
            "actions": [
              {
                "actionType": "custom",
                "script": (ev, ev1, event, ev3) => {
                  inst.selectedtab = event.data.value;
                  inst.setvalues("activeKey", event.data.value - 1);
                  inst.postevent("selectionchanged", ev.activeKey + 1, event.data.value);
                }
              }
            ]
          }
        };
      }
      this._addSelectedTabProperty();
      return actl;
    }
    pbattributes() {
      super.pbattributes();
      const attr = this._pbprops;
      let control = this.raw();
      if (!control) return;
      let content = control.querySelector(".cxd-Tabs-content");
      if (content) {
        content.style.flex = "1";
        content.style.display = "flex";
        content.style.padding = "0px";
        for (let i = 0; i < content.children.length; i++) {
          let child = content.children[i];
          child.style.flex = "1";
          child.style.padding = "0px";
        }
      }
    }
    selecttab(index) {
      if (index > 0 && index <= this.control.length) {
        let oldIndex = this._selectedtab;
        this._selectedtab = index;
        this.setvalues("activeKey", index - 1);
        this.postevent("selectionchanged", oldIndex, index);
      }
    }
    _addTabPageTitle(tabpage) {
      let inst = this;
      Object.defineProperties(tabpage, {
        "text": {
          enumerable: true,
          configurable: true,
          set: (value) => {
            let index = inst.control.findIndex((item) => item === tabpage);
            if (index >= 0) {
              const { win } = inst._uiOptions;
              let mytab = win.amisScoped.getComponentByName(`p1.${inst._id}`);
              mytab.handleEdit(index, value);
            }
          },
          get: () => {
            let index = inst.control.findIndex((item) => item === tabpage);
            if (index >= 0) {
              const { win } = inst._uiOptions;
              let mytab = win.amisScoped.getComponentByName(`p1.${inst._id}`);
              return mytab.state.localTabs[index].title;
            }
          }
        }
      });
    }
    _addSelectedTabProperty() {
      let inst = this;
      Object.defineProperties(this, {
        "selectedtab": {
          enumerable: true,
          configurable: true,
          set: (value) => {
            inst.selecttab(value);
          },
          get: () => {
            return inst._selectedtab;
          }
        }
      });
    }
    opentabwithparm(...args) {
      return new Promise((resolve, reject) => {
        let userobjectvar, parameter, index;
        let title = "newtab";
        if (typeof args[2] === "string") {
          parameter = args[1];
          userobjectvar = window[args[2]];
          index = args[3];
          if (args.length > 4) {
            title = args[4];
          }
        } else {
          userobjectvar = args[0];
          parameter = args[1];
          index = args[2];
          if (args.length > 3) {
            title = args[3];
          }
        }
        const { win } = this._uiOptions;
        let mytab = win.amisScoped.getComponentByName(`p1.${this._id}`);
        const localTabs = mytab.state.localTabs.concat();
        if (index === void 0) {
          index = mytab.state.localTabs.length;
        }
        let key = "a" + pbother_default.generateuuid().replaceAll("-", "").substring(0, 8);
        let tabpage = new userobject({ name: key }, this);
        let options = {
          win,
          page: { data: { disabled: {} } },
          js: true
        };
        let tjson = tabpage.toUI(options);
        tjson.tab.style = {
          height: "100%",
          width: "100%",
          left: "0px",
          top: "0px",
          padding: "0px",
          position: "relative"
        };
        key = tjson.tab.name;
        let json = {
          title,
          body: tjson.tab
        };
        localTabs.splice(index - 1, 0, json);
        mytab.setState(
          {
            localTabs,
            activeKey: index - 1
          },
          () => {
          }
        );
        let uo = win.openuserobjectwithparm(userobjectvar, parameter, {
          name: "user" + key,
          callback: () => {
            this.control.push(uo);
            this._addTabPageTitle(uo);
            let c = this.raw().querySelector(`.${key}`);
            c.style.flex = "1";
            c.style.padding = "0px";
            c.style.display = "flex";
            let content = c.parentElement;
            content.style.flex = "1";
            content.style.padding = "0px";
            let r = uo.raw();
            r.style.padding = "0px";
            r.style.width = "100%";
            r.style.height = "100%";
            c.appendChild(r);
            resolve(uo);
          }
        });
      });
    }
    closetab(userobjectvar) {
      for (let index = 0; index < this.control.length; index++) {
        if (this.control[index] === userobjectvar) {
          this.control.splice(index, 1);
          const { win } = this._uiOptions;
          let mytab = win.amisScoped.getComponentByName(`p1.${this._id}`);
          mytab.handleClose(index, false);
        }
      }
    }
  }
  class pbwindow extends windowobject {
    _idindex = 0;
    constructor(options) {
      super(options);
    }
    getnewid() {
      ++this._idindex;
      return this._idindex;
    }
    typeof() {
      return "window!";
    }
    /* 系统默认事件 */
    onResize(sizetype, newwidth, newheight) {
    }
    async onOpen() {
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
    parentwindow() {
      return null;
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
      if (options.page && attr.data) {
        Object.assign(options.page.data, attr.data);
      }
      return actl;
    }
    show(root2) {
      const amisJson = {
        type: "page",
        name: "p1",
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
          "visibleOn": "${showLoading}",
          "tip": "\u52A0\u8F7D\u4E2D..."
        }],
        events: []
      };
      const options = { css: amisJson.css, page: amisJson, js: true, win: this, objects: [] };
      let ui = this.toUI(options);
      amisJson.body.push(ui);
      let objects = options.objects;
      let firstResize = true;
      const page = this._page = {
        root: root2,
        onResize: (sizetype, newwidth, newheight) => {
          if (firstResize) {
            firstResize = false;
            const attr = this._pbprops;
            this.onResize(sizetype, attr.width, attr.height);
            if (attr.width !== newwidth || attr.height !== newheight) {
              this.resize(newwidth, newheight);
              this.onResize(sizetype, newwidth, newheight);
            }
          } else {
            this.resize(newwidth, newheight);
            this.onResize(sizetype, newwidth, newheight);
          }
        },
        onInit: async () => {
          let p = this._page.loadDW;
          if (p) {
            await Promise.all(p);
            this._page.loadDW = null;
          }
          for (let index = objects.length - 1; index >= 0; index--) {
            const obj = objects[index];
            if (obj["pbattributes"]) {
              obj["pbattributes"]();
            }
            await obj.triggerevent("pbconstructor");
          }
          await this.onOpen();
        }
      };
      page.inst = this;
      this.root = root2;
      const amis = amisRequire("amis/embed");
      const config2 = window.baseConfig || parent.baseConfig;
      this.amisLib = amisRequire("amis");
      this.amisScoped = amis.embed(
        this.root,
        amisJson,
        { data: { apiurl: config2.api, page: () => {
          return page;
        } } },
        {
          theme: null,
          useMobileUI: false
        }
      );
      this.amisJson = amisJson;
      setAmisRoot(amis);
    }
    showWaitting(tip) {
      const props = this.getProps();
      props.store.changeValue("showLoading", true);
      props.store.changeValue("spinner_tip", tip);
    }
    closeWaitting() {
      const props = this.getProps();
      props.store.changeValue("showLoading", false);
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
      if (this.root) {
        this.root.innerHTML = "";
      }
    }
    pbattributes() {
      super.pbattributes();
      let control = this.raw();
      if (!control) return;
      control.addEventListener("keydown", (e) => {
        globalKeyMouse = e;
      });
      control.addEventListener("keyup", (e) => {
        globalKeyMouse = {};
      });
    }
    openuserobjectwithparm(userobjectvar, parameter, options) {
      pbother_default.setpbparm(parameter);
      const div = document.createElement("div");
      let opts = { x: 0, y: 0, name: "", ...options };
      let { x, y } = opts;
      let w1 = new pbwindow({
        name: "tmp" + Date.now(),
        width: 300,
        height: 300
      });
      w1.onOpen = () => {
        const b = this.raw();
        const u = uo.raw();
        b.appendChild(u);
        if (opts.callback) {
          opts.callback(uo);
        }
      };
      let uo = new userobjectvar({ name: opts.name, x, y }, w1);
      w1.control = [uo];
      w1.show(div);
      return uo;
    }
  }
  function calculateDistance(pointA, pointB) {
    if (pointB.x === pointA.x) {
      return Math.abs(pointB.y - pointA.y);
    }
    if (pointB.y === pointA.y) {
      return Math.abs(pointB.x - pointA.x);
    }
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function calculateAngleWithXAxis(pointA, pointB) {
    const x1 = pointA.x;
    const y1 = pointA.y;
    const x2 = pointB.x;
    const y2 = pointB.y;
    if (x1 === x2) {
      return y2 > y1 ? 90 : 270;
    }
    const m = (y2 - y1) / (x2 - x1);
    let angleInRadians = Math.atan(m);
    let angleInDegrees = angleInRadians * 180 / Math.PI;
    if (x2 > x1 && y2 < y1) {
      angleInDegrees += 180;
    } else if (x2 < x1 && y2 > y1) {
      angleInDegrees += 180;
    } else if (x2 < x1 && y2 < y1) {
      angleInDegrees += 360;
    }
    return angleInDegrees;
  }
  const lineStyle = {
    "dot!": "dotted",
    "dash!": "dashed",
    "transparent!": "none"
  };
  class line extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "divider";
      actl.style.left = attr.beginx;
      actl.style.top = attr.beginy;
      if (attr.linestyle && lineStyle[attr.linestyle]) {
        actl.style.borderStyle = lineStyle[attr.linestyle];
      }
      const { width, rotate } = this.getPos();
      actl.style.height = 0;
      actl.color = attr.linecolor;
      if (attr.linethickness) {
        actl.style.borderBottomWidth = attr.linethickness;
      }
      actl.style.width = width;
      actl.rotate = rotate;
      return actl;
    }
    get beginx() {
      const attr = this._pbprops;
      return attr.beginx;
    }
    set beginx(value) {
      const attr = this._pbprops;
      if (attr.beginx === value) {
        return;
      }
      attr.beginx = value;
      const { width, rotate } = this.getPos();
      this.style.left = value + "px";
      this.style.width = width + "px";
      this.style.transform = `rotate(${rotate}deg)`;
    }
    get endx() {
      const attr = this._pbprops;
      return attr.endx;
    }
    set endx(value) {
      const attr = this._pbprops;
      if (attr.endx === value) {
        return;
      }
      attr.endx = value;
      const { width, rotate } = this.getPos();
      this.style.width = width + "px";
      this.style.transform = `rotate(${rotate}deg)`;
    }
    get beginy() {
      const attr = this._pbprops;
      return attr.beginy;
    }
    set beginy(value) {
      const attr = this._pbprops;
      if (attr.beginy === value) {
        return;
      }
      attr.beginy = value;
      const { width, rotate } = this.getPos();
      this.style.top = value + "px";
      this.style.width = width + "px";
      this.style.transform = `rotate(${rotate}deg)`;
    }
    get endy() {
      const attr = this._pbprops;
      return attr.endy;
    }
    set endy(value) {
      const attr = this._pbprops;
      if (attr.endy === value) {
        return;
      }
      attr.endy = value;
      const { width, rotate } = this.getPos();
      this.style.width = width + "px";
      this.style.transform = `rotate(${rotate}deg)`;
    }
    getPos() {
      const attr = this._pbprops;
      let begin = { x: attr.beginx, y: attr.beginy };
      let end = { x: attr.endx, y: attr.endy };
      const width = calculateDistance(begin, end);
      let rotate = 0;
      if (begin.y !== end.y) {
        rotate = calculateAngleWithXAxis(begin, end);
      }
      return { width, rotate };
    }
  }
  root.line = line;
  class rectangle extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.style.border = "solid";
      if (attr.linestyle && lineStyle[attr.linestyle]) {
        actl.style.borderStyle = lineStyle[attr.linestyle];
      }
      actl.style.borderColor = attr.linecolor;
      if (attr.fillcolor) {
        actl.style.backgroundColor = attr.fillcolor;
      }
      if (attr.linethickness) {
        actl.style.borderWidth = attr.linethickness;
      } else {
        actl.style.borderWidth = 1;
      }
      return actl;
    }
  }
  root.rectangle = rectangle;
  class roundrectangle extends rectangle {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      actl.style.borderRadius = attr.cornerwidth;
      return actl;
    }
  }
  root.roundrectangle = roundrectangle;
  class oval extends rectangle {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      actl.style.borderRadius = "50%";
      return actl;
    }
  }
  root.oval = oval;
  class statictext extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      actl.type = "tpl";
      actl.tpl = "${" + this._id + "}";
      options.page.data[this._id] = attr.text;
      if (options.js && attr.events && attr.events["clicked"]) {
        const inst = this;
        actl.onEvent = {
          "click": {
            "actions": [
              {
                "actionType": "custom",
                "script": (e, props) => {
                  inst.triggerevent("clicked", e, props);
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
  class statichyperlink extends statictext {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      actl.style.color = "rgb(36,104,242)";
      return actl;
    }
  }
  root.statichyperlink = statichyperlink;
  class singlelineedit extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      if (attr.password) {
        actl.type = "input-password";
      } else {
        actl.type = "input-text";
      }
      actl.value = attr.text;
      actl.inputControlClassName = `${this._id}`;
      addPlaceholderProperty(this, actl, options);
      if (options.js && attr.events && attr.events["modified"]) {
        const inst = this;
        actl.onEvent = {
          "change": {
            "actions": [
              {
                "actionType": "custom",
                "script": (context, doaction, event, ev3) => {
                  inst.postevent("modified", event.data.value);
                }
              }
            ]
          }
        };
      }
      this.setfocus = () => {
        let control = this.raw();
        if (!control) return;
        let input = control.querySelector("input");
        if (input) {
          return input.focus();
        }
      };
      return actl;
    }
    selecttext(start, length) {
      let control = this.raw();
      if (!control) return;
      let input = control.querySelector("input");
      if (input) {
        return input.setSelectionRange(start - 1, start + length - 1);
      }
      return -1;
    }
    pbattributes() {
      let control = this.raw();
      if (!control) return;
      const attr = this._pbprops;
      control.style.height = `${attr.height}px`;
      control.style.paddingTop = "0px";
      control.style.paddingBottom = `0px`;
      if (!attr.events) return;
      let input = control.querySelector("input");
      if (input) {
        if (attr.events["pbm_keyup"]) {
          input.onkeyup = (e) => {
            const { key, flag } = toPBKeyFlag(e);
            this.triggerevent("pbm_keyup", key, flag, e);
          };
        }
        if (attr.events["pbm_keydown"]) {
          input.onkeydown = (e) => {
            const { key, flag } = toPBKeyFlag(e);
            this.triggerevent("pbm_keydown", key, flag, e);
          };
        }
      }
    }
    // set placeholder(value) {
    //   const attr = this._pbprops;
    //   attr.placeholder = value;
    //   this.setvalues('placeholder', value);
    // }
    // get placeholder() {
    //   const attr = this._pbprops;
    //   return attr.placeholder;
    // }
  }
  class multilineedit extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "textarea";
      actl.value = attr.text;
      addPlaceholderProperty(this, actl, options);
      if (options.js && attr.events && attr.events["modified"]) {
        const inst = this;
        actl.onEvent = {
          "change": {
            "actions": [
              {
                "actionType": "custom",
                "script": (context, doaction, event, ev3) => {
                  inst.postevent("modified", event.data.value);
                }
              }
            ]
          }
        };
      }
      return actl;
    }
    pbattributes() {
      super.pbattributes();
      let control = this.raw();
      if (!control) return;
      let input = control.querySelector("textarea");
      const attr = this._pbprops;
      if (input && attr) {
        input.style.maxHeight = `${attr.height}px`;
        input.style.minHeight = `${attr.height}px`;
        input.style.resize = "none";
        if (attr.events) {
          if (attr.events["pbm_keyup"]) {
            input.onkeyup = (e) => {
              const { key, flag } = toPBKeyFlag(e);
              this.triggerevent("pbm_keyup", key, flag, e);
            };
          }
          if (attr.events["pbm_keydown"]) {
            input.onkeydown = (e) => {
              const { key, flag } = toPBKeyFlag(e);
              this.triggerevent("pbm_keydown", key, flag, e);
            };
          }
        }
      }
    }
  }
  class editmask extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      let { maskdatatype, mask } = attr;
      mask = mask.replace(/yyyy-mm-dd/gi, "YYYY-MM-DD");
      mask = mask.replace(/yyyy-mm/gi, "YYYY-MM");
      mask = mask.replace(/yyyy\/mm\/dd/gi, "YYYY/MM/DD");
      mask = mask.replace(/yyyy\/mm/gi, "YYYY/MM");
      mask = mask.replace(/hh:mm:ss/gi, "HH:mm:ss");
      mask = mask.replace(/hh:mm/gi, "HH:mm");
      if (maskdatatype === "datemask!" || mask === "YYYY-MM-DD" || mask === "YYYY/MM/DD") {
        actl.type = "input-date";
        actl.format = mask ? mask : "YYYY-MM-DD";
        actl.displayFormat = mask;
        actl.valueFormat = "YYYY-MM-DD";
        actl.clearable = false;
      } else if (maskdatatype === "datetimemask!") {
        actl.type = "input-datetime";
        actl.format = mask ? mask : "YYYY-MM-DD HH:mm:ss";
        actl.displayFormat = mask;
        actl.valueFormat = "YYYY-MM-DD HH:mm:ss";
      } else if (maskdatatype === "timemask!") {
        actl.type = "input-time";
        actl.format = mask ? mask : "HH:mm:ss";
      } else if (maskdatatype === "stringmask!") {
        actl.type = "input-text";
      } else {
        actl.type = "input-number";
        actl.showSteps = attr.spin;
        if (actl.showSteps && attr.minmax) {
          const mm = attrToMinMax(attr.minmax);
          actl.min = mm[0];
          actl.max = mm[1];
          actl.step = attr.increment;
        }
      }
      actl.value = attr.text;
      addPlaceholderProperty(this, actl, options, true);
      if (mask) {
        actl.format = mask;
      }
      if (options.js && attr.events && attr.events["modified"]) {
        const inst = this;
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
    // 处理样式
    pbattributes() {
      let control = this.raw();
      if (!control) return;
      let dt = control.querySelector(".cxd-DatePicker");
      const attr = this._pbprops;
      if (dt) {
        dt.style.paddingLeft = "4px";
        dt.style.paddingRight = "4px";
        dt.style.height = attr.height + "px";
        dt.style.minWidth = "unset";
      }
      let toggler = control.querySelector(".cxd-DatePicker-toggler");
      if (toggler) {
        toggler.style.display = "none";
      }
      let tx = control.querySelector(".cxd-TextControl-input");
      if (tx) {
        tx.style.height = attr.height + "px";
        tx.style.paddingLeft = "4px";
        tx.style.paddingRight = "4px";
        tx.style.paddingTop = "0px";
        tx.style.paddingBottom = "0px";
        let input = tx.querySelector("input");
        if (input) {
          input.style.height = attr.height + "px";
        }
      }
    }
  }
  class datepicker extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "input-date";
      actl.displayFormat = "YYYY-MM-DD";
      if (attr.format === "dtftime!") {
        actl.type = "input-time";
        actl.displayFormat = "HH:mm:ss";
      } else if (attr.format === "dtflongdate!") {
        actl.type = "input-date";
        actl.displayFormat = "YYYY-MM-DD";
      } else if (attr.format === "dtfcustom!") {
        actl.type = "input-datetime";
        attr.customformat = attr.customformat.replace("yyyy", "YYYY");
        attr.customformat = attr.customformat.replace("dd", "DD");
        actl.displayFormat = attr.customformat;
      }
      actl.valueFormat = actl.displayFormat;
      if (attr.value) {
        actl.value = string(attr.value, actl.displayFormat);
      }
      if (attr.maxdate) {
        actl.maxDate = string(attr.maxdate, actl.displayFormat);
      }
      if (attr.mindate) {
        actl.minDate = string(attr.mindate, actl.displayFormat);
      }
      if (options.js && attr.events && attr.events["valuechanged"]) {
        const inst = this;
        actl.onEvent = {
          "change": {
            "actions": [
              {
                "actionType": "custom",
                "script": (ev, ev1, event, ev3) => {
                  inst.postevent("valuechanged", 0, event.data.value);
                }
              }
            ]
          }
        };
      }
      if (options.win) {
        const obj = this;
        Object.defineProperties(obj, {
          "value": {
            enumerable: true,
            configurable: true,
            set: (value) => {
              obj.text = value;
            },
            get: () => {
              return obj.text;
            }
          }
        });
      }
      return actl;
    }
    setvalue(value) {
      this.text = value;
    }
  }
  root.datepicker = datepicker;
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
      if (options.win) {
        const name = this._id;
        Object.defineProperties(this, {
          "text": {
            enumerable: true,
            configurable: true,
            set: (value) => {
              const control = this.raw();
              if (control) {
                let span = control.children[0];
                if (span) {
                  span.innerHTML = value;
                } else {
                  control.innerHTML = `<span>${value}</span>`;
                }
              }
            },
            get: () => {
              const control = this.raw();
              if (control) {
                let span = control.children[0];
                if (span) {
                  return span.innerHTML;
                } else {
                  return "";
                }
              }
            }
          }
        });
      }
      if (options.js && attr.events && attr.events["clicked"]) {
        const inst = this;
        actl.onClick = (e, props) => {
          inst.triggerevent("clicked", e, props);
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
      if (options.js && attr.events && attr.events["clicked"]) {
        const inst = this;
        actl.onEvent = {
          "change": {
            "actions": [
              {
                "actionType": "custom",
                "script": () => {
                  inst.postevent("clicked");
                }
              }
            ]
          }
        };
      }
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
      this.rvalue = attr.name;
      this._id = "radios";
      if (options.js && attr.events && attr.events["clicked"]) {
        const inst = this;
        actl.onEvent = {
          "change": {
            "actions": [
              {
                "actionType": "custom",
                "script": () => {
                  inst.postevent("clicked");
                }
              }
            ]
          }
        };
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
      actl.html = `<fieldset style="border: 1px solid #DCDFE6;position: relative;height:calc(100% - 2px)"><legend>${attr.text}</legend></fieldset>`;
      return actl;
    }
  }
  class dropdownlistbox extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      if (attr.textsize === 9) {
        attr.height = 22;
      } else {
        attr.height = (attr.textsize - 9) * 2 + 22;
      }
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "select";
      this.items = [];
      actl.source = `\${${this._id}_values.source}`;
      if (attr["item[]"]) {
        for (const o of attr["item[]"]) {
          this.items.push({ label: o, value: o });
        }
      }
      if (attr.placeholder) {
        actl.placeholder = attr.placeholder;
      }
      options.page.data[`${this._id}_values`] = {
        source: this.items
      };
      if (options.js && attr.events && attr.events["selectionchanged"]) {
        const inst = this;
        actl.onEvent = {
          "change": {
            "actions": [
              {
                "actionType": "custom",
                "script": () => {
                  inst.postevent("selectionchanged");
                }
              }
            ]
          }
        };
      }
      return actl;
    }
    pbattributes() {
      let control = this.raw();
      if (!control) return;
      let dt = control.querySelector(".cxd-Select");
      const attr = this._pbprops;
      if (dt) {
        dt.style.paddingLeft = "4px";
        dt.style.paddingRight = "4px";
        dt.style.paddingTop = "1px";
        dt.style.paddingBottom = "1px";
        dt.style.height = `${attr.height}px`;
        dt.style.minHeight = "auto";
      }
    }
    selectitem(index) {
      this.text = this.items[index - 1].label;
      this.postevent("selectionchanged");
    }
    reset() {
      this.items.length = 0;
      this.setvalues("source", [...this.items]);
    }
    additem(item) {
      this.items.push({ label: item, value: item });
      this.setvalues("source", [...this.items]);
    }
    deleteitem(index) {
      this.items.splice(index - 1, 1);
      this.setvalues("source", [...this.items]);
    }
    totalitems() {
      return this.items.length;
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
    setpicture(bimage) {
      const arrayBuffer = bimage.buffer;
      const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);
      this.img = this.raw().querySelector("img");
      this.img.src = imageUrl;
    }
    loadpicture(image) {
      if (typeof image === "string") {
        this.img = this.raw().querySelector("img");
        this.img.src = image;
      } else {
        this.setpicture(image);
      }
    }
  }
  class inkpicture extends picture {
  }
  root.inkpicture = picture;
  class icon extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      actl.type = "icon";
      actl.icon = attr.icon;
      actl.style.textAlign = "center";
      actl.style.alignContent = "center";
      return actl;
    }
  }
  root.icon = icon;
  function addDWProperties(dwCls) {
    const p = dwCls.prototype;
    p.accepttext = function() {
      return 1;
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
    p.getchilddw = async function() {
      return await this._dw.getChildDW();
    };
    p.rowcount = function() {
      return this._dw.rowCount();
    };
    p.setitem = function(row, column, value) {
      return this._dw.setItem(...arguments);
    };
    p.getitem = function(row, column = null) {
      return this._dw.getItem(...arguments);
    };
    p.getitemstring = function(row, column = null) {
      return this._dw.getItem(...arguments);
    };
    p.getitemnumber = function(row, column = null) {
      return this._dw.getItem(...arguments);
    };
    p.getitemdatetime = function(row, column = null) {
      return this._dw.getItem(...arguments);
    };
    p.setitemstatus = function(row, column, dwbuffer, status) {
      return this._dw.setItemsSatus(...arguments);
    };
    p.getitemstatus = function(row, column, dwbuffer) {
      const status = this._dw.getItemStatus(...arguments);
      if (status === 1) {
        return "DataModified!";
      } else if (status === 2) {
        return "New!";
      } else if (status === 3) {
        return "NewModified!";
      } else {
        return "NotModified!";
      }
    };
    p.insertrow = function(row) {
      return this._dw.insertRow(...arguments);
    };
    p.deleterow = function(row) {
      return this._dw.deleteRow(...arguments);
    };
    p.retrieve = async function(...args) {
      return await this._dw.retrieve(...arguments);
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
    p.setcolumn = function(name) {
      return this._dw.setColumn(name);
    };
    p.getcolumnname = function(name) {
      return this._dw.getColumnName();
    };
    p.getcolumn = function(name) {
      return this._dw.getColumn();
    };
    p.setrow = function(row) {
      return this._dw.setRow(...arguments);
    };
    p.scrolltorow = function(row) {
      return this._dw.scrollToRow(...arguments);
    };
    p.scrollpriorrow = function(row) {
      return this._dw.scrollPriorRow(row);
    };
    p.scrollnextrow = function(row) {
      return this._dw.scrollNextRow(row);
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
      return this._dw.shareData(dwsecondary._dw);
    };
    p.sharedataoff = function() {
      return this._dw.shareDataOff(...arguments);
    };
    p.rowsmove = function(startrow, endrow, movebuffer, targetdw, beforerow, targetbuffer) {
      return this._dw.rowsMove(startrow, endrow, movebuffer, targetdw._dw, beforerow, targetbuffer);
    };
    p.rowscopy = function(startrow, endrow, copybuffer, targetdw, beforerow, targetbuffer) {
      return this._dw.rowsCopy(startrow, endrow, copybuffer, targetdw._dw, beforerow, targetbuffer);
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
    p.setredraw = function() {
      return this._dw.setRedraw(...arguments);
    };
    p.modify = function() {
      return this._dw.modify(...arguments);
    };
    p.describe = function() {
      return this._dw.describe(...arguments);
    };
    p.setoption = function() {
      return this._dw.setOption(...arguments);
    };
    p.setfocus = function() {
      return this._dw.setFocus(...arguments);
    };
    p.setdataobject = async function(value) {
      return await this._dw.setDataObject(value);
    };
    p.create = function() {
      if (arguments.length > 0) {
        return this._dw.create(...arguments);
      }
    };
    p.print = function() {
      return this._dw.print(...arguments);
    };
  }
  class datastore extends powerobject {
    constructor(ds) {
      super({});
      if (ds instanceof DataStore) {
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
    get object() {
      return this._dw.object;
    }
  }
  addDWProperties(datastore);
  class datawindow extends windowobject {
    toUI(options) {
      let actl = super.toUI(options, false);
      const attr = this._pbprops;
      delete actl.tpl;
      actl.type = "datawindow";
      actl.dataObjectURI = attr.dataobject;
      if (attr.hscrollbar === false) {
        if (!actl.option) actl.option = {};
        Object.assign(actl.option, { showHScrollBar: false });
      }
      if (attr.vscrollbar === false) {
        if (!actl.option) actl.option = {};
        Object.assign(actl.option, { showVScrollBar: false });
      }
      if (attr.border === false || attr.border === "false") {
        actl.border = false;
      }
      if (options.js && attr.events) {
        const dwEvent = {
          "clicked": "onClicked",
          "itemchanged": "onItemChanged",
          "itemfocuschanged": "onItemFocusChanged",
          "rowfocuschanged": "onRowFocusChanged",
          "buttonclicked": "onButtonClicked",
          "dropdownselected": "onDropDownSelected",
          "doubleclicked": "onDoubleClicked",
          "toolbarchanged": "onToolbarChanged",
          "editchanged": "onEditChanged",
          "losefocus": "onLoseFocus",
          "rightbuttonclicked": "onRightButtonClicked"
        };
        const dwPBEvent = { "pbm_dwnprocessenter": "onEnter", "pbm_dwnkey": "onKeyDown" };
        for (const key in attr.events) {
          const evName = dwEvent[key];
          if (evName) {
            const inst = this;
            actl[evName] = (...args) => {
              const avs = args.slice(1);
              avs.push(args[0]);
              inst.triggerevent(key, ...avs);
            };
          } else {
            const evPBName = dwPBEvent[key];
            if (evPBName) {
              const inst = this;
              actl[evPBName] = (...args) => {
                const avs = args.slice(1);
                avs.push(args[0]);
                const func = attr.events[key];
                if (func) {
                  inst.triggerevent(func, ...avs);
                } else {
                  inst.triggerevent(key, ...avs);
                }
              };
            }
          }
        }
      }
      if (options.win) {
        this._win = options.win;
        this._dataobject = attr.dataobject;
        addPositionProperty(this, () => {
          return this._dw._.targetEl;
        }, true);
      }
      return actl;
    }
    get _dw() {
      return this._win._page[this._id];
    }
    get dataobject() {
      return this._dataobject;
    }
    set dataobject(value) {
      this._dataobject = value;
      this._dw.setDataObject(value);
    }
    get object() {
      return this._dw.object;
    }
    get hscrollbar() {
      return this._dw.hScrollBar;
    }
    set hscrollbar(value) {
      this._dw.hScrollBar = value;
    }
    get vscrollbar() {
      return this._dw.vScrollBar;
    }
    set vscrollbar(value) {
      this._dw.vScrollBar = value;
    }
    get border() {
      return this._dw.border;
    }
    set border(value) {
      this._dw.border = value;
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
  class timing extends nonvisualobject {
    start(interval) {
      this.stop();
      this._timer = setTimeout(() => {
        this.postevent("timer");
      }, interval * 1e3);
    }
    stop() {
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timer = void 0;
    }
  }
  root.timing = timing;
  class nav extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "nav";
      actl.stacked = false;
      options.page.data[this._id] = {
        "source": attr.links
      };
      actl.source = `\${${this._id}_values.source}`;
      if (options.js && attr.events && attr.events["clicked"]) {
        const inst = this;
        actl.onEvent = {
          "click": {
            "actions": [
              {
                "actionType": "custom",
                "script": (ev, ev1, event, ev3) => {
                  inst.triggerevent("clicked", event.data.item);
                }
              }
            ]
          }
        };
      }
      return actl;
    }
    setlink(data) {
      this.setvalues("source", data);
    }
  }
  class treeview extends windowobject {
    toUI(options) {
      const attr = this._pbprops;
      let actl = super.toUI(options);
      delete actl.tpl;
      actl.type = "input-tree";
      actl.style.display = "flex";
      actl.heightAuto = true;
      actl.virtualThreshold = 5e4;
      options.page.data[this._id] = {
        "source": attr.source
      };
      this.itemValues = [];
      this.itemSource = [];
      actl.source = `\${${this._id}_values.source}`;
      if (options.js && attr.events && (attr.events["doubleclicked"] || attr.events["clicked"])) {
        const inst = this;
        actl.onEvent = {
          "change": {
            "actions": [
              {
                "actionType": "custom",
                "script": (ev, ev1, event, ev3) => {
                  const value = event.data.value;
                  if (attr.events["doubleclicked"]) {
                    if (!inst._eventData) {
                      inst._eventData = { last: Date.now(), value };
                    } else if (inst._eventData.value === value) {
                      if (Date.now() - inst._eventData.last < 300) {
                        inst.triggerevent("doubleclicked", value, event.data);
                        inst._eventData.last = 0;
                      } else {
                        inst._eventData.last = Date.now();
                      }
                    } else {
                      inst._eventData = { last: Date.now(), value };
                    }
                  }
                  if (attr.events["clicked"]) {
                    inst.triggerevent("clicked", value, event.data);
                  }
                }
              }
            ]
          }
        };
      }
      return actl;
    }
    pbattributes() {
      let control = this.raw();
      if (!control) return;
      let dt = control.querySelector(".cxd-TreeControl");
      const attr = this._pbprops;
      if (dt) {
        dt.style.padding = "0px";
        dt.style.paddingRight = "0px";
        dt.style.width = "100%";
        dt.style.height = "100%";
        dt.style.overflow = "auto";
      }
      let tree = control.querySelector(".cxd-Tree");
      if (tree) {
        tree.style.height = "100%";
        tree.style.maxHeight = "unset";
      }
      let box = control.querySelector(".cxd-Form-item-controlBox");
      if (box) {
        box.style.width = "100%";
      }
    }
    set source(data) {
      this.setvalues("source", data);
    }
    get source() {
      return this.getvalues("source");
    }
    getitem(handle, item) {
      if (handle > 0 && handle <= this.itemValues.length) {
        let obj = this.itemValues[handle - 1];
        Object.assign(item, obj);
        return obj;
      }
      return -1;
    }
    insertitemlast(handle, item) {
      if (typeof handle === "number") {
        item = JSON.parse(JSON.stringify(item));
        if (handle === 0) {
          this.itemSource.push(item);
          this.itemValues.push(item);
          const index = this.itemValues.length;
          item.value = index;
          item.level = 1;
          this.setvalues("source", this.itemSource);
          return index;
        } else {
          let prev = this.itemValues[handle - 1];
          if (Array.isArray(prev.children)) {
            prev.children.push(item);
          } else {
            prev.children = [item];
          }
          item.level = prev.level + 1;
          this.itemValues.push(item);
          const index = this.itemValues.length;
          item.value = index;
          this.setvalues("source", this.itemSource);
          return index;
        }
      }
    }
    expandall(itemhandle) {
    }
  }
  root.powerobject = powerobject;
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
  root.treeview = treeview;
  root.nav = nav;
})(typeof window !== "undefined" ? window : null);
