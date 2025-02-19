
//查找子数据窗口
if (!window.dwGetDataObject) {
  window.dwGetDataObject =  async (key) => {
    let ret = await axios.get(`/h5dw/dataobject/` + key);
    if (ret.status === 200) {
      const { data } = ret;
      if (data.status === 0) {
        return data.data.dataobject;
      }
    }
    return null;
  }
}

if (!window.dwSyntaxFromSQL) {
  window.dwSyntaxFromSQL =  async (sql) => {
    let ret = await axios.post('/h5dw/syntax', { sql } );
    if (ret.status === 200) {
      return ret.data.dataobject;
    }
    throw 'syntaxFromSQL error ' + ret.status;
  }
}

if (!window.getQueryString) {
  window.getQueryString = function(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = window.location.href.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
}

(function() {
  if (window._pbdefine) { return; }

  window._pbdefine = true;

  function addPositionProperty(obj, dom) {
    function getDom() {
      if (typeof dom === 'function') {
        return dom();
      } else {
        return dom;
      }
    }
    Object.defineProperties(obj, {
      "x": {
        enumerable: true,
        configurable: true,
        set:(value)=> {
          getDom().style['left'] = value + 'px';
        },
        get:() => {
          return getDom().offsetLeft;
        }
      },
      "y": {
        enumerable: true,
        configurable: true,
        set:(value)=> {
          getDom().style['top'] = value + 'px';
        },
        get:() => {
          return getDom().offsetTop;
        }
      },
      "width": {
        enumerable: true,
        configurable: true,
        set:(value)=> {
          getDom().style['width'] = value + 'px';
        },
        get:() => {
          return getDom().offsetWidth;
        }
      },
      "height": {
        enumerable: true,
        configurable: true,
        set:(value)=> {
          getDom().style['height'] = value + 'px';
        },
        get:() => {
          return getDom().offsetHeight;
        }
      },
    });

    obj.resize = function(width, height) {
      this.width = width;
      this.height = height;
    }
  }

  class PBControl {
    constructor(page, name) {
      this.page = page;
      this._name = name;
      let control = null;
      PB.util.addPositionProperty(this, () => {
        if (control) {
          return control;
        }
        control = page.root.querySelector(`.${name}`);
        return control;
      });
    }

    // _getProps() {
    //   // 得到props
    //   // if (!this.page.props) {
    //     let ctls = this.page.amisScoped.getComponents();
    //     const props = ctls[0].props;
    //   // }
    //   return props;
    // }

    get text() {
      const data = this.page.getProps().data;
      return data[this._name];
    }

    set text(value) {

      const props = this.page.getProps();
      props.store.changeValue(this._name, value);

    }

    get checked() {
      return this.text;
    }

    set checked(value) {
      this.text = !!value;
    }
  }

  class PBRadioButton extends PBControl {
    constructor(page, control) {
      const { name, options, id } = control;
      super(page, id);
      this._name = name;
      this.rvalue = options[0].value;
    }

    get checked() {
      return this.text === this.rvalue;
    }

    set checked(value) {
      if (value) {
        this.text = this.rvalue;
      } else {
        this.text = undefined;
      }

    }
  }

  class AmisPage {

    constructor( root, options, dialog) {
      this.root = root;
      this.dialog = dialog;
      this.options = options;
    }

    _init(ui) {
      this.ui = ui;
      // if (!ui.data) { ui.data = {};}
      const page = this;
      // if (!ui.data.page) {
      //   ui.data.page = ()=> {return page;}
      // }
      const amis = amisRequire('amis/embed');
      const config = window.baseConfig || parent.baseConfig;
      this.amisLib = amisRequire('amis');
      this.amisScoped = amis.embed(this.root, this.ui, {data:{apiurl:config.api, page:() => {return page;}}});
    }

    _createControl(parent, controls) {
      //const controls = this.ui.body.body;
      if (!controls) return;
      for (const control of controls) {
        const { type, name, id } = control;
        if (!name || name === '') continue;
        if (type === 'tabs') {
          const p = parent[name] = new PB.PBControl(this, name);
          for (const tab of control.tabs) {
            const tabinfo = tab.tab;
            const tabPage = new PB.PBControl(this, tabinfo.name);
            p[tabinfo.name] = tabPage;
            this._createControl(tabPage, tabinfo.body);
          }
        } else if (type === 'radios' ){
          parent[id] = new PBRadioButton(this, control);
        } else if (type === 'datawindow' ){
          // 可能还没有初始化，所以进行设置
          const p = this;
          Object.defineProperty(parent, name, {
            enumerable:true,
            get() {
              return p[name];
            }
          });
        } else {
          parent[name] = new PB.PBControl(this, name);
        }

        if (!parent.controls) { parent.controls = [];}
        parent.controls.push(parent[name] );
      }
    }

    getProps() {
      // 得到props
      let ctls = this.amisScoped.getComponents();
      const props = ctls[0].props;
      return props;
    }

    onInit() {
      this._createControl(this, this.ui.body.body);
      this.onLoad();
    }

    onLoad() {
    }

    onResize(sizetype, newwidth, newheight) {
    }

    onClose() {
    }
  }

  if (!window.PB) {
    window.PB = {};
  }

  function messageBox(title, text, icon, button = 'OK!') {

    const amis = amisRequire('amis');
    return new Promise(resolve => {

      if (button === 'OK!') {
        amis.alert(text, title);
        resolve(1);
      } else if (button === 'YesNo!') {
        const p = amis.confirm( text, title, {confirmBtnLevel:'primary', confirmText:'是', cancelText:'否'});
        p.then((rtn) => {resolve(rtn ? 1 : 0)});
      } else {
        const p = amis.confirm( text, title, {confirmBtnLevel:'primary'});
        p.then((rtn) => {resolve(rtn ? 1 : 0)});
      }
    });
  }

  function trim(str) {
    return str.trim();
  }

  function leftTrim(str) {
    return str.trimStart();
  }

  function rightTrim(str) {
    return str.trimEnd();
  }

  function left(str, n) {

  }

  // 将PB本身的函数添加到这里
  Object.assign(window.PB, {
    util: {
      addPositionProperty,
    },
    PBControl,
    AmisPage,
    messageBox,
    trim,
    leftTrim,
    rightTrim
  });

})();

(function () {

  if (window._pbdwdefine) { return; }
  window._pbdwdefine = true;

  const config = window.baseConfig || parent.baseConfig;
  if (config) {
    axios.defaults.baseURL = config.api;
  }
  
  let db = {
    sqls:[],
    async retrieveDW(sql,...arg) {
      // amisScoped.updateProps({data:{showLoading:true}});
      //数据窗口retrieve时会调用，在客户端实际与服务器对接
      let ret = await  axios.post('/h5dw/retrieve',{key:sql,args:arg});
      // amisScoped.updateProps({data:{showLoading:false}});
      if (ret.status === 200) {
        return ret.data.data;
      }
      throw `retrieve error ${ret.status}`;
    },
    async updateDW(key, data) {
      // console.log('update',key,data);
      // amisScoped.updateProps({data:{showLoading:true}});
      let ret = await  axios.post('/h5dw/update',{key:key, data});
      // amisScoped.updateProps({data:{showLoading:false}});
      if (ret.status === 200) {
        return ret.data.status === 0  ? 1 : -1;
      } else {
        return -1;
      }
    },
    async syntaxFromSQL(sql) {
      let ret = await  axios.post('/h5dw/syntax',{sql});
      if (ret.status === 200) {
        return ret.data.data;
      }
      throw `syntaxFromSQL error ${ret.status}`;
    },
    execute(sql) {
    },
    reset() {
      this.sqls = [];
    },
    async embedsql(key, parameter) {
      let ret = await axios.post('/embedsql')
    }
  };

	// window.sqlca = db;
	
  let index = 0;
  // window.enableAMISDebug = true;
  let amisLib = amisRequire('amis');
  let React = amisRequire('react');

  function evalValue(js, data) {
    if (
      typeof js === 'string' &&
      js.substring(0, 2) === '${' &&
      js[js.length - 1] === '}'
    ) {
      return amisLib.evalJS(js, data);
    }
    return js;
  }

  function getStyle(style) {
    let styleInfo = '';
    for (const key in style) {
      const value = style[key];
      if (key === 'width' || key === 'height' || key === 'top' || key === 'left') {
        if (typeof value !== 'string') {
          styleInfo += `${key}:${style[key]}px;`
        } else {
          styleInfo += `${key}:${style[key]};`
        }
      } else {
        styleInfo += `${key}:${style[key]};`
      }
    }
    return styleInfo;
  }

  function getPage(props) {
    let page = props.$schema.page;
    if (!page) {
      page = props.data.page;
    }
    if (typeof page === 'function') {
      page = page();
    }
    return page;
  }

  if (!amisLib.registerDW) {
    amisLib.registerDW = true;
    // 自定义组件，props 中可以拿到配置中的所有参数，比如 props.label 是 'Name'
    function AmisDataWindow(props) {
      let dom = React.useRef(null);
      React.useEffect(function () {
        // dom.current.style['position'] = 'relative';
        // dom.current.style['overflow'] = 'hidden';
        // dom.current.style['border'] = '1.5px solid #e9e9e9';
        // dom.current.style['width'] = '100%';
        // dom.current.style['height'] = '50px';

        dom.current.style = "position:relative;overflow:hidden;border:1.5px solid #e9e9e9;width:100%;height:50px"

        if (props.$schema.border === 'false' || props.$schema.border === false) {
          dom.current.style['border'] = 'none';
        }
        
        let name = props.$schema.name;
        if (!name) {
          name = `dw${++index}`;
        }
        dom.current.key = name;
        dom.current.className = name;
        if (!dom.current.dw) {
          props.name = name;
          const dw = new DataWindow(dom.current);
          dom.current.dw = dw;
          let page = getPage(props);
          if (page) {
            page[name] = dw;
            PB.util.addPositionProperty(dw, dom.current);
          }

          const dwEvent = ['Clicked','ItemChanged','ItemFocusChanged',
            'RowFocusChanged','ButtonClicked', 'DropDownSelected', 'DoubleClicked',
            'ToolbarChanged','RightButtonClicked', 'EditChanged', 'Enter', 'KeyDown', 'LoseFocus'];
          for (let i = 0; i < dwEvent.length; ++i) {
            const onEvent = 'on' + dwEvent[i];
            if (props.$schema[onEvent]) {
              dw.on(dwEvent[i],props.$schema[onEvent]);
            }
          }
        }

        // if (!dwMain) {
        //   dwMain = new DataWindow(dom.current);
        //   // setTimeout(()=>{
        //   //   props.store.updateData({saving: true});
        //   // },5000);
        // }
      },[]);


      React.useEffect(function () {
        const {style} = props.$schema;
        for (const key in style) {
          const value = style[key];
          if (key === 'width' || key === 'height' || key === 'top' || key === 'left') {
            if (typeof value !== 'string') {
              dom.current.style[key]  = `${value}px`;
            } else {
              dom.current.style[key] = value;
            }
          } else {
            dom.current.style[key] = value;
          }

        }
        // dom.current.style = getStyle(style);
      },[props.$schema.style.width,props.$schema.style.height,props.$schema.style.top,props.$schema.style.left]);

      React.useEffect(function () {
        const {border} = props.$schema;
        if (border === 'false' || border === false) {
          dom.current.dw.border = false;
        } else {
          dom.current.dw.border = true;
        }
      },[props.$schema.border]);

      React.useEffect(function () {
        if (props.$schema.dataobject) {
          const dataobject = evalValue(props.$schema.dataobject, props.data);
          if (dataobject) {
            // const name = dom.current.key;
            const dw = dom.current.dw;
            dw.dataObject = dataobject;
            dw.setTransObject(db);
          }
        }
      },[props.data.dataobject]);

      React.useEffect(function () {
        if (props.$schema.dataObjectURI) {
          const key = evalValue(props.$schema.dataObjectURI, props.data);
          // console.log('dataObjectURI get:' + key, props.$schema.dataObjectURI);
          let page = getPage(props);
          
          //
          // props.data.showLoading = true;

          const p = new Promise(async (reslove, reject) => {
            if (page && page.amisScoped) {
              page.amisScoped.updateProps({data:{showLoading:true}});
             }
            const dataobject = await dwGetDataObject(key);
            //props.data.showLoading = false;
            if (page && page.amisScoped) {
              page.amisScoped.updateProps({data:{showLoading:false}});
            }
            if (dataobject) {
              // const name = dom.current.key;
              const dw = dom.current.dw;
              
              await dw.setDataObject(dataobject);
              dw.setTransObject(db);
              
  
              if (props.$schema.onLoad) {
                setTimeout(()=> {
                  props.$schema.onLoad(dw);
                },0)
              }
            }
            reslove(1);
          });
          
          if (page) {
            if (!page.loadDW) {
              page.loadDW = [p];
            } else {
              page.loadDW.push(p);
            }
          }
        }

      },[props.$schema.dataObjectURI]);

      React.useEffect(function () {
        if (props.$schema.option) {
          const option = Object.assign({}, props.$schema.option);
          const name = dom.current.key;
          const dw = dom.current.dw;
          if (option.currentRowSelected !== undefined) {
            option.currentRowSelected = evalValue(option.currentRowSelected, props.data);
          }
          if (option.mode !== undefined) {
            option.mode = evalValue(option.mode, props.data);
          }
          // console.log("changexxxxxxxxxxxxxxxxxx",option);
          dw.setOption(option);
        }
      },[props.$schema.option, props.data.currentRowSelected, props.data.mode]);

      return React.createElement('div', {
        ref: dom
      });
    }

    //注册自定义组件，请参考后续对工作原理的介绍
    amisLib.Renderer({
      test: /(^|\/)datawindow/
    })(AmisDataWindow);

    function MyInput(props) {
      let dom = React.useRef(null);

      // const {style} = props.$schema;
      // React.useEffect(function () {
      //   dom.current.style = getStyle(style);
      // },[props.$schema.style]);

      // const { render } = props;
      // return render('input-text',props);
      return React.createElement(amisLib.Button, {
        ref: dom,
        ...props.$schema,
      });
    }

    amisLib.Renderer({
      test: /(^|\/)my-input/
    })(MyInput);

    // 新的组件group-box
    function GroupBox(props) {
      let dom = React.useRef(null);
      const { render, body, disabled } = props;

      React.useEffect(function () {
        const {style} = props.$schema;
        dom.current.style = getStyle(style);
      },[props.$schema.style]);

      return React.createElement('div', {
        ref: dom
      }, render('body', body, {disabled}));
    }

    amisLib.Renderer({
      test: /(^|\/)group-box/
    })(GroupBox);

    // 新的组件group-box
    function LoadDetector(props) {
      let dom = React.useRef(null);

      React.useEffect(function () {
        dom.current.style = "position:absolute;width:0px;height:0px;diaplay:none;"
        let page = getPage(props);
        if (page) {
          if (typeof page.onInit === 'function') {
            try {
              setTimeout(()=> {
                page.onInit();
              }, 5);

            } catch (e) {
              console.error(e);
            }
          }

          // if (H5UI && H5UI.ElementResizeDetectorMaker) {
          //     const erd = new H5UI.ElementResizeDetectorMaker();
          //     const targetEl = page.root;
          //     erd.listenTo(page.root, (evt) => {
          //       if (erd.rt) { clearTimeout(this.rt); }
          //       if (erd.lastHeight !== targetEl.clientHeight ||
          //         erd.lastWidth !== targetEl.clientWidth || (new Date() - erd.lastTime > 1000)) {
          //         // console.log(this.key, this.lastHeight, targetEl.clientHeight, this.lastWidth, targetEl.clientWidth);
          //         erd.rt = setTimeout(() => {
          //           //this.reload();
          //           if (typeof page.onResize === 'function') {
          //             try {
          //               page.onResize(0, targetEl.clientWidth, targetEl.clientHeight);
          //             } catch (e) {
          //               console.error(e);
          //             }
          //           }

          //           erd.lastHeight = targetEl.clientHeight;
          //           erd.lastWidth = targetEl.clientWidth;
          //           erd.lastTime = new Date();
          //           delete erd.rt;
          //         }, 10);
          //       }
          //     });
          // }

          const targetEl = page.root;
          let erd = new ResizeObserver(() => {
            if (erd.rt) { clearTimeout(this.rt); }
            if (erd.lastHeight !== targetEl.clientHeight ||
              erd.lastWidth !== targetEl.clientWidth || (new Date() - erd.lastTime > 1000)) {
              // console.log(this.key, this.lastHeight, targetEl.clientHeight, this.lastWidth, targetEl.clientWidth);
              erd.rt = setTimeout(() => {
                //this.reload();
                if (typeof page.onResize === 'function') {
                  try {
                    page.onResize(0, targetEl.clientWidth, targetEl.clientHeight);
                  } catch (e) {
                    console.error(e);
                  }
                }

                erd.lastHeight = targetEl.clientHeight;
                erd.lastWidth = targetEl.clientWidth;
                erd.lastTime = new Date();
                delete erd.rt;
              }, 10);
            }
          });
          erd.observe(targetEl);
        }
      },[]);

      return React.createElement('div', {
        ref: dom
      });
    }

    amisLib.Renderer({
      test: /(^|\/)loaddetector/
    })(LoadDetector);

  }
})();
