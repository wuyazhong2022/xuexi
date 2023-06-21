auto.waitFor(); //mode = "fast"
var delay_time = 3000;
device.wakeUpIfNeeded();

/*****************更新内容弹窗部分*****************/
var storage = storages.create('songgedodo');
// 脚本版本号
var last_version = "V1.0";
var engine_version = "V1.3";
var newest_version = "V1.3";
if (storage.get(engine_version, true)) {
    storage.remove(last_version);
    let gengxin_rows = "（点击取消不再提示）".split(";");
    let is_show = confirm(engine_version + "版更新内容", gengxin_rows.join("\n"));
    if (!is_show) {
        storage.put(engine_version, false);
    }
}
var w = fInit();
// console.setTitle("广西继续教育公需科目学习助手");
// console.show();
fInfo("广西继续教育公需科目学习助手Pro" + newest_version + "脚本初始化");
// 初始化宽高
var [device_w, device_h] = init_wh();
// fInfo("fina:", device_w, device_h);
// OCR初始化，重写内置OCR module

// sleep(2000);
// 自动允许权限进程
threads.start(function() {
    //在新线程执行的代码
    //sleep(500);
    fInfo("开始自动获取截图权限");
    var btn = className("android.widget.Button").textMatches(/允许|立即开始|START NOW/).findOne(5000);
    if (btn) {
        sleep(1000);
        btn.click();
    }
    fInfo("结束获取截图权限");
});
fInfo("请求截图权限");
// 请求截图权限、似乎请求两次会失效
if (!requestScreenCapture(false)) { // false为竖屏方向
    fError('请求截图失败');
    exit();
}
// 防止设备息屏
fInfo("设置屏幕常亮");
device.keepScreenOn(3600 * 1000);
// 下载题库
//fInfo("检测题库更新");
//const update_info = get_tiku_by_http("https://gitcode.net/m0_64980826/songge_tiku/-/raw/master/info.json");
//fInfo("正在加载对战题库......请稍等\n题库版本:" + update_info["tiku_version"]);
//fInfo("如果不动就是正在下载，多等会");


// 设置资源保存路径
files.createWithDirs("/sdcard/广西继续教育公需科目学习助手/");
// 调整音量

if (is_exit) {
    fInfo("运行前重置学习APP");
    exit_app("广西继续教育公需科目");
    sleep(1500);
}
// 检测地理位置权限代码，出现就点掉
fInfo("开始位置权限弹窗检测");
var nolocate_thread = threads.start(function() {
    //在新线程执行的代码
    id("title_text").textContains("地理位置").waitFor();
    fInfo("检测到位置权限弹窗");
    sleep(1000);
    text("暂不开启").findOne().click();
    fInfo("已关闭定位");
});
fInfo("跳转到浏览器打开网站");
fClear();
打开浏览器进去网站()
sleep(2000);

var isLogin = false;

while (!isLogin) {

    if (text("【返回个人中心】").findOne(2000)) {  
        //fInfo("已登录，进入用户中心");   
        className("android.widget.TextView").text("【返回个人中心】").findOne().click() 
    } else {
        if (text("用户管理中心").exists())
            fInfo("已登录，前往学习"); 
        sleep(2000);     
        var learnBtn = desc("前往学习").findOne(2000);

        if (learnBtn != null) {

                 //如果在用户管理中心页面，点击前往学习按钮
               
            learnBtn.click();
            sleep(1000);       
            isLogin = true;

        } else {

            fInfo("登录账号，开始自动学习");    
            sleep(1000);

        } 
        for (var i = 1; i <= 3; i++) {
            if (desc("历年培训").exists()) {
                sleep(2000);
                fInfo("检测视频是否学完");
                循环看视频();
                break; // 跳出for循环
            } else if (i < 3) {
                sleep(2000); // 等待6秒再检测
                continue; // 跳过下面的代码，继续循环判断
            } else {
                sleep(2000);
                //fInfo("回到个人用户中心，重新启动学习助手");
                break; // 跳出for循环
            }
        }
    }
    sleep(1000);
    fInfo("登录账号才会继续，开始自动学习");    
    sleep(2000);
    fClear();
}
// 查找指定描述文本的控件，并返回找到的控件对象
function findControlByDesc(descText) {
    var maxRetry = 99999; // 修改为非常大的值，达到不超时的目的
    var interval = 2000;

    for (var i = 0; i < maxRetry; i++) {
        var control = text(descText).findOne();
        if (control != null) {
            return control;
        }
        sleep(interval);
    }

    return null; // 找不到对应控件则返回null
}









function 打开浏览器进去网站() {
    //launchApp("浏览器");
    // 打开浏览器
    app.startActivity({
        action: "android.intent.action.VIEW",
        flags: ["activity_new_task"],
        data: "https://ptce.gx12333.net/"
    });

    // 等待3秒，让浏览器加载完毕
    sleep(3000);


    // 查找是否存在文本为"学习报名"的控件
    // 循环检测是否存在文本为"学习报名"的控件
    while (true) {
        var studySignUp = text("ptce.gx12333.net/waplogin").findOne(2000);

        // 如果存在，则切换UA访问源
        if (studySignUp != null) {
            fInfo("切换UA访问源");
           // log("切换UA访问源");
            // 点击更多按钮
           //找到 "更新浏览器版本" 控件并点击
var updateBtn = desc("更新浏览器版本").findOne(2000);
if (updateBtn) {
    updateBtn.click();
}

// 找到 "更多" 控件并点击
var moreBtn = desc("更多").findOne(2000);
if (moreBtn) {
    moreBtn.click();
}
sleep(1000);
            // 点击工具箱按钮
            className("android.widget.Button").text("工具箱").findOne().click();
sleep(1000);
            // 点击访问电脑版按钮
            className("android.widget.Button").text("访问电脑版").findOne().click();

            // 等待页面加载
            sleep(1000);
        }
        fInfo("已是pc电脑端");
        break;

    } // 加上适当的延迟时间，以便持续检测

}



//封装成函数

function findAndClickButton(keywords) {

    sleep(3000)


    let img = captureScreen()

    let start = new Date()

    let result = gmlkit.ocr(img, "zh")

    toastLog('OCR识别耗时：' + (new Date() - start) + 'ms')

    let btn = null

    for (let i = 0; i < keywords.length; i++) {

            
        btn = result.find(3, e => e.text == keywords[i])

            
        if (btn) {

                
            click(btn.bounds)

                
            break;

                
        }

    }
}

sleep(500)

img.recycle()

// 点击控件范围内的随机坐标
function clickRandomPoint(control) {
    // 获取控件的坐标范围
    var bounds = control.bounds()
    // 随机生成一个坐标
    var x = random(bounds.left, bounds.right)
    var y = random(bounds.top, bounds.bottom)
    // 点击随机坐标
    click(x, y);
    fInfo(x, y);
}
fClear();





function 循环看视频() {

    sleep(4000);
    while (true) {
        // 遍历描述控件，找到开始学习按钮并点击 
        var startButton = desc("开始学习").findOne(1000);
        if (startButton) {
            fInfo(startButton.click());
            fInfo("开始学习")
            sleep(3000);
            fInfo("等待播放完成不要离开当前页面");
            sleep(2000);
            // 调用函数
            replayAndExit();

        } else {
            // 如果没有找到开始学习按钮，尝试找到继续学习按钮 

            var continueButton = desc("继续学习").findOne(1000);

            if (continueButton) {

                log(continueButton.click());
                fInfo("继续学习")
                sleep(2000);
                // 等待15秒 
                fInfo("等待播放完成不要离开当前页面")

                // 调用函数 出现循环播放控件，完成播放
                replayAndExit();
                fClear();
            } else {
                // 如果都没有找到，退出循环
                sleep(2000);
                fInfo("学习视频已完成，退出循环，学习结束")
                sleep(2000);
                break;
            }

            sleep(1000);
            fInfo("没有开始学习了，开始找继续学习 ");

        }
        fInfo("返回到视频列表页面 ");

        sleep(2000);
        // 等待1秒
        className("android.view.View").desc("确定").findOne().click()
        fInfo("点击确定 ");
        sleep(2000);

    }
    sleep(1000);
    fInfo("学习完成 ");
    // 循环结束后关闭控制台

    // console.hide();

    // 退出脚本

    exit();
}



// 显示30-50秒随机倒计时气泡


function showTime() {

    var showTime = Math.random() * (1) * 60 * 1000 + 10 * 1000;

    var time = new Date(Date.now() + showTime);

    while (Date.now() < time) {

        // 屏幕显示倒计时气泡

        fInfo(Math.round((time - Date.now()) / 1000) + 's');

        sleep(1000)
        fClear();

    }

}



// 定义函数// 循环找到text为"Replay"的控件，找到了说明播放完成
// 定义函数// 循环找到text为"Replay"的控件，找到了说明播放完成
function replayAndExit() {
    // 初始化计数器 
    var count = 0;
    // 循环找到text为"Replay"的控件
    while (true) {


        var replayBtn = text("Replay").findOne();
        if (replayBtn != null) {
            //// 找到控件后输出计数器的值并退出循环 
            console.log("找到播放控件，共循环找控件 " + count + " 次");

            showTime()
            // 点击退出课程按钮
            var exitBtn = className("android.widget.Button").text("退出课程").findOne();
            exitBtn.click();
            sleep(4000);
            // 点击确定按钮
            fInfo("检测确定提示弹窗");
            if (text("确定").findOne(1500)) {
                text("确定").findOne().click();
                fInfo("检测到温馨提示并已关闭");
            }

            fInfo("检测温知道了提示弹窗");
            if (text("知道了").findOne(1500)) {
                text("知道了").findOne().click();
                fInfo("检测到温馨提示并已关闭");
            }
            // 执行完毕后退出函数
            return;
        }
        // 如果没有找到，则等待1秒后重新找
        sleep(1000);
        // 计数器自增 
        count++;
        console.log("找到播放控件，共循环找控件 " + count + " 次");
    }
}




var is_exit = ("is_exit", false);


function google_ocr_api(img) {
    console.fInfo('GoogleMLKit文字识别中');
    let list = JSON.parse(JSON.stringify(gmlkit.ocr(img, "zh").toArray(3))); // 识别文字，并得到results
    let eps = 30; // 坐标误差
    for (
        var i = 0; i < list.length; i++ // 选择排序对上下排序,复杂度O(N²)但一般list的长度较短只需几十次运算
    ) {
        for (var j = i + 1; j < list.length; j++) {
            if (list[i]['bounds']['bottom'] > list[j]['bounds']['bottom']) {
                var tmp = list[i];
                list[i] = list[j];
                list[j] = tmp;
            }
        }
    }

    for (
        var i = 0; i < list.length; i++ // 在上下排序完成后，进行左右排序
    ) {
        for (var j = i + 1; j < list.length; j++) {
            // 由于上下坐标并不绝对，采用误差eps
            if (
                Math.abs(list[i]['bounds']['bottom'] - list[j]['bounds']['bottom']) <
                eps &&
                list[i]['bounds']['left'] > list[j]['bounds']['left']
            ) {
                var tmp = list[i];
                list[i] = list[j];
                list[j] = tmp;
            }
        }
    }
    let res = '';
    for (var i = 0; i < list.length; i++) {
        res += list[i]['text'];
    }
    list = null;
    return res;
}

function paddle_ocr_api() {
    console.fInfo('PaddleOCR文字识别中');
    let list = JSON.parse(JSON.stringify(paddle.ocr(arguments[0]))); // 识别文字，并得到results
    let eps = 30; // 坐标误差
    if (arguments.length >= 2) eps = arguments[1];
    for (
        var i = 0; i < list.length; i++ // 选择排序对上下排序,复杂度O(N²)但一般list的长度较短只需几十次运算
    ) {
        for (var j = i + 1; j < list.length; j++) {
            if (list[i]['bounds']['bottom'] > list[j]['bounds']['bottom']) {
                var tmp = list[i];
                list[i] = list[j];
                list[j] = tmp;
            }
        }
    }

    for (
        var i = 0; i < list.length; i++ // 在上下排序完成后，进行左右排序
    ) {
        for (var j = i + 1; j < list.length; j++) {
            // 由于上下坐标并不绝对，采用误差eps
            if (
                Math.abs(list[i]['bounds']['bottom'] - list[j]['bounds']['bottom']) <
                eps &&
                list[i]['bounds']['left'] > list[j]['bounds']['left']
            ) {
                var tmp = list[i];
                list[i] = list[j];
                list[j] = tmp;
            }
        }
    }
    let res = '';
    for (var i = 0; i < list.length; i++) {
        res += list[i]['text'];
    }
    list = null;
    return res;
}
/**
if (fast_mode) {
  auto.setMode("fast");
}
events.observeToast();
sleep(delay_time);*/






// 模拟随机时间0.5-3秒，后期可以用户自定义
function ran_sleep() {
    return sleep(random(1000, delay_time));
}





// 屏幕宽高、方向初始化
function init_wh() {
    fInfo("屏幕方向检测");
    fInfo(device.width + "*" + device.height);
    var device_w = depth(0).findOne().bounds().width();
    var device_h = depth(0).findOne().bounds().height();
    fInfo(device_w + "*" + device_h);
    if (device.width == device_h && device.height == device_w) {
        fError("设备屏幕方向检测为横向，后续运行很可能会报错，建议调整后重新运行脚本");
        sleep(10000);
    } else if (device.width == 0 || device.height == 0) {
        fError("识别不出设备宽高，建议重启强国助手后重新运行脚本");
        sleep(10000);
    }
    return [device_w, device_h]
}

// 尝试成功点击
function real_click(obj) {
    for (let i = 1; i <= 3; i++) {
        if (obj.click()) {
            fInfo("real click: true");
            return true;
        }
        sleep(300);
    }
    console.warn("控件无法正常点击：", obj);
    fInfo("尝试再次点击");
    click(obj.bounds().centerX(), obj.bounds().centerY());
    return false;
}

// 测试ocr功能
function ocr_test() {
    if (Number(ocr_maxtime)) {
        var test_limit = Number(ocr_maxtime);
    } else {
        var test_limit = 5000;
    }
    try {
        fInfo("测试ocr功能，开始截图");
        let img_test = captureScreen();
        img_test = images.clip(img_test, 0, 100, device_w, 250);
        fInfo("开始识别");
        //console.time("OCR识别结束");
        let begin = new Date();

        if (ocr_choice == 0) {
            let test_txt = google_ocr_api(img_test);
        } else if (ocr_choice == 1) {
            let test_txt = paddle_ocr_api(img_test);
        } else {
            let test_txt = ocr.recognizeText(img_test);
        }
        //console.timeEnd("OCR识别结束");
        let end = new Date();
        let test_time = end - begin;
        fInfo("OCR识别结束:" + test_time + "ms");
        if (test_time > test_limit) {
            fError("OCR识别过慢(>" + test_limit + "ms)，已跳过多人对战，可在配置中设置跳过阈值");
            fError("如偶然变慢，可能为无障碍服务抽风，建议重启强国助手后重试");
            sleep(3000);
            return false
        } else {
            fInfo("OCR功能正常");
            img_test.recycle();
            return true;
        }
    } catch (e) {
        fError(e + "：ocr功能异常，退出脚本");
        exit();
        return false;
    }
}




// 强行退出应用名称
function exit_app(name) {
    // 
    fInfo("尝试结束" + name + "APP");
    var packageName = getPackageName(name);
    if (!packageName) {
        if (getAppName(name)) {
            packageName = name;
        } else {
            return false;
        }
    }
    fInfo("打开应用设置界面");
    app.openAppSetting(packageName);
    var appName = app.getAppName(packageName);
    //fInfo(appName);
    fInfo("等待加载界面")
    //textMatches(/应用信息|应用详情/).findOne(5000);
    text(appName).findOne(5000);
    sleep(1500);
    fInfo("查找结束按钮")
    //let stop = textMatches(/(^强行.*|.*停止$|^结束.*)/).packageNameMatches(/.*settings.*|.*securitycenter.*/).findOne();
    let stop = textMatches(/(强.停止$|.*停止$|结束运行|停止运行|[Ff][Oo][Rr][Cc][Ee] [Ss][Tt][Oo][Pp])/).findOne();
    fInfo("stop:", stop.enabled())
    if (stop.enabled()) {
        //fInfo("click:", stop.click());
        real_click(stop);
        sleep(1000);
        fInfo("等待确认弹框")
        //let sure = textMatches(/(确定|^强行.*|.*停止$)/).packageNameMatches(/.*settings.*|.*securitycenter.*/).clickable().findOne();
        let sure = textMatches(/(确定|.*停止.*|[Ff][Oo][Rr][Cc][Ee] [Ss][Tt][Oo][Pp]|O[Kk])/).clickable().findOne(1500);
        if (!sure) {
            fInfo(appName + "应用已关闭");
            back();
            return false;
        }
        fInfo("sure click:", sure.click());
        fInfo(appName + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        fInfo(appName + "应用不能被正常关闭或不在后台运行");
        sleep(1000);
        back();
    }
    return true;
}

// 登录
function fInfoin(username, pwd) {
    var begin_obj = idMatches(/.*comm_head_xuexi_mine|.*btn_next/).findOne();
    if (begin_obj.text() == "登录") {
        fInfo("查找ab");
        let a = className("EditText").id("et_phone_input").findOne();
        let b = className("EditText").id("et_pwd_fInfoin").findOne();
        a.setText(username);
        sleep(1000);
        b.setText(pwd);
        sleep(1000);
        begin_obj.click();
        sleep(3000);
        let packageName = getPackageName('广西继续教育公需科目');
        if (currentPackage() != packageName) {
            fInfo("检测到弹窗，尝试返回");
            if (textMatches(/取消/).exists()) {
                textMatches(/取消/).findOne().click();
            } else {
                back();
            }
        }
    }
}





function winReshow() {
    for (i = 0; i < 4; i++) {
        recents();
        sleep(1000);
    }
}



function displayProp(obj) {
    var names = "";
    for (var name in obj) {
        names += name + ": " + obj[name] + ", ";
    }
    fInfo(names);
}

/*******************悬浮窗*******************/
function fInit() {
    // ScrollView下只能有一个子布局
    var w = floaty.rawWindow(
        <card cardCornerRadius='8dp' alpha="0.8">
            <vertical>
                <horizontal bg='#FF000000' padding='10 5'>
                    <text id='version' textColor="#FFFFFF" textSize="18dip">广西继续教育公需科目学习助手+</text>
                    <text id='title' h="*" textColor="#FFFFFF" textSize="13dip" layout_weight="1" gravity="top|right">
                    </text>
                </horizontal>
                <ScrollView>
                    <vertical bg='#AA000000' id='container' minHeight='20' gravity='center'>
                    </vertical>
                </ScrollView>
            </vertical>
            <relative  gravity="right|bottom">
                <text id="username" textColor="#FFFFFF" textSize="12dip" padding='5 0'>
                </text>
            </relative>
        </card>
    );
    ui.run(function() {
        //w.title.setFocusable(true);
        w.version.setText("广西继续教育公需科目学习助手+" + newest_version);
    });
    w.setSize(720, -2);
    w.setPosition(10, 10);
    w.setTouchable(false);
    return w;
}

function fSet(id, txt) {
    ui.run(function() {
        w.findView(id).setText(txt);
    });
}

function fInfo(str) {
    ui.run(function() {
        let textView = ui.inflate(
            <text id="info" maxLines="2" textColor="#7CFC00" textSize="15dip" padding='5 0'>
                    </text>, w.container);
        textView.setText(str.toString());
        w.container.addView(textView);
    });
    console.info(str);
}

function fError(str) {
    ui.run(function() {
        let textView = ui.inflate(
            <text id="error" maxLines="2" textColor="#FF0000" textSize="15dip" padding='5 0'>
                    </text>, w.container);
        textView.setText(str.toString());
        w.container.addView(textView);
    });
    console.error(str);
}

function fTips(str) {
    ui.run(function() {
        let textView = ui.inflate(
            <text id="tips" maxLines="2" textColor="#FFFF00" textSize="15dip" padding='5 0'>
                    </text>, w.container);
        textView.setText(str.toString());
        w.container.addView(textView);
    });
    console.info(str);
}

function fClear() {
    ui.run(function() {
        w.container.removeAllViews();
    });
}

function fRefocus() {
    threads.start(function() {
        ui.run(function() {
            w.requestFocus();
            w.title.requestFocus();
            ui.post(function() {
                w.title.clearFocus();
                w.disableFocus();
            }, 200);
        });
    });
    sleep(500);
}









/*****************结束后配置*****************/
//console.show();
// console.clear();
fInfo("已全部结束");
// 调回原始音量

// 取消屏幕常亮
fInfo("取消屏幕常亮");
device.cancelKeepingAwake();
// exit_app("学习强国");
// if (email) {
//   send_email(email);
// }
// 震动提示
device.vibrate(500);
fInfo("十秒后关闭悬浮窗");
device.cancelVibration();
sleep(10000);
console.hide();
home();
exit();
