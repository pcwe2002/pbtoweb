
(function(root) {
    root = root || global
    
class w_base extends pbwindow {

  inv_resize;

  constructor(options) {
    let props = {
      "name": "w_base",
      "width": 796,
      "height": 392,
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


  of_set_resize(ab_switch) {
    if (ab_switch) {
      if (!isvalid(this.inv_resize)) {
        this.inv_resize = create(n_resize_service);
      }
      this.inv_resize.of_setorigsize(this.width, this.height);
    } else {
      if (isvalid(this.inv_resize)) {
        destroy(this.inv_resize);
        this.inv_resize = null;
      }
    }
  }
    // Events

  create() {}


  destroy() {}


  onClose() {
    if (isvalid(this.inv_resize)) {
      destroy(this.inv_resize);
      this.inv_resize = null;
    }
  }


  onResize(sizetype, newwidth, newheight) {
    if (isvalid(this.inv_resize)) {
      this.inv_resize.pfc_resize(sizetype, newwidth, newheight);
    }
  }


  onOpen() {//////////////////////////////////////////////////////////////////////////////
    //
    //	Base ancestor window 
    //
    //	Description:
    //	Ancestor window (barebones with only code for use with the windows resize service, can be extended)
    //  Note: for use with my n_resize_service
    //
    //////////////////////////////////////////////////////////////////////////////
    //	
    //	Revision History
    //  =============
    //  Kevin Ridley - Aomega Solutions LLC
    //
    //////////////////////////////////////////////////////////////////////////////
  }
}

root.w_base = w_base;
})(typeof window !== "undefined" ? window : null);
