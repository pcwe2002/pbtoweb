# pbtoweb
Convert Powerbuilder UI to web Automatically.

使用说明：
1. 未安装nodejs的可以 https://nodejs.org/zh-cn/download 下载安装
2. 导出pb代码，包括窗口和继承的对象等到一个目录，如示例的pbocde, 如果pb10以下的代码导出后需要用nodepad++ 找到编码转为utf8编码
3. 进入命令行窗口cmd, 进入当前目录输入
node pbtoweb convert pbcode w_test_amis d:/form.js --js
窗口将转化为web窗口form.js

在satweb中显示效果
1. 将生成的form.js放到 server\plugins\web\dist\data\page 目录下面,并运行satserver.exe
2. 浏览器输入 http://127.0.0.1:5555/webui ,如果未配置数据库，请参考http://www.satrda.com/doc/satweb/config.html 中的开始使用配置
3. 在系统管理->菜单管理中随意找一个菜单，点击修改  修改-> 组件路径:amispage, 路由地址为 /data/page/vd.js 并保存。
4. 刷新浏览器进入菜单可以看到效果。参考demo/vd.js 中的事件可以写实现自己的事件，代码基本和pb一样
了解更多satweb可以进入 http://www.satrda.com/doc/satweb/config.html

在amis网站上查看效果
1. 命令行运行以下命令,会导出amis的json文件
node pbtoweb convert pbcode w_test_amis d:/out.json --demo
2. 打开d:/out.json并复制文本
3. 进入amis网站 https://aisuda.bce.baidu.com/amis/zh-CN/components/page, 找一个示例点击编码代码
4. 粘贴就可以