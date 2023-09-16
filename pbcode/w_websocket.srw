$PBExportHeader$w_websocket.srw
forward
global type w_websocket from window
end type
type cb_4 from commandbutton within w_websocket
end type
type cb_3 from commandbutton within w_websocket
end type
type sle_context from singlelineedit within w_websocket
end type
type st_3 from statictext within w_websocket
end type
type sle_server from singlelineedit within w_websocket
end type
type st_server from statictext within w_websocket
end type
type mle_info from multilineedit within w_websocket
end type
type cb_2 from commandbutton within w_websocket
end type
type cb_1 from commandbutton within w_websocket
end type
type uo_client from u_websocket within w_websocket
end type
end forward

global type w_websocket from window
integer width = 3095
integer height = 1744
boolean titlebar = true
string title = "server"
boolean controlmenu = true
boolean minbox = true
boolean maxbox = true
boolean resizable = true
long backcolor = 67108864
string icon = "AppIcon!"
boolean center = true
cb_4 cb_4
cb_3 cb_3
sle_context sle_context
st_3 st_3
sle_server sle_server
st_server st_server
mle_info mle_info
cb_2 cb_2
cb_1 cb_1
uo_client uo_client
end type
global w_websocket w_websocket

forward prototypes
public subroutine of_append_info (string as_info)
end prototypes

public subroutine of_append_info (string as_info);mle_info.text = mle_info.text + as_info + "~r~n"
mle_info.scroll(mle_info.LineCount ( ))
end subroutine

on w_websocket.create
this.cb_4=create cb_4
this.cb_3=create cb_3
this.sle_context=create sle_context
this.st_3=create st_3
this.sle_server=create sle_server
this.st_server=create st_server
this.mle_info=create mle_info
this.cb_2=create cb_2
this.cb_1=create cb_1
this.uo_client=create uo_client
this.Control[]={this.cb_4,&
this.cb_3,&
this.sle_context,&
this.st_3,&
this.sle_server,&
this.st_server,&
this.mle_info,&
this.cb_2,&
this.cb_1,&
this.uo_client}
end on

on w_websocket.destroy
destroy(this.cb_4)
destroy(this.cb_3)
destroy(this.sle_context)
destroy(this.st_3)
destroy(this.sle_server)
destroy(this.st_server)
destroy(this.mle_info)
destroy(this.cb_2)
destroy(this.cb_1)
destroy(this.uo_client)
end on

event open;sle_server.text = "ws://101.37.151.228:8097/websocket"
end event

type cb_4 from commandbutton within w_websocket
integer x = 2619
integer y = 200
integer width = 352
integer height = 128
integer taborder = 20
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
string text = "清屏"
end type

event clicked;mle_info.text= ""
end event

type cb_3 from commandbutton within w_websocket
integer x = 2651
integer y = 1424
integer width = 352
integer height = 128
integer taborder = 20
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
string text = "发送"
end type

event clicked;uo_client.of_send( sle_context.text)
end event

type sle_context from singlelineedit within w_websocket
integer x = 398
integer y = 1444
integer width = 2199
integer height = 100
integer taborder = 30
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
string text = "内容1"
borderstyle borderstyle = stylelowered!
end type

type st_3 from statictext within w_websocket
integer x = 69
integer y = 1456
integer width = 320
integer height = 72
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
long backcolor = 67108864
string text = "内容："
boolean focusrectangle = false
end type

type sle_server from singlelineedit within w_websocket
integer x = 434
integer y = 32
integer width = 1705
integer height = 100
integer taborder = 10
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
string text = "ws://121.40.165.18:8088"
borderstyle borderstyle = stylelowered!
end type

type st_server from statictext within w_websocket
integer x = 105
integer y = 44
integer width = 320
integer height = 72
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
long backcolor = 67108864
string text = "server："
boolean focusrectangle = false
end type

type mle_info from multilineedit within w_websocket
integer x = 69
integer y = 208
integer width = 2533
integer height = 1180
integer taborder = 10
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
long textcolor = 33554432
boolean hscrollbar = true
boolean vscrollbar = true
borderstyle borderstyle = stylelowered!
end type

type cb_2 from commandbutton within w_websocket
integer x = 2578
integer y = 12
integer width = 393
integer height = 128
integer taborder = 10
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
string text = "停止"
end type

event clicked;long ll_m

ll_m = cpu()
uo_client.of_close()

of_append_info( "退出时间：" + string(cpu() - ll_m))
end event

type cb_1 from commandbutton within w_websocket
integer x = 2190
integer y = 16
integer width = 352
integer height = 128
integer taborder = 10
integer textsize = -12
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Arial"
string text = "打开"
end type

event clicked;uo_client.of_open(sle_server.text)
end event

type uo_client from u_websocket within w_websocket
integer x = 2610
integer y = 396
integer taborder = 10
end type

on uo_client.destroy
call u_websocket::destroy
end on

event ue_msgerror;call super::ue_msgerror;of_append_info("MsgError:" + as_error)
end event

event ue_msgevent;call super::ue_msgevent;of_append_info("接收到内容：" + as_msg)
end event

event ue_msgstate;call super::ue_msgstate;
choose case ai_state
	case STATE_CLOSING
		of_append_info( "MsgState:STATE_CLOSING")
	case STATE_CLOSED
		of_append_info( "MsgState:STATE_CLOSED")
	case STATE_CONNECTING
		of_append_info( "MsgState:STATE_CONNECTING")
	case STATE_OPEN
		of_append_info( "MsgState:STATE_OPEN")
end choose
end event

