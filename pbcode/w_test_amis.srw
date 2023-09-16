$PBExportHeader$w_test_amis.srw
forward
global type w_test_amis from window
end type
type cb_3 from commandbutton within w_test_amis
end type
type tab_1 from tab within w_test_amis
end type
type tabpage_1 from userobject within tab_1
end type
type dw_1 from datawindow within tabpage_1
end type
type tabpage_1 from userobject within tab_1
dw_1 dw_1
end type
type tabpage_2 from userobject within tab_1
end type
type rb_3 from radiobutton within tabpage_2
end type
type rb_2 from radiobutton within tabpage_2
end type
type rb_1 from radiobutton within tabpage_2
end type
type cbx_2 from checkbox within tabpage_2
end type
type cbx_1 from checkbox within tabpage_2
end type
type ddlb_1 from dropdownlistbox within tabpage_2
end type
type st_2 from statictext within tabpage_2
end type
type em_1 from editmask within tabpage_2
end type
type sle_1 from singlelineedit within tabpage_2
end type
type st_1 from statictext within tabpage_2
end type
type gb_1 from groupbox within tabpage_2
end type
type tabpage_2 from userobject within tab_1
rb_3 rb_3
rb_2 rb_2
rb_1 rb_1
cbx_2 cbx_2
cbx_1 cbx_1
ddlb_1 ddlb_1
st_2 st_2
em_1 em_1
sle_1 sle_1
st_1 st_1
gb_1 gb_1
end type
type tab_1 from tab within w_test_amis
tabpage_1 tabpage_1
tabpage_2 tabpage_2
end type
type cb_2 from commandbutton within w_test_amis
end type
type cb_1 from commandbutton within w_test_amis
end type
end forward

global type w_test_amis from window
integer width = 3237
integer height = 1844
boolean titlebar = true
string title = "Untitled"
boolean controlmenu = true
boolean minbox = true
boolean maxbox = true
boolean resizable = true
long backcolor = 67108864
string icon = "AppIcon!"
boolean center = true
cb_3 cb_3
tab_1 tab_1
cb_2 cb_2
cb_1 cb_1
end type
global w_test_amis w_test_amis

on w_test_amis.create
this.cb_3=create cb_3
this.tab_1=create tab_1
this.cb_2=create cb_2
this.cb_1=create cb_1
this.Control[]={this.cb_3,&
this.tab_1,&
this.cb_2,&
this.cb_1}
end on

on w_test_amis.destroy
destroy(this.cb_3)
destroy(this.tab_1)
destroy(this.cb_2)
destroy(this.cb_1)
end on

event resize;// resize
end event

type cb_3 from commandbutton within w_test_amis
integer x = 1047
integer y = 24
integer width = 457
integer height = 128
integer taborder = 20
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
string text = "弹框提示"
end type

event clicked;long ll_rtn

ll_rtn = MessageBox("提示","选择1?", Information!, YesNo! )
if ll_rtn = 1 then
	tab_1.tabpage_2.cbx_1.checked = true;
	tab_1.tabpage_2.cbx_2.checked = false;
else
	tab_1.tabpage_2.cbx_2.checked = true;
	tab_1.tabpage_2.cbx_1.checked = false;
end if
end event

type tab_1 from tab within w_test_amis
integer x = 73
integer y = 180
integer width = 3067
integer height = 1496
integer taborder = 30
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
tabpage_2 tabpage_2
end type

on tab_1.create
this.tabpage_1=create tabpage_1
this.tabpage_2=create tabpage_2
this.Control[]={this.tabpage_1,&
this.tabpage_2}
end on

on tab_1.destroy
destroy(this.tabpage_1)
destroy(this.tabpage_2)
end on

event selectionchanged;tab_1.tabpage_1.dw_1.retrieve()
end event

type tabpage_1 from userobject within tab_1
integer x = 18
integer y = 120
integer width = 3031
integer height = 1360
long backcolor = 67108864
string text = "第1页"
long tabtextcolor = 33554432
long picturemaskcolor = 536870912
dw_1 dw_1
end type

on tabpage_1.create
this.dw_1=create dw_1
this.Control[]={this.dw_1}
end on

on tabpage_1.destroy
destroy(this.dw_1)
end on

type dw_1 from datawindow within tabpage_1
integer x = 46
integer y = 60
integer width = 2912
integer height = 1260
integer taborder = 30
string title = "none"
string dataobject = "d_test1"
boolean livescroll = true
borderstyle borderstyle = stylelowered!
end type

type tabpage_2 from userobject within tab_1
integer x = 18
integer y = 120
integer width = 3031
integer height = 1360
long backcolor = 67108864
string text = "第2页"
long tabtextcolor = 33554432
long picturemaskcolor = 536870912
rb_3 rb_3
rb_2 rb_2
rb_1 rb_1
cbx_2 cbx_2
cbx_1 cbx_1
ddlb_1 ddlb_1
st_2 st_2
em_1 em_1
sle_1 sle_1
st_1 st_1
gb_1 gb_1
end type

on tabpage_2.create
this.rb_3=create rb_3
this.rb_2=create rb_2
this.rb_1=create rb_1
this.cbx_2=create cbx_2
this.cbx_1=create cbx_1
this.ddlb_1=create ddlb_1
this.st_2=create st_2
this.em_1=create em_1
this.sle_1=create sle_1
this.st_1=create st_1
this.gb_1=create gb_1
this.Control[]={this.rb_3,&
this.rb_2,&
this.rb_1,&
this.cbx_2,&
this.cbx_1,&
this.ddlb_1,&
this.st_2,&
this.em_1,&
this.sle_1,&
this.st_1,&
this.gb_1}
end on

on tabpage_2.destroy
destroy(this.rb_3)
destroy(this.rb_2)
destroy(this.rb_1)
destroy(this.cbx_2)
destroy(this.cbx_1)
destroy(this.ddlb_1)
destroy(this.st_2)
destroy(this.em_1)
destroy(this.sle_1)
destroy(this.st_1)
destroy(this.gb_1)
end on

type rb_3 from radiobutton within tabpage_2
integer x = 1335
integer y = 788
integer width = 457
integer height = 92
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
long backcolor = 67108864
string text = "k2"
end type

type rb_2 from radiobutton within tabpage_2
integer x = 1335
integer y = 648
integer width = 457
integer height = 92
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
long backcolor = 67108864
string text = "k1"
end type

type rb_1 from radiobutton within tabpage_2
integer x = 73
integer y = 812
integer width = 366
integer height = 92
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
long backcolor = 67108864
string text = "none"
end type

type cbx_2 from checkbox within tabpage_2
integer x = 494
integer y = 652
integer width = 457
integer height = 92
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
long backcolor = 67108864
string text = "选项2"
boolean checked = true
end type

type cbx_1 from checkbox within tabpage_2
integer x = 87
integer y = 652
integer width = 457
integer height = 92
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
long backcolor = 67108864
string text = "选项1"
end type

type ddlb_1 from dropdownlistbox within tabpage_2
integer x = 325
integer y = 472
integer width = 837
integer height = 452
integer taborder = 50
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
string item[] = {"中国","美国","日本"}
borderstyle borderstyle = stylelowered!
end type

type st_2 from statictext within tabpage_2
integer x = 87
integer y = 324
integer width = 206
integer height = 72
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
long backcolor = 67108864
string text = "数字"
boolean focusrectangle = false
end type

type em_1 from editmask within tabpage_2
integer x = 325
integer y = 296
integer width = 1573
integer height = 128
integer taborder = 40
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
string text = "2020-1-2"
borderstyle borderstyle = stylelowered!
maskdatatype maskdatatype = datemask!
string mask = "yyyy-mm-dd"
double increment = 1
string minmax = "1~~20"
end type

type sle_1 from singlelineedit within tabpage_2
integer x = 329
integer y = 84
integer width = 942
integer height = 128
integer taborder = 40
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
string text = "1111"
borderstyle borderstyle = stylelowered!
end type

type st_1 from statictext within tabpage_2
integer x = 114
integer y = 112
integer width = 219
integer height = 72
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
long backcolor = 67108864
string text = "演示"
boolean focusrectangle = false
end type

type gb_1 from groupbox within tabpage_2
integer x = 1266
integer y = 512
integer width = 1243
integer height = 564
integer taborder = 60
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
long backcolor = 67108864
string text = "KKKK"
end type

type cb_2 from commandbutton within w_test_amis
integer x = 558
integer y = 24
integer width = 457
integer height = 128
integer taborder = 20
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
string text = "设置"
end type

event clicked;tab_1.tabpage_2.sle_1.text = "amis演示";
end event

type cb_1 from commandbutton within w_test_amis
integer x = 55
integer y = 24
integer width = 457
integer height = 128
integer taborder = 10
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
string text = "检索"
end type

event clicked;tab_1.tabpage_1.dw_1.retrieve()
end event

