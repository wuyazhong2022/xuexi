

   打开浏览器进去网站()

    // launchApp("浏览器");
    sleep(2000);
    var isLogin = false;

    while (!isLogin) {

        if (text("用户管理中心").exists()) {

                
            var learnBtn = desc("前往学习").findOne(3000);

            if (learnBtn != null) {

                     //如果在用户管理中心页面，点击前往学习按钮
                sleep(5000);      
                learnBtn.click();

                    
                isLogin = true;

            } else {

                console.log("请打开浏览器登录账号，开始自动学习1");    
                sleep(1000);

            }
            console.log("已登录，前往学习");    
            sleep(5000);
            if (desc("历年培训").exists()) {
                sleep(2000);  
                console.log("自动学习视频");
                循环看视频()

            } else {
                sleep(2000);  
                console.log("退出循环");
                break;
            }
        }
        sleep(1000);
        toastLog("已复制网址请点击右上角空白处输入框粘贴网址，如遇遮挡可以点击悬浮窗口窗口--最小化，完成输入登录后在右上角按钮打开窗口");
        //setText("https://ptce.gx12333.net/")

        sleep(1000);
        console.log("如果已登录请点击右上角个人用户中心")

        sleep(2000);
        console.log("必须先设置浏览器UA标识为电脑Pc版，在登录账号才会继续，开始自动学习才能走进度");    
        sleep(2000);

    }



    function 打开浏览器进去网站() {
        launchApp("浏览器");
        setClip("https://ptce.gx12333.net/")

        sleep(2000);
        toastLog("已复制网址请点击右上角空白处输入框粘贴网址，如遇遮挡可以点击悬浮窗口窗口--最小化，完成输入登录后在右上角按钮打开窗口");

        sleep(2000);
                toastLog("已复制网址请点击右上角空白处输入框粘贴网址，如遇遮挡可以点击悬浮窗口窗口--最小化，完成输入登录后在右上角按钮打开窗口");

        sleep(2000);
        toastLog("已复制网址请点击右上角空白处输入框粘贴网址，如遇遮挡可以点击悬浮窗口窗口--最小化，完成输入登录后在右上角按钮打开窗口");

        // setClip("https://ptce.gx12333.net/")
        sleep(1000);
        //等待页面加载完成，时间可以根据网速调整

        toastLog("等待页面加载完成");



    }






    function 循环看视频() {

        sleep(2000);
        while (true) {
            // 遍历描述控件，找到开始学习按钮并点击 
            var startButton = desc("开始学习").findOne(1000);
            if (startButton) {
                toastLog(startButton.click());
                toastLog("开始学习")
                //showTime()
                // 等待10秒 
                toastLog("等待播放完成不要离开当前页面");

                // 调用函数
                replayAndExit();

            } else {
                // 如果没有找到开始学习按钮，尝试找到继续学习按钮 

                var continueButton = desc("继续学习").findOne(1000);

                if (continueButton) {

                    log(continueButton.click());
                    toastLog("继续学习")
                    showTime1()
                    // 等待15秒 
                    toastLog("等待播放完成不要离开当前页面")

                    // 调用函数 出现循环播放控件，完成播放
                    replayAndExit();
                } else {
                    // 如果都没有找到，退出循环
                    sleep(2000);
                    toastLog("学习视频已完成，退出循环，学习结束")
                    sleep(2000);
                    break;
                }

                sleep(1000);
                toastLog("学习完1 ");

            }
            toastLog("返回并继续点击开始学习或者找继续学习 ");

            //back();
            sleep(2000);
            // 等待1秒
            className("android.view.View").desc("确定").findOne().click()
            toastLog("点击确定 ");

            sleep(3000);
        }
        sleep(1000);
        toastLog("学习完成 ");

    }



    // 显示5-7分钟随机倒计时气泡
    // // 随机生成5-7分钟 
    function showTime() {
        var showTime = Math.random() * (1) * 60 * 1000 + 1 * 60 * 1000;
        var time = new Date(Date.now() + showTime);
        while (Date.now() < time) {
            // 屏幕显示倒计时气泡 
            console.log(Math.round((time - Date.now()) / 1000) + 's');
            sleep(1000)
            toast(Math.round((time - Date.now()) / 1000) + 's');
            //  sleep(1000);

        }
    }




    // 定义函数
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
                sleep(2000);
                // 点击确定按钮
                var confirmBtn = className("android.widget.Button").text("确定").findOne();
                confirmBtn.click();
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


    // 随机生成5-7分钟 
    function showTime1() {
        var showTime1 = Math.random() * (1) * 60 * 1000 + 7 * 60 * 1000;
        var time = new Date(Date.now() + showTime1);
        while (Date.now() < time) {
            // 屏幕显示倒计时气泡 
            console.log(Math.round((time - Date.now()) / 1000) + 's');
            sleep(1000)
            toast(Math.round((time - Date.now()) / 1000) + 's');
            //  sleep(1000);

        }
    }
