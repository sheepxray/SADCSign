//LiteXLoader Dev Helper
/// <reference path="c:\/Library/JS/Api.js" /> 
//核心文件与配置文件版本 
var Version = "v1.0"
var configVersion = "v1.0"
//声明日志输出内容
let DefaultLang = {
	"Lang_Error": "读取语言文件出错！",
	"Config_Error": "您的config.json配置异常，已重置",
	"Update_config": "检测到配置文件非{configVersion}的版本，已重置配置项",
	"Get_NewVersion": "获取到云端版本{version_lastest}，正在更新...",
	"Get_NewVersion_Error": "获取最新版本异常",
	"UpdatePlugin_Successful": "自动更新成功",
	"UpdatePlugin_Error": "自动更新异常",
	"Debug_Open": "§b[SADCSign]您打开了此功能",
	"Debug_Close": "§b[SADCSign]您关闭了此功能",
	"Reward_Error":"reward.json读取异常，已重置"
}
//配置文件目录生成
function read() {
	let r = file.createDir('plugins/SADCSign')
	//配置文件生成
    // 变量deploy检测配置文件是否存在
    // 定义常量tick(Json格式)后转义为JavaScript对象traab
    // try正常后直接继续运行 转义失败由catch函数抓错然后重置配置文件并输出
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
    //为flase值直接重置并创建再次读取配置文件
	else {
		setconfig()
		tick = file.readFrom('plugins\\SADCSign\\config.json');
		traab = JSON.parse(tick);
	}
    //判断配置文件的语言选项对应文件是否存在
	let rewardtest = file.exists('plugins/SADCSign/reward.json');
	if(rewardtest){
		try{
			rewardtestA = file.readFrom('plugins\\SADCSign\\reward.json');
			rewardtestB = JSON.parse(rewardtestA);
		}
		catch(err){
			log("读取语言文件出错！")
			lang = DefaultLang
		}
	}

}
read()
//重置配置文件具体内容
function setconfig() {
	let dataccq = {"是否开启插件":true "配置文件版本号": configVersion, "自动更新": true, "经济类型(请选择score或llmoney)": "score"};
	let datacaa = JSON.stringify(dataccq, null, "\t");
	file.writeTo('plugins\\SADCSign\\config.json', datacaa);
}
function setReward() {
	let rewardA = { "周一":114514 };
	let rewardB = JSON.stringify(rewardA,null,"\t");
	file.writeTo('plugins\\SADCSign\\reward.json', rewardB);
}
//配置文件不对应立即重置最新版
if (traab["配置文件版本号"] != configVersion) {
	setconfig()
	setTimeout(function () {
		log(lang.Update_config.replace("{configVersion}", configVersion))
	}, 8000)
	read()
}
//自动更新模块（
if (traab["自动更新"] == true) {
	network.httpGet('https://gitee.com/sheepxray/SADCSign/raw/main/Version.json', function (st, dat) {
		if (st == 200) {
			let version_lastest = JSON.parse(dat).version
			if (version_lastest != Version) {
				log(lang.Get_NewVersion.replace("{version_lastest}", version_lastest))
				network.httpGet('https://gitee.com/sheepxray/SADCSign/raw/main/SADCSign.lxl.js', function (st2, dat2) {
					if (st2 == 200) {
						let plugin = dat2.replace(/\r/g, '');
						file.writeTo("plugins/SADCSign.js", plugin)
						log(lang.UpdatePlugin_Successful)
						mc.runcmdEx("lxl reload SADCSign.js")
					}
					else {
						log(lang.UpdatePlugin_Error)
					}
				})
			}
		}
		else {
			log(lang.Get_NewVersion_Error)
		}
	})
}
//TODO:支持每日签到固定奖励编辑
//TODO:周一到周日可以自定义
//TODO:游戏内配置签到获取内容

//登陆主逻辑
function signol(pl){
	datacaa.reload()
	var tm = system.getTimeObj()
    var date = tm.Y + "-" + tm.M + "-" + tm.D
	var mainOFFON = traab.get("是否开启插件")


}