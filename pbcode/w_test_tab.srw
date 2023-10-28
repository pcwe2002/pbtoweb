$PBExportHeader$w_test_tab.srw
forward
global type w_test_tab from window
end type
type cb_2 from commandbutton within w_test_tab
end type
type tab_1 from tab within w_test_tab
end type
type tabpage_1 from userobject within tab_1
end type
type cb_1 from commandbutton within tabpage_1
end type
type tabpage_1 from userobject within tab_1
cb_1 cb_1
end type
type tab_1 from tab within w_test_tab
tabpage_1 tabpage_1
end type
end forward

global type w_test_tab from window
integer width = 3168
integer height = 1432
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
tab_1 tab_1
end type
global w_test_tab w_test_tab

on w_test_tab.create
this.cb_2=create cb_2
this.tab_1=create tab_1
this.Control[]={this.cb_2,&
this.tab_1}
end on

on w_test_tab.destroy
destroy(this.cb_2)
destroy(this.tab_1)
end on

type cb_2 from commandbutton within w_test_tab
integer x = 101
integer y = 1152
integer width = 457
integer height = 128
integer taborder = 30
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
string text = "窗口按钮"
end type

event clicked;messagebox("","窗口按钮事件")
end event

type tab_1 from tab within w_test_tab
integer x = 91
integer y = 24
integer width = 2944
integer height = 1068
integer taborder = 10
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long backcolor = 67108864
boolean raggedright = true
boolean focusonbuttondown = true
integer selectedtab = 1
tabpage_1 tabpage_1
end type

on tab_1.create
this.tabpage_1=create tabpage_1
this.Control[]={this.tabpage_1}
end on

on tab_1.destroy
destroy(this.tabpage_1)
end on

type tabpage_1 from userobject within tab_1
integer x = 18
integer y = 120
integer width = 2907
integer height = 932
long backcolor = 67108864
string text = "首页"
long tabtextcolor = 33554432
long picturemaskcolor = 536870912
cb_1 cb_1
end type

on tabpage_1.create
this.cb_1=create cb_1
this.Control[]={this.cb_1}
end on

on tabpage_1.destroy
destroy(this.cb_1)
end on

type cb_1 from commandbutton within tabpage_1
integer x = 306
integer y = 228
integer width = 457
integer height = 128
integer taborder = 20
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
string text = "tab按钮"
end type

event clicked;messagebox("","tab按钮事件")
end event

