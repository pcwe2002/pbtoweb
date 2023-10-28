
(function(root) {
    root = root || global
    
// 补充未实现的控件,可以自己添加代码中的控件

class n_resizeattrib extends multilineedit {
  _className = 'n_resizeattrib'
}
root.n_resizeattrib = n_resizeattrib;
  

class eon_appeon_resize extends multilineedit {
  _className = 'eon_appeon_resize'
}
root.eon_appeon_resize = eon_appeon_resize;
  

class uo_webbrowser extends multilineedit {
  _className = 'uo_webbrowser'
}
root.uo_webbrowser = uo_webbrowser;
  

})(typeof window !== "undefined" ? window : null); 
