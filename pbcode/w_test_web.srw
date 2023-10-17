$PBExportHeader$w_test_web.srw
forward
global type w_test_web from window
end type
type cb_2 from commandbutton within w_test_web
end type
type cb_1 from commandbutton within w_test_web
end type
end forward

global type w_test_web from window
integer width = 3168
integer height = 1320
boolean titlebar = true
string title = "Untitled"
boolean controlmenu = true
boolean minbox = true
boolean maxbox = true
boolean resizable = true
long backcolor = 67108864
string icon = "AppIcon!"
boolean center = true
cb_2 cb_2
cb_1 cb_1
end type
global w_test_web w_test_web

on w_test_web.create
this.cb_2=create cb_2
this.cb_1=create cb_1
this.Control[]={this.cb_2,&
this.cb_1}
end on

on w_test_web.destroy
destroy(this.cb_2)
destroy(this.cb_1)
end on

type cb_2 from commandbutton within w_test_web
integer x = 905
integer y = 232
integer width = 457
integer height = 128
integer taborder = 20
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
string text = "按钮二"
end type

event clicked;//
end event

type cb_1 from commandbutton within w_test_web
integer x = 398
integer y = 240
integer width = 457
integer height = 128
integer taborder = 10
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
string text = "按钮一"
end type

event clicked;//messagebox("", cb_1.text)
end event

