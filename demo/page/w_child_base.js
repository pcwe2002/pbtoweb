
(function(root) {
    root = root || global
    
class w_child_base extends pbwindow {

  ieon_resize;

  constructor(options) {
    let props = {
      "name": "w_child_base",
      "width": 703,
      "height": 438,
      "border": "false",
      "backcolor": "#F0F0F0",
      "icon": "AppIcon!",
      "center": "true"
    };
    Object.assign(props, options);
    super(props);
  }
    // Events

  ue_setflag() {//====================================================================
    // 
    //   event name : ue_setflag
    //
    //   Description:
    //				   "1111" :"X","Y","Width","Height"
    //                   X/Y:0 - Keeps unchanged; 1 - Changes proportionally; 2 - Moves to right horizontally.
    //                   width: 0 - Keeps unchanged; 1 - Changes proportionally; 2 - Extends to right horizontally; 
    //                             3 - Extends to left horizontally; 4 - Extends to right edge; 5 - Extends to left edge.
    //                  Height: 0 - Keeps unchanged; 1 - Changes proportionally; 2 - Extends down vertically; 
    //					         3 - Extends up vertically; 4 - Extends to the bottom; 5 - Extends to the top.
    //
    //   Argument：(None)
    //				   
    //
    //   Return ：  (None)
    //
    //   Modify Date：2018-01-30
    //====================================================================
  }


  create() {}


  destroy() {}


  activate() {
    parentwindow().ue_refresh_visible(``);
  }


  onResize(sizetype, newwidth, newheight) {
    //
    if (!isvalid(this.ieon_resize)) {
      return;
    } //
    this.ieon_resize.of_resize(this, newwidth, newheight, true);
  }


  onOpen() {
    this.ieon_resize = create(eon_appeon_resize);
    this.ieon_resize.of_init(this, true);
    this.ieon_resize.of_fontresize(true, 3);
    this.ieon_resize.of_zoom(true, 3);
    this.ue_setflag();
  }


  onClose() {
    //
    parentwindow().ue_close_window(this.tag);
    destroy(this.ieon_resize);
    this.ieon_resize = null;
  }
}

root.w_child_base = w_child_base;
})(typeof window !== "undefined" ? window : null);
