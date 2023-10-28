
(function(root) {
    root = root || global
    
class n_resize_service extends nonvisualobject {

  // Predefined resize constants.
  fixedright = `FixedToRight`;
  fixedbottom = `FixedToBottom`;
  fixedrightbottom = `FixedToRight&Bottom`;
  scale = `Scale`;
  scaleright = `ScaleToRight`;
  scalebottom = `ScaleToBottom`;
  scalerightbottom = `ScaleToRight&Bottom`;
  fixedright_scalebottom = `FixedToRight&ScaleToBottom`;
  fixedbottom_scaleright = `FixedToBottom&ScaleToRight`; // The following five resize constants added in v12.5
  fixedcenter = `FixedToCenter`;
  fixedcentertop = `FixedToCenterTop`;
  fixedcenterbottom = `FixedToCenterBottom`;
  fixedcenterleft = `FixedToCenterLeft`;
  fixedcenterright = `FixedToCenterRight`;
  dragobject = `dragobject!`;
  line = `line!`;
  oval = `oval!`;
  rectangle = `rectangle!`;
  roundrectangle = `roundrectangle!`;
  mdiclient = `mdiclient!`;
  ics_dragobject = `dragobject!`;
  ics_line = `line!`;
  ics_oval = `oval!`;
  ics_rectangle = `rectangle!`;
  ics_roundrectangle = `roundrectangle!`;
  ics_mdiclient = `mdiclient!`;
  il_parentminimumwidth = 0;
  il_parentminimumheight = 0;
  il_parentprevwidth = -1;
  il_parentprevheight = -1;
  ii_rounding = 5;
  inv_registered;

  constructor(options) {
    let props = {
      "name": "n_resize_service"
    };
    Object.assign(props, options);
    super(props);
  }

  of_register() {
      const func = {"2":[{"name":"of_register_2_WS","sign":"WS"}],"5":[{"name":"of_register_5_WIIII","sign":"WIIII"}],"6":[{"name":"of_register_6_WBIIII","sign":"WBIIII"}]}; 
      const name = findfunctionbyargs(func, arguments); 
      return this[name].apply(this, arguments)
    }


  of_unregister(awo_control) {
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Function:  		of_UnRegister	
    //
    //	Access:  		public
    //
    //	Arguments:		
    //	awo_control		The control to unregister.
    //
    //	Returns:  		integer
    //						1 if it succeeds and -1 if an error occurs.
    //
    //	Description:  	Unregister a control that was previously registered.
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Revision History
    //
    //	Version
    //	5.0   Initial version
    // 6.0	Changed to support for weighted movement and sizing of controls.
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    /*
     * Open Source PowerBuilder Foundation Class Libraries
     *
     * Copyright (c) 2004-2005, All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted in accordance with the GNU Lesser General
     * Public License Version 2.1, February 1999
     *
     * http://www.gnu.org/copyleft/lesser.html
     *
     * ====================================================================
     *
     * This software consists of voluntary contributions made by many
     * individuals and was originally based on software copyright (c) 
     * 1996-2004 Sybase, Inc. http://www.sybase.com.  For more
     * information on the Open Source PowerBuilder Foundation Class
     * Libraries see http://pfc.codexchange.sybase.com
    */
    //
    //////////////////////////////////////////////////////////////////////////////
    let li_upperbound;
    let li_cnt;
    let li_registered_slot; //Check parameters
    if (isnull(awo_control) || !isvalid(awo_control)) {
      return -1;
    } //Confirm that the user object has already been initialized
    if (this.il_parentprevheight === -1 && this.il_parentprevwidth === -1) {
      return -1;
    } //Get the current UpperBound
    li_upperbound = upperbound(this.inv_registered); //Find the registered object
    li_registered_slot = 0;
    for (li_cnt = 1; li_cnt <= li_upperbound; li_cnt += 1) {
      if (this.inv_registered[li_cnt - 1].wo_control === awo_control) {
        li_registered_slot = li_cnt;
        break;
      }
    } //If the control was not previously registered, return
    //an error code.
    if (li_registered_slot === 0) {
      return -1;
    } //Unregister the control
    setnull(this.inv_registered[li_registered_slot - 1].wo_control);
    this.inv_registered[li_registered_slot - 1].s_typeof = ``;
    this.inv_registered[li_registered_slot - 1].b_movex = false;
    this.inv_registered[li_registered_slot - 1].i_movex = 0;
    this.inv_registered[li_registered_slot - 1].b_movey = false;
    this.inv_registered[li_registered_slot - 1].i_movey = 0;
    this.inv_registered[li_registered_slot - 1].b_scalewidth = false;
    this.inv_registered[li_registered_slot - 1].i_scalewidth = 0;
    this.inv_registered[li_registered_slot - 1].b_scaleheight = false;
    this.inv_registered[li_registered_slot - 1].i_scaleheight = 0;
    return 1;
  }


  of_register_2_WS(awo_control, as_method) {
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Function:  		of_Register
    //
    //	Access:  		public
    //
    //	Arguments:		
    //	awo_control		The window object being registered.
    //	as_method		The desired resize/move method.
    //						Valid values are:
    //						 'FixedToRight'
    //						 'FixedToBottom'
    //						 'FixedToRight&Bottom'
    //						 'Scale'
    //						 'ScaleToRight'
    //						 'ScaleToBottom'
    //						 'ScaleToRight&Bottom'
    //						 'FixedToRight&ScaleToBottom'
    //						 'FixedToBottom&ScaleToRight'
    //						 'FixedToCenter'       (fixed relative to center)
    //                 'FixedToCenterTop'    (fixed to top, but relative to horizontal center)
    //						 'FixedToCenterBottom' (fixed to bottom, but relative to horizontal center)
    //                 'FixedToCenterLeft'   (fixed to left side, but relative to vertical center)
    //                 'FixedToCenterRight'  (fixed to right side, but relative vertical center)
    //
    //	Returns:  		integer
    //						1 if it succeeds and -1 if an error occurs.
    //
    //	Description:  	Register a control which needs to either be moved or resized
    //						when the parent object is resized. 
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Revision History
    //
    //	Version
    //	5.0   Initial version
    //	6.0	Changed to use constants for checking resize method.
    // 6.0	Changed to support for weighted movement and sizing of controls.
    // 12.5  Add five resize/move methods related to center of window.
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    /*
     * Open Source PowerBuilder Foundation Class Libraries
     *
     * Copyright (c) 2004-2005, All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted in accordance with the GNU Lesser General
     * Public License Version 2.1, February 1999
     *
     * http://www.gnu.org/copyleft/lesser.html
     *
     * ====================================================================
     *
     * This software consists of voluntary contributions made by many
     * individuals and was originally based on software copyright (c) 
     * 1996-2004 Sybase, Inc. http://www.sybase.com.  For more
     * information on the Open Source PowerBuilder Foundation Class
     * Libraries see http://pfc.codexchange.sybase.com
    */
    //
    //////////////////////////////////////////////////////////////////////////////
    const dont_move = 0;
    const centered = 50;
    const full_percent = 100;
    let li_movex, li_movey;
    let li_scalewidth, li_scaleheight;
    let lb_scale = false; //Check parameters
    if (isnull(awo_control) || !isvalid(awo_control) || isnull(as_method)) {
      return -1;
    } //Translate and finish validating parameteters
    if (lower(as_method) === lower(this.fixedright)) {
      li_movex = full_percent;
      li_movey = dont_move;
    } else if (lower(as_method) === lower(this.fixedbottom)) {
      li_movex = dont_move;
      li_movey = full_percent;
    } else if (lower(as_method) === lower(this.fixedrightbottom)) {
      li_movex = full_percent;
      li_movey = full_percent;
    } else if (lower(as_method) === lower(this.scale)) {
      lb_scale = true;
    } else if (lower(as_method) === lower(this.scaleright)) {
      li_scalewidth = full_percent;
    } else if (lower(as_method) === lower(this.scalebottom)) {
      li_scaleheight = full_percent;
    } else if (lower(as_method) === lower(this.scalerightbottom)) {
      li_scalewidth = full_percent;
      li_scaleheight = full_percent;
    } else if (lower(as_method) === lower(this.fixedright_scalebottom)) {
      li_movex = full_percent;
      li_scaleheight = full_percent;
    } else if (lower(as_method) === lower(this.fixedbottom_scaleright)) {
      li_movey = full_percent;
      li_scalewidth = full_percent;
    } else if (lower(as_method) === lower(this.fixedcenter)) {
      li_movex = centered;
      li_movey = centered;
    } else if (lower(as_method) === lower(this.fixedcenterbottom)) {
      li_movex = centered;
      li_movey = full_percent;
    } else if (lower(as_method) === lower(this.fixedcentertop)) {
      li_movex = centered;
      li_movey = dont_move;
    } else if (lower(as_method) === lower(this.fixedcenterleft)) {
      li_movex = dont_move;
      li_movey = centered;
    } else if (lower(as_method) === lower(this.fixedcenterright)) {
      li_movex = full_percent;
      li_movey = centered;
    } else {
      return -1;
    }
    return this.of_register(awo_control, lb_scale, li_movex, li_movey, li_scalewidth, li_scaleheight);
  }


  of_setminsize(ai_minwidth, ai_minheight) {
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Function:  		of_SetMinSize
    //
    //	Access:  		public
    //
    //	Arguments:		
    //	ai_minwidth		The minimum width for the parent object.
    //	ai_minheight	The minimum height for the parent object.
    //
    //	Returns:  		integer
    //						1 if it succeeds and -1 if an error occurs.
    //
    //	Description:  	Sets the current object minimum size attributes.
    //						Note: the service object needs to be initialized (of_SetOrigSize())
    //						prior to	setting the Minimum size of the object.
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Revision History
    //
    //	Version
    //	5.0   Initial version
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    /*
     * Open Source PowerBuilder Foundation Class Libraries
     *
     * Copyright (c) 2004-2005, All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted in accordance with the GNU Lesser General
     * Public License Version 2.1, February 1999
     *
     * http://www.gnu.org/copyleft/lesser.html
     *
     * ====================================================================
     *
     * This software consists of voluntary contributions made by many
     * individuals and was originally based on software copyright (c) 
     * 1996-2004 Sybase, Inc. http://www.sybase.com.  For more
     * information on the Open Source PowerBuilder Foundation Class
     * Libraries see http://pfc.codexchange.sybase.com
    */
    //
    //////////////////////////////////////////////////////////////////////////////
    //Check parameters
    if (isnull(ai_minwidth) || isnull(ai_minheight)) {
      return -1;
    } //Confirm that the user object has already been initialized
    if (this.il_parentprevheight === -1 && this.il_parentprevwidth === -1) {
      return -1;
    } //Set the minimum values for the width and height
    this.il_parentminimumwidth = ai_minwidth;
    this.il_parentminimumheight = ai_minheight;
    return 1;
  }


  of_setorigsize(ai_width, ai_height) {
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Function:  		of_SetOrigSize
    //
    //	Access:  		public
    //
    //	Arguments:		
    //	ai_width			The current width of the parent object.
    //	ai_height		The current height of the parent object.
    //
    //	Returns:  		integer
    //						1 if it succeeds and -1 if an error occurs.
    //
    //	Description:  	Initializes the Resize object by setting the current object
    //						size.
    //						Note: the service object needs to be initialized (this function)
    //						prior to	the registering (of_register()) of objects.
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Revision History
    //
    //	Version
    //	5.0   Initial version
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    /*
     * Open Source PowerBuilder Foundation Class Libraries
     *
     * Copyright (c) 2004-2005, All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted in accordance with the GNU Lesser General
     * Public License Version 2.1, February 1999
     *
     * http://www.gnu.org/copyleft/lesser.html
     *
     * ====================================================================
     *
     * This software consists of voluntary contributions made by many
     * individuals and was originally based on software copyright (c) 
     * 1996-2004 Sybase, Inc. http://www.sybase.com.  For more
     * information on the Open Source PowerBuilder Foundation Class
     * Libraries see http://pfc.codexchange.sybase.com
    */
    //
    //////////////////////////////////////////////////////////////////////////////
    //Check parameters
    if (isnull(ai_width) || isnull(ai_height)) {
      return -1;
    } //Set the current width and height
    this.il_parentprevwidth = ai_width;
    this.il_parentprevheight = ai_height;
    return 1;
  }


  of_register_5_WIIII(awo_control, ai_movex, ai_movey, ai_scalewidth, ai_scaleheight) {
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Function:  		of_Register
    //
    //	Access:  		public
    //
    //	Arguments:		
    //	 awo_control	The window object being registered.
    //  ai_movex			The percentage to move the object along the x axis.
    //  ai_movey			The percentage to move the object along the y axis.
    //  ai_scalewidth 	The percentage to scale the object along the x axis.
    //  ai_scaleheight	The percentage to scale the object along the y axis.
    //
    //	Returns:  		integer
    //						1 if it succeeds and -1 if an error occurs.
    //
    //	Description:  	Register a control which needs to either be moved or resized
    //						when the parent object is resized.
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Revision History
    //
    //	Version
    //	6.0    Initial version
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    /*
     * Open Source PowerBuilder Foundation Class Libraries
     *
     * Copyright (c) 2004-2005, All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted in accordance with the GNU Lesser General
     * Public License Version 2.1, February 1999
     *
     * http://www.gnu.org/copyleft/lesser.html
     *
     * ====================================================================
     *
     * This software consists of voluntary contributions made by many
     * individuals and was originally based on software copyright (c) 
     * 1996-2004 Sybase, Inc. http://www.sybase.com.  For more
     * information on the Open Source PowerBuilder Foundation Class
     * Libraries see http://pfc.codexchange.sybase.com
    */
    //
    //////////////////////////////////////////////////////////////////////////////
    let lb_scale = false;
    return this.of_register(awo_control, lb_scale, ai_movex, ai_movey, ai_scalewidth, ai_scaleheight);
  }


  of_register_6_WBIIII(awo_control, ab_scale, ai_movex, ai_movey, ai_scalewidth, ai_scaleheight) {
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Function:  		of_Register
    //
    //	Access:  		public
    //
    //	Arguments:		
    //	 awo_control		The window object being registered.
    //  ab_scale			If the object should be registered as a Scale type.
    //  ai_movex			The percentage to move the object along the x axis.
    //  ai_movey			The percentage to move the object along the y axis.
    //  ai_scalewidth 	The percentage to scale the object along the x axis.
    //  ai_scaleheight	The percentage to scale the object along the y axis.
    //
    //	Returns:  		integer
    //						1 if it succeeds and -1 if an error occurs.
    //
    //	Description:  	Register a control which needs to either be moved or resized
    //						when the parent object is resized.  The action taken on this
    //						control depends on the four attributes: ai_movex, ai ai_movey,
    //						ai_scalewidth, ai_scaleheight.
    //						Note: the service object needs to be initialized (of_SetOrigSize())
    //						prior to	any registering (this function) of objects.
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Revision History
    //
    //	Version
    //	6.0    Initial version
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    /*
     * Open Source PowerBuilder Foundation Class Libraries
     *
     * Copyright (c) 2004-2005, All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted in accordance with the GNU Lesser General
     * Public License Version 2.1, February 1999
     *
     * http://www.gnu.org/copyleft/lesser.html
     *
     * ====================================================================
     *
     * This software consists of voluntary contributions made by many
     * individuals and was originally based on software copyright (c) 
     * 1996-2004 Sybase, Inc. http://www.sybase.com.  For more
     * information on the Open Source PowerBuilder Foundation Class
     * Libraries see http://pfc.codexchange.sybase.com
    */
    //
    //////////////////////////////////////////////////////////////////////////////
    let ldrg_cntrl;
    let loval_cntrl;
    let ln_cntrl;
    let lrec_cntrl;
    let lrrec_cntrl;
    let li_x, li_y, li_width, li_height;
    let li_upperbound;
    let li_cnt;
    let li_slot_available;
    let lb_movex = false,
      lb_movey = false;
    let lb_scalewidth = false,
      lb_scaleheight = false; //Check parameters
    if (isnull(awo_control) || !isvalid(awo_control) || isnull(ab_scale) || isnull(ai_movex) || ai_movex < 0 || ai_movex > 100 || isnull(ai_movey) || ai_movey < 0 || ai_movey > 100 || isnull(ai_scalewidth) || ai_scalewidth < 0 || ai_scalewidth > 100 || isnull(ai_scaleheight) || ai_scaleheight < 0 || ai_scaleheight > 100) {
      return -1;
    } //Translate parameteters.
    if (ab_scale) {
      ai_movex = 0;
      ai_movey = 0;
      ai_scalewidth = 0;
      ai_scaleheight = 0;
    }
    lb_movex = ai_movex > 0;
    lb_movey = ai_movey > 0;
    lb_scalewidth = ai_scalewidth > 0;
    lb_scaleheight = ai_scaleheight > 0; //Confirm that the user object has already been initialized
    if (this.il_parentprevheight === -1 && this.il_parentprevwidth === -1) {
      return -1;
    } //Get the previous Bound
    li_upperbound = upperbound(this.inv_registered); //Determine if there is an open slot available other than a
    //new entry on the array
    li_slot_available = 0;
    for (li_cnt = 1; li_cnt <= li_upperbound; li_cnt += 1) {
      if (isnull(this.inv_registered[li_cnt - 1].wo_control) || !isvalid(this.inv_registered[li_cnt - 1].wo_control)) {
        if (li_slot_available === 0) {
          //Get the first slot found
          li_slot_available = li_cnt;
        }
      } else {
        //Check if control has already been registered
        if (this.inv_registered[li_cnt - 1].wo_control === awo_control) {
          return -1;
        }
      }
    } //If an available slot was not found then create a new entry
    if (li_slot_available === 0) {
      li_slot_available = li_upperbound + 1;
    } ///////////////////////////////////////////////////////////////////////////////////////
    //Register the new object
    ///////////////////////////////////////////////////////////////////////////////////////
    //Validate and set typeof value
    if (this.of_typeof(awo_control) === this.dragobject) {
      //Store a reference to the control
      ldrg_cntrl = awo_control; //Store the type of the control to speed access to its attributes
      this.inv_registered[li_slot_available - 1].s_typeof = this.dragobject; //Store the position and size of control
      li_x = ldrg_cntrl.x;
      li_y = ldrg_cntrl.y;
      li_width = ldrg_cntrl.width;
      li_height = ldrg_cntrl.height;
    } else if (this.of_typeof(awo_control) === this.line) {
      ln_cntrl = awo_control;
      this.inv_registered[li_slot_available - 1].s_typeof = this.line;
      li_x = ln_cntrl.beginx;
      li_y = ln_cntrl.beginy;
      li_width = ln_cntrl.endx;
      li_height = ln_cntrl.endy;
    } else if (this.of_typeof(awo_control) === this.oval) {
      loval_cntrl = awo_control;
      this.inv_registered[li_slot_available - 1].s_typeof = this.oval;
      li_x = loval_cntrl.x;
      li_y = loval_cntrl.y;
      li_width = loval_cntrl.width;
      li_height = loval_cntrl.height;
    } else if (this.of_typeof(awo_control) === this.rectangle) {
      lrec_cntrl = awo_control;
      this.inv_registered[li_slot_available - 1].s_typeof = this.rectangle;
      li_x = lrec_cntrl.x;
      li_y = lrec_cntrl.y;
      li_width = lrec_cntrl.width;
      li_height = lrec_cntrl.height;
    } else if (this.of_typeof(awo_control) === this.roundrectangle) {
      lrrec_cntrl = awo_control;
      this.inv_registered[li_slot_available - 1].s_typeof = this.roundrectangle;
      li_x = lrrec_cntrl.x;
      li_y = lrrec_cntrl.y;
      li_width = lrrec_cntrl.width;
      li_height = lrrec_cntrl.height;
    } else {
      //An unknown control type has been encountered
      return -1;
    } //Register the actual object
    this.inv_registered[li_slot_available - 1].wo_control = awo_control;
    this.inv_registered[li_slot_available - 1].s_classname = awo_control.classname(); //Set the behavior attributes
    this.inv_registered[li_slot_available - 1].b_movex = lb_movex;
    this.inv_registered[li_slot_available - 1].i_movex = ai_movex;
    this.inv_registered[li_slot_available - 1].b_movey = lb_movey;
    this.inv_registered[li_slot_available - 1].i_movey = ai_movey;
    this.inv_registered[li_slot_available - 1].b_scalewidth = lb_scalewidth;
    this.inv_registered[li_slot_available - 1].i_scalewidth = ai_scalewidth;
    this.inv_registered[li_slot_available - 1].b_scaleheight = lb_scaleheight;
    this.inv_registered[li_slot_available - 1].i_scaleheight = ai_scaleheight;
    this.inv_registered[li_slot_available - 1].b_scale = ab_scale; //Set the initial position/size attributes
    this.inv_registered[li_slot_available - 1].r_x = li_x;
    this.inv_registered[li_slot_available - 1].r_y = li_y;
    this.inv_registered[li_slot_available - 1].r_width = li_width;
    this.inv_registered[li_slot_available - 1].r_height = li_height;
    return 1;
  }


  of_typeof(awo_control) {
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Function:  		of_TypeOf
    //
    //	Access:  		protected
    //
    //	Arguments:		
    //	awo_control		The window object for which a type is needed.
    //
    //	Returns:  		string
    //						Describes the type of the object.
    //						'!' if an error occurs.
    //
    //	Description:  	Determines on the type of an object for the purposes of 
    //						getting to its attributes.
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Revision History
    //
    //	Version
    //	5.0   Initial version
    // 6.0	Changed to use new constants.
    // 7.0	Added new controls hprogressbar!, htrackbar!, vprogressbar!,
    //			vtrackbar!, picturehyperlink!, statichyperlink!
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    /*
     * Open Source PowerBuilder Foundation Class Libraries
     *
     * Copyright (c) 2004-2005, All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted in accordance with the GNU Lesser General
     * Public License Version 2.1, February 1999
     *
     * http://www.gnu.org/copyleft/lesser.html
     *
     * ====================================================================
     *
     * This software consists of voluntary contributions made by many
     * individuals and was originally based on software copyright (c) 
     * 1996-2004 Sybase, Inc. http://www.sybase.com.  For more
     * information on the Open Source PowerBuilder Foundation Class
     * Libraries see http://pfc.codexchange.sybase.com
    */
    //
    //////////////////////////////////////////////////////////////////////////////
    //Check parameters
    if (isnull(awo_control) || !isvalid(awo_control)) {
      return `!`;
    } //Validate and set typeof value
    if (awo_control.typeof() === `checkbox!` || awo_control.typeof() === `commandbutton!` || awo_control.typeof() === `datawindow!` || awo_control.typeof() === `dropdownlistbox!` || awo_control.typeof() === `dropdownpicturelistbox!` || awo_control.typeof() === `editmask!` || awo_control.typeof() === `graph!` || awo_control.typeof() === `groupbox!` || awo_control.typeof() === `hprogressbar!` || awo_control.typeof() === `hscrollbar!` || awo_control.typeof() === `htrackbar!` || awo_control.typeof() === `listbox!` || awo_control.typeof() === `listview!` || awo_control.typeof() === `multilineedit!` || awo_control.typeof() === `olecontrol!` || awo_control.typeof() === `olecustomcontrol!` || awo_control.typeof() === `omcontrol!` || awo_control.typeof() === `omcustomcontrol!` || awo_control.typeof() === `omembeddedcontrol!` || awo_control.typeof() === `picture!` || awo_control.typeof() === `picturebutton!` || awo_control.typeof() === `picturehyperlink!` || awo_control.typeof() === `picturelistbox!` || awo_control.typeof() === `radiobutton!` || awo_control.typeof() === `richtextedit!` || awo_control.typeof() === `singlelineedit!` || awo_control.typeof() === `statichyperlink!` || awo_control.typeof() === `statictext!` || awo_control.typeof() === `tab!` || awo_control.typeof() === `treeview!` || awo_control.typeof() === `userobject!` || awo_control.typeof() === `vprogressbar!` || awo_control.typeof() === `vscrollbar!` || awo_control.typeof() === `vtrackbar!`) {
      return this.dragobject;
    } else if (awo_control.typeof() === `line!`) {
      return this.line;
    } else if (awo_control.typeof() === `oval!`) {
      return this.oval;
    } else if (awo_control.typeof() === `rectangle!`) {
      return this.rectangle;
    } else if (awo_control.typeof() === `roundrectangle!`) {
      return this.roundrectangle;
    } else if (awo_control.typeof() === `mdiclient!`) {
      return this.mdiclient;
    }
    return `!`;
  }


  of_getminmaxpoints(awo_control, ai_min_x, ai_min_y, ai_max_x, ai_max_y) {
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Function:  		of_GetMinMaxPoints
    //
    //	Access:  		public
    //
    //	Arguments:		
    //	awo_control[]	The control array for whom the Min and Max attributes are needed.
    //	ai_min_x			The minimum X point found by looking at the X attributes of all
    //							the controls on the control array (by reference).
    //	ai_min_y			The minimum Y point found by looking at the X attributes of all
    //							the controls on the control array (by reference).
    //	ai_max_x			The maximum X point found by adding the X and Width attributes
    //							of all the controls on the control array (by reference).
    //	ai_max_y			The maximum Y point found by adding the Y and Height attributes
    //							of all the controls on the control array (by reference).
    //
    //	Returns:  		integer
    //						1 if it succeeds and -1 if an error occurs.
    //
    //	Description:  	Determines the four extreme points of the controls within a 
    //						control array by looking at the X, Y, Width, Height, BeginX, 
    //						BeginY, EndX, EndY attributes.
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Revision History
    //
    //	Version
    //	5.0   Initial version
    // 6.0	Changed to use new constants.
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    /*
     * Open Source PowerBuilder Foundation Class Libraries
     *
     * Copyright (c) 2004-2005, All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted in accordance with the GNU Lesser General
     * Public License Version 2.1, February 1999
     *
     * http://www.gnu.org/copyleft/lesser.html
     *
     * ====================================================================
     *
     * This software consists of voluntary contributions made by many
     * individuals and was originally based on software copyright (c) 
     * 1996-2004 Sybase, Inc. http://www.sybase.com.  For more
     * information on the Open Source PowerBuilder Foundation Class
     * Libraries see http://pfc.codexchange.sybase.com
    */
    //
    //////////////////////////////////////////////////////////////////////////////
    let ldrg_cntrl;
    let loval_cntrl;
    let ln_cntrl;
    let lrec_cntrl;
    let lrrec_cntrl;
    let li_x, li_y, li_width, li_height, li_temp;
    let li_upperbound;
    let li_cnt; //Check arguments
    if (isnull(awo_control) || isnull(awo_control) || upperbound(awo_control) === 0) {
      return -1;
    } //Initialize
    ai_min_x = 32767;
    ai_min_y = 32767;
    ai_max_x = 0;
    ai_max_y = 0; //Get the Control upper bound
    li_upperbound = upperbound(awo_control); //Determine position of the right most and bottom most control.
    for (li_cnt = 1; li_cnt <= li_upperbound; li_cnt += 1) {
      if (isvalid(awo_control[li_cnt - 1])) {
        if (this.of_typeof(awo_control[li_cnt - 1]) === this.dragobject) {
          //Set a reference to the control.
          ldrg_cntrl = awo_control[li_cnt - 1]; //Get the position, width, and height of the control.
          li_x = ldrg_cntrl.x;
          li_y = ldrg_cntrl.y;
          li_width = ldrg_cntrl.width;
          li_height = ldrg_cntrl.height;
        } else if (this.of_typeof(awo_control[li_cnt - 1]) === this.line) {
          ln_cntrl = awo_control[li_cnt - 1];
          li_x = ln_cntrl.beginx;
          li_y = ln_cntrl.beginy;
          li_width = ln_cntrl.endx;
          li_height = ln_cntrl.endy; //Correct for lines that may have the End points 
          //before to the Begin points.
          if (li_width >= li_x) {
            li_width = li_width - li_x;
          } else {
            li_temp = li_x;
            li_x = li_width;
            li_width = li_temp - li_x;
          }
          if (li_height >= li_y) {
            li_height = li_height - li_y;
          } else {
            li_temp = li_y;
            li_y = li_height;
            li_height = li_temp - li_y;
          }
        } else if (this.of_typeof(awo_control[li_cnt - 1]) === this.oval) {
          loval_cntrl = awo_control[li_cnt - 1];
          li_x = loval_cntrl.x;
          li_y = loval_cntrl.y;
          li_width = loval_cntrl.width;
          li_height = loval_cntrl.height;
        } else if (this.of_typeof(awo_control[li_cnt - 1]) === this.rectangle) {
          lrec_cntrl = awo_control[li_cnt - 1];
          li_x = lrec_cntrl.x;
          li_y = lrec_cntrl.y;
          li_width = lrec_cntrl.width;
          li_height = lrec_cntrl.height;
        } else if (this.of_typeof(awo_control[li_cnt - 1]) === this.roundrectangle) {
          lrrec_cntrl = awo_control[li_cnt - 1];
          li_x = lrrec_cntrl.x;
          li_y = lrrec_cntrl.y;
          li_width = lrrec_cntrl.width;
          li_height = lrrec_cntrl.height;
        } else if (this.of_typeof(awo_control[li_cnt - 1]) === this.mdiclient) {
          continue;
        } else {
          //An unknown control type has been encountered
          return -1;
        } //Determine the Min and Max points
        if (li_x < ai_min_x) {
          ai_min_x = li_x;
        }
        if (li_y < ai_min_y) {
          ai_min_y = li_y;
        }
        if (li_x + li_width > ai_max_x) {
          ai_max_x = li_x + li_width;
        }
        if (li_y + li_height > ai_max_y) {
          ai_max_y = li_y + li_height;
        }
      }
    }
    return 1;
  }


  of_resize(ai_newwidth, ai_newheight) {
    //////////////////////////////////////////////////////////////////////////////
    //	Protected Function:		of_Resize
    //	Arguments:					ai_newwidth		The new width of the parent object.
    //									ai_newheight	The new height of the parent object.
    //	Returns:  					integer
    //									1 if it succeeds and -1 if an error occurs.
    //	Description:  				Moves or resizes objects that were registered with the service.
    //									Performs the actions that were requested via the
    //									of_SetOrigSize() and of_Register functions.
    //////////////////////////////////////////////////////////////////////////////
    //	Rev. History					Version
    //									5.0		Initial version
    // 									6.0		Changed to support for weighted movement and sizing of controls.
    // 									6.0		Changed to use new constants.
    //									8.0		Changed from Move for drawing objects to setting X and Y
    //////////////////////////////////////////////////////////////////////////////
    /*
     * Open Source PowerBuilder Foundation Class Libraries
     *
     * Copyright (c) 2004-2005, All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted in accordance with the GNU Lesser General
     * Public License Version 2.1, February 1999
     *
     * http://www.gnu.org/copyleft/lesser.html
     *
     * ====================================================================
     *
     * This software consists of voluntary contributions made by many
     * individuals and was originally based on software copyright (c) 
     * 1996-2004 Sybase, Inc. http://www.sybase.com.  For more
     * information on the Open Source PowerBuilder Foundation Class
     * Libraries see http://pfc.codexchange.sybase.com
    */
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //Note: For the line control: the width and height variables are
    //										used to hold EndX and EndY attributes.
    //////////////////////////////////////////////////////////////////////////////
    //Temporary controls to get to attributes
    let ldrg_cntrl;
    let loval_cntrl;
    let lln_cntrl;
    let lrec_cntrl;
    let lrrec_cntrl; //Local variables
    let li_upperbound;
    let li_cnt;
    let li_x, li_y, li_width, li_height;
    let li_deltawidth, li_deltaheight;
    let lr_ratiowidth, lr_ratioheight;
    let lr_move_deltax, lr_move_deltay;
    let lr_resize_deltawidth, lr_resize_deltaheight; //Confirm that the user object has already been initialized
    if (this.il_parentprevheight === -1 && this.il_parentprevwidth === -1) {
      return -1;
    } //Check the parameters
    if (isnull(ai_newwidth) || isnull(ai_newheight)) {
      return -1;
    } //Prevent the contents of the windows from resizing past the min width/height
    if (ai_newwidth < this.il_parentminimumwidth) {
      ai_newwidth = this.il_parentminimumwidth;
    }
    if (ai_newheight < this.il_parentminimumheight) {
      ai_newheight = this.il_parentminimumheight;
    } //Set the deltas/ratios for the width and height as compared to the previous size
    li_deltawidth = ai_newwidth - this.il_parentprevwidth;
    li_deltaheight = ai_newheight - this.il_parentprevheight;
    if (this.il_parentprevwidth === 0) {
      this.il_parentprevwidth = 1;
    }
    if (this.il_parentprevheight === 0) {
      this.il_parentprevheight = 1;
    }
    lr_ratiowidth = ai_newwidth / this.il_parentprevwidth;
    lr_ratioheight = ai_newheight / this.il_parentprevheight; //Only continue if the size has changed
    if (li_deltawidth === 0 && li_deltaheight === 0) {
      return 1;
    } //Set the new previous size
    this.il_parentprevwidth = ai_newwidth;
    this.il_parentprevheight = ai_newheight; ///////////////////////////////////////////////////////////////////////////////////////////////
    // Loop through all registered controls - Moving and resizing as appropriate
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //Loop trough all controls
    li_upperbound = upperbound(this.inv_registered);
    for (li_cnt = 1; li_cnt <= li_upperbound; li_cnt += 1) {
      //Initialize variables
      li_x = 0;
      li_y = 0;
      li_width = 0;
      li_height = 0;
      lr_move_deltax = 0;
      lr_move_deltay = 0;
      lr_resize_deltawidth = 0;
      lr_resize_deltaheight = 0;
      setnull(ldrg_cntrl);
      setnull(loval_cntrl);
      setnull(lln_cntrl);
      setnull(lrec_cntrl);
      setnull(lrrec_cntrl);
      if (isvalid(this.inv_registered[li_cnt - 1].wo_control)) {
        //Get attribute information from the appropriate control
        if (this.inv_registered[li_cnt - 1].s_typeof === this.dragobject) {
          ldrg_cntrl = this.inv_registered[li_cnt - 1].wo_control;
          li_x = ldrg_cntrl.x;
          li_y = ldrg_cntrl.y;
          li_width = ldrg_cntrl.width;
          li_height = ldrg_cntrl.height;
        } else if (this.inv_registered[li_cnt - 1].s_typeof === this.line) {
          // For the line control, the width and height variables 
          // are used to hold EndX and EndY attributes
          lln_cntrl = this.inv_registered[li_cnt - 1].wo_control;
          li_x = lln_cntrl.beginx;
          li_y = lln_cntrl.beginy;
          li_width = lln_cntrl.endx;
          li_height = lln_cntrl.endy;
        } else if (this.inv_registered[li_cnt - 1].s_typeof === this.oval) {
          loval_cntrl = this.inv_registered[li_cnt - 1].wo_control;
          li_x = loval_cntrl.x;
          li_y = loval_cntrl.y;
          li_width = loval_cntrl.width;
          li_height = loval_cntrl.height;
        } else if (this.inv_registered[li_cnt - 1].s_typeof === this.rectangle) {
          lrec_cntrl = this.inv_registered[li_cnt - 1].wo_control;
          li_x = lrec_cntrl.x;
          li_y = lrec_cntrl.y;
          li_width = lrec_cntrl.width;
          li_height = lrec_cntrl.height;
        } else if (this.inv_registered[li_cnt - 1].s_typeof === this.roundrectangle) {
          lrrec_cntrl = this.inv_registered[li_cnt - 1].wo_control;
          li_x = lrrec_cntrl.x;
          li_y = lrrec_cntrl.y;
          li_width = lrrec_cntrl.width;
          li_height = lrrec_cntrl.height;
        } else {
          return -1;
        } //Correct for any rounding or moving/resizing of objects through
        //any other means
        if (abs(this.inv_registered[li_cnt - 1].r_x - li_x) > this.ii_rounding) {
          this.inv_registered[li_cnt - 1].r_x = li_x;
        }
        if (abs(this.inv_registered[li_cnt - 1].r_y - li_y) > this.ii_rounding) {
          this.inv_registered[li_cnt - 1].r_y = li_y;
        }
        if (abs(this.inv_registered[li_cnt - 1].r_width - li_width) > this.ii_rounding && li_width > this.inv_registered[li_cnt - 1].i_widthmin) {
          this.inv_registered[li_cnt - 1].r_width = li_width;
        }
        if (abs(this.inv_registered[li_cnt - 1].r_height - li_height) > this.ii_rounding && li_height > this.inv_registered[li_cnt - 1].i_heightmin) {
          this.inv_registered[li_cnt - 1].r_height = li_height;
        } //Define the deltas for this control:  Move and Resize
        if (this.inv_registered[li_cnt - 1].b_scale) {
          lr_move_deltax = this.inv_registered[li_cnt - 1].r_x * lr_ratiowidth - this.inv_registered[li_cnt - 1].r_x;
          lr_move_deltay = this.inv_registered[li_cnt - 1].r_y * lr_ratioheight - this.inv_registered[li_cnt - 1].r_y;
          lr_resize_deltawidth = this.inv_registered[li_cnt - 1].r_width * lr_ratiowidth - this.inv_registered[li_cnt - 1].r_width;
          lr_resize_deltaheight = this.inv_registered[li_cnt - 1].r_height * lr_ratioheight - this.inv_registered[li_cnt - 1].r_height;
        } else {
          // Prevent the weighted value from being overriden.
          if (this.inv_registered[li_cnt - 1].b_movex && this.inv_registered[li_cnt - 1].i_movex === 0) {
            this.inv_registered[li_cnt - 1].i_movex = 100;
          }
          if (this.inv_registered[li_cnt - 1].b_movey && this.inv_registered[li_cnt - 1].i_movey === 0) {
            this.inv_registered[li_cnt - 1].i_movey = 100;
          }
          if (this.inv_registered[li_cnt - 1].b_scalewidth && this.inv_registered[li_cnt - 1].i_scalewidth === 0) {
            this.inv_registered[li_cnt - 1].i_scalewidth = 100;
          }
          if (this.inv_registered[li_cnt - 1].b_scaleheight && this.inv_registered[li_cnt - 1].i_scaleheight === 0) {
            this.inv_registered[li_cnt - 1].i_scaleheight = 100;
          } // Support for weighted movement and sizing of controls.
          if (this.inv_registered[li_cnt - 1].b_movex) {
            lr_move_deltax = li_deltawidth * this.inv_registered[li_cnt - 1].i_movex / 100;
          }
          if (this.inv_registered[li_cnt - 1].b_movey) {
            lr_move_deltay = li_deltaheight * this.inv_registered[li_cnt - 1].i_movey / 100;
          }
          if (this.inv_registered[li_cnt - 1].b_scalewidth) {
            lr_resize_deltawidth = li_deltawidth * this.inv_registered[li_cnt - 1].i_scalewidth / 100;
          }
          if (this.inv_registered[li_cnt - 1].b_scaleheight) {
            lr_resize_deltaheight = li_deltaheight * this.inv_registered[li_cnt - 1].i_scaleheight / 100;
          }
        } //If appropriate move the control along the X and Y attribute.
        if (lr_move_deltax !== 0 || lr_move_deltay !== 0) {
          //Save the 'exact' X and Y attributes.
          this.inv_registered[li_cnt - 1].r_x = this.inv_registered[li_cnt - 1].r_x + lr_move_deltax;
          this.inv_registered[li_cnt - 1].r_y = this.inv_registered[li_cnt - 1].r_y + lr_move_deltay;
          if (this.inv_registered[li_cnt - 1].s_typeof === this.dragobject) {
            ldrg_cntrl.move(this.inv_registered[li_cnt - 1].r_x, this.inv_registered[li_cnt - 1].r_y);
          } else if (this.inv_registered[li_cnt - 1].s_typeof === this.line) {
            //X moving
            lln_cntrl.beginx = this.inv_registered[li_cnt - 1].r_x;
            this.inv_registered[li_cnt - 1].r_width = this.inv_registered[li_cnt - 1].r_width + lr_move_deltax;
            lln_cntrl.endx = this.inv_registered[li_cnt - 1].r_width; //Y moving
            lln_cntrl.beginy = this.inv_registered[li_cnt - 1].r_y;
            this.inv_registered[li_cnt - 1].r_height = this.inv_registered[li_cnt - 1].r_height + lr_move_deltay;
            lln_cntrl.endy = this.inv_registered[li_cnt - 1].r_height;
          } else if (this.inv_registered[li_cnt - 1].s_typeof === this.oval) {
            loval_cntrl.x = this.inv_registered[li_cnt - 1].r_x;
            loval_cntrl.y = this.inv_registered[li_cnt - 1].r_y;
          } else if (this.inv_registered[li_cnt - 1].s_typeof === this.rectangle) {
            lrec_cntrl.x = this.inv_registered[li_cnt - 1].r_x;
            lrec_cntrl.y = this.inv_registered[li_cnt - 1].r_y;
          } else if (this.inv_registered[li_cnt - 1].s_typeof === this.roundrectangle) {
            lrrec_cntrl.x = this.inv_registered[li_cnt - 1].r_x;
            lrrec_cntrl.y = this.inv_registered[li_cnt - 1].r_y;
          }
        } /* Move */
        //If appropriate Resize the Width And Height of the control.
        //Performing one Resize instead of changing Width and Height individually.
        if (lr_resize_deltawidth !== 0 || lr_resize_deltaheight !== 0) {
          //Save the 'exact' Width and Height attributes.
          this.inv_registered[li_cnt - 1].r_width = this.inv_registered[li_cnt - 1].r_width + lr_resize_deltawidth;
          this.inv_registered[li_cnt - 1].r_height = this.inv_registered[li_cnt - 1].r_height + lr_resize_deltaheight;
          if (this.inv_registered[li_cnt - 1].s_typeof === this.dragobject) {
            ldrg_cntrl.resize(this.inv_registered[li_cnt - 1].r_width, this.inv_registered[li_cnt - 1].r_height);
            li_width = ldrg_cntrl.width;
            li_height = ldrg_cntrl.height;
          } else if (this.inv_registered[li_cnt - 1].s_typeof === this.line) {
            lln_cntrl.endx = this.inv_registered[li_cnt - 1].r_width;
          } else if (this.inv_registered[li_cnt - 1].s_typeof === this.oval) {
            loval_cntrl.resize(this.inv_registered[li_cnt - 1].r_width, this.inv_registered[li_cnt - 1].r_height);
            li_width = loval_cntrl.width;
            li_height = loval_cntrl.height;
          } else if (this.inv_registered[li_cnt - 1].s_typeof === this.rectangle) {
            lrec_cntrl.resize(this.inv_registered[li_cnt - 1].r_width, this.inv_registered[li_cnt - 1].r_height);
            li_width = lrec_cntrl.width;
            li_height = lrec_cntrl.height;
          } else if (this.inv_registered[li_cnt - 1].s_typeof === this.roundrectangle) {
            lrrec_cntrl.resize(this.inv_registered[li_cnt - 1].r_width, this.inv_registered[li_cnt - 1].r_height);
            li_width = lrrec_cntrl.width;
            li_height = lrrec_cntrl.height;
          } //Determine if the object does not support the requested Width or Height.
          //Used to determine if the object was resized by any other means.
          if (li_width > this.inv_registered[li_cnt - 1].r_width) {
            this.inv_registered[li_cnt - 1].i_widthmin = li_width;
          } else {
            this.inv_registered[li_cnt - 1].i_widthmin = 0;
          }
          if (li_height > this.inv_registered[li_cnt - 1].r_height) {
            this.inv_registered[li_cnt - 1].i_heightmin = li_height;
          } else {
            this.inv_registered[li_cnt - 1].i_heightmin = 0;
          }
        } /* Resize */
      } /* If IsValid(inv_registered[li_cnt].wo_control) Then */
    } /* For li_cnt = 1 to li_upperbound */
    return 1;
  }
    // Events

  pfc_resize(aul_sizetype, ai_newwidth, ai_newheight) {
    //////////////////////////////////////////////////////////////////////////////
    //
    //	Event:  resize
    //
    //	Description:
    //	Send resize notification to services.
    //
    //////////////////////////////////////////////////////////////////////////////
    //	
    //	Revision History
    //
    //	Version
    //	5.0   Initial version
    //
    //////////////////////////////////////////////////////////////////////////////
    //
    /*
     * Open Source PowerBuilder Foundation Class Libraries
     *
     * Copyright (c) 2004-2005, All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted in accordance with the GNU Lesser General
     * Public License Version 2.1, February 1999
     *
     * http://www.gnu.org/copyleft/lesser.html
     *
     * ====================================================================
     *
     * This software consists of voluntary contributions made by many
     * individuals and was originally based on software copyright (c) 
     * 1996-2004 Sybase, Inc. http://www.sybase.com.  For more
     * information on the Open Source PowerBuilder Foundation Class
     * Libraries see http://pfc.codexchange.sybase.com
    */
    //
    //////////////////////////////////////////////////////////////////////////////
    return this.of_resize(ai_newwidth, ai_newheight);
  }


  create() {
    super.create();
    triggerevent(this, `constructor`);
  }


  destroy() {
    triggerevent(this, `destructor`);
    super.destroy();
  }


  pbconstructor() {//////////////////////////////////////////////////////////////////////////////
    //
    //	Cloned from pfc object  pfc_n_cst_resize
    //
    //	Description:
    //	DW Resize service.  Removed from pfc and modified for standalone.
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

root.n_resize_service = n_resize_service;
})(typeof window !== "undefined" ? window : null);
