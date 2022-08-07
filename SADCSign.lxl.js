//LiteXLoader Dev Helper
//<reference path="c:\/Library/JS/Api.js" /> 

//核心文件与配置文件版本 
var Version = "v1.0"
var configVersion = "v1.0"
//声明日志输出内容
let DefaultLang = {
	"Get_Money": "§2击杀奖励§6{num}§2{money_name}",
	"Lang_Error": "读取语言文件出错！",
	"Cannot_Get_Money": "§b您在§e1小时§b内无法再从此生物中获取{money_name}!",
	"Debug_Killed": "§b[SADCHunter]您杀死了§e{mob_name}",
	"Config_Error": "您的config.json配置异常，已重置",
	"Config_Error_2": "您的mobs.json配置异常，已重置",
	"Update_config": "检测到配置文件非{configVersion}的版本，已重置配置项",
	"Get_NewVersion": "获取到云端版本{version_lastest}，正在更新...",
	"Get_NewVersion_Error": "获取最新版本异常",
	"UpdatePlugin_Successful": "自动更新成功",
	"UpdatePlugin_Error": "自动更新异常",
	"DegbugCommandText": "获取杀死怪物的标准类型名",
	"Debug_Open": "§b[SADCHunter]您打开了此功能",
	"Debug_Close": "§b[SADCHunter]您关闭了此功能",
	"Debug_Help": "§b[SADCHunter]提示\n/getmobid true-打开获取怪物类型名功能\n/getmobid false-关闭获取怪物类型名功能"
}
//配置文件目录生成
function read() {
	let r = file.createDir('plugins/SADCSign')
	//配置文件生成
    // 变量deploy检测配置文件是否存在

	let deploy = file.exists('plugins/SADCSign/config.json');
	if (deploy) {
		try {
			tick = file.readFrom('plugins\\SADCSign\\config.json');
			traab = JSON.parse(tick);
		}
		catch (err) {
			log(DefaultLang.Config_Error)
			setconfig()
			tick = file.readFrom('plugins\\SADCSign\\config.json');
			traab = JSON.parse(tick);
		}
	}
	else {
		setconfig()
		tick = file.readFrom('plugins\\SADCSign\\config.json');
		traab = JSON.parse(tick);
	}
	if (file.exists('plugins/SADCSign/lang/' + traab["语言(language)"] + '.json')) {
		try {
			langraw = file.readFrom('plugins/SADCSign/lang/' + traab["语言(language)"] + '.json');
			lang = JSON.parse(langraw);
		}
		catch(err){
			log("读取语言文件出错！")
			lang = DefaultLang
		}
	}
	else {
		lang = DefaultLang
		setLang()
	}
	if (File.exists('plugins\\SADCSign\\mobs.json') == false) {
		setconfig2()
	}
}
read()