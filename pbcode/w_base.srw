$PBExportHeader$w_base.srw
forward
global type w_base from window
end type
end forward

global type w_base from window
integer width = 3634
integer height = 1568
boolean titlebar = true
string title = "Untitled"
boolean controlmenu = true
boolean minbox = true
boolean maxbox = true
boolean resizable = true
long backcolor = 67108864
string icon = "AppIcon!"
boolean center = true
end type
global w_base w_base

type variables
n_resize_service	inv_resize
end variables

forward prototypes
public subroutine of_set_resize (boolean ab_switch)
end prototypes

public subroutine of_set_resize (boolean ab_switch);IF ab_switch THEN
	IF NOT IsValid(inv_resize) THEN
		inv_resize = CREATE n_resize_service
	END IF
	inv_resize.of_setorigsize(this.width, this.height)
ELSE
	IF IsValid(inv_resize) THEN
		DESTROY inv_resize
	END IF
END IF
end subroutine

on w_base.create
end on

on w_base.destroy
end on

event close;IF IsValid(inv_resize) THEN
	DESTROY inv_resize
END IF
end event

event resize;IF IsValid(inv_resize) THEN
	inv_resize.event pfc_resize(sizetype, newwidth, newheight)
END IF
end event

event open;//////////////////////////////////////////////////////////////////////////////
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

end event

