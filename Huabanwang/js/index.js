(function (window) {
    // 1.调用选项卡
    tab();

    // 4.动态创建元素
    autoCreateImg();

    // 5.瀑布流的布局
    setTimeout(function () {
        waterFull("dom_pull", "box"); // 延迟布局
    }, 200);

    // 7.返回顶部
    // 7.1.定义变量
    var scroll_top = 0, begin = 0, end = 0, timer = null;

    // 适用有两个滚动事件共存
    // 6.监听窗口的滚动(滚动到底部加载图片)
    window.onscroll = function() {
        if(checkWillLoadImage()){
            autoCreateImg();
            waterFull("dom_pull", "box");
        }
    };

    var oldMethod = window.onscroll;
    if(typeof oldMethod == 'function'){
        // 7.2 监听窗口的滚动
        window.onscroll = function(){
            oldMethod.call(this);
            // 7.2.1 获取滚动的高度
            scroll_top = scroll().top;
            // 7.2.2 显示和隐藏
            scroll_top > 1000 ? show($("elevator")) : hide($("elevator"));
            begin = scroll_top;
        }
    }

    // 7.3 监听返回顶部按钮的点击
    $("elevator").onclick = function () {
        // 7.3.1 清除定时器
        clearInterval(timer);

        // 7.3.2 开启缓动动画
        timer = setInterval(function () {
            begin = begin + (end - begin) / 10;
            window.scrollTo(0, begin);

            // 7.3.3 清除定时器
            if(Math.round(begin) === end){
                clearInterval(timer);
            }
        }, 20)
    };

    // 8.登录面板的显示与隐藏
    $("login").onclick = function () {
        $("hb_login").style.display = "block";
    };

    $("close_btn").onclick = function () {
        $("hb_login").style.display = "none";
    };

    // 9.无限轮播广告
    bannerAutoPlay();

})(window);

function bannerAutoPlay() {
    // 1.获取所有的li标签
    var lis = $("slider_banner").getElementsByTagName("li");
    var index = 0;

    // 2.开始定时器
    setInterval(function () {
        // 2.1 改变透明度
        for(var i=0; i<lis.length; i++){
            var singerLi = lis[i];
            buffer(singerLi, {"opacity": 0}, null);
        }
        buffer(lis[index], {"opacity": 1}, null);

        // 2.2 索引++
        index++;
        if(index === lis.length){
            index = 0;
        }
    }, 1500)
}

function autoCreateImg() {
    // 4.1 数据
    var json = [
        {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'images/0.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: 'images/1.jpg'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: 'images/2.jpg'},
        {txt: '很多人不需要再见，只是路过而已。——《彼岸花》', pic: 'images/3.jpg'},
        {txt: '人生最困难的三件事：保守秘密，忘掉所受的创伤，充分利用余暇。——吉罗', pic: 'images/4.jpg'},
        {txt: '有些人是离开后，才会发觉那个人是最喜欢的。——《东邪西毒》', pic: 'images/5.jpg'},
        {txt: '我总是在日暮时分，书影与书影之间，宁静的悲哀里，最想念你。——亦舒', pic: 'images/6.jpg'},
        {txt: '再长的路，一步步地能走完，再短的路，不迈开双脚也无法到达。', pic: 'images/7.jpg'},
        {txt: '哪里会有人喜欢孤独，不过是不喜欢失望。——村上春树', pic: 'images/8.jpg'},
        {txt: '人时已尽，人世很长，我在中间，应当休息。——顾城', pic: 'images/9.jpg'},
        {txt: '信任的深浅，不在于会不会对你笑，而在于愿不愿意在你面前哭。', pic: 'images/10.jpg'},
        {txt: '有一种旅行，不为跋涉千里的向往，只为漫无目的的闲逛，不为人山人海的名胜，只为怡然自乐的街景...', pic: 'images/11.jpg'},
        {txt: '人都会孤独，但唯独他，可以越过这尘世的热闹，一眼明白这时间所有的繁华不过是他身边的过眼云烟。', pic: 'images/12.jpg'},
        {txt: '不乱于心，不困于情。不畏将来，不念过往。如此，安好。', pic: 'images/13.jpg'},
        {txt: '每个人都需要这样一个朋友：当以为自己再也笑不出来的时候，他能让你开怀大笑！', pic: 'images/14.jpg'},
        {txt: '咖啡苦与甜，不在于怎么搅拌，而在于是否放糖；一段伤痛，不在于怎么忘记，而在于是否有勇气重新开始。', pic: 'images/15.jpg'},
        {txt: '其实我不是一定要等你，只是等上了就等不了别人了。——《朝露若颜》', pic: 'images/16.jpg'},
        {txt: '一切都是瞬间，一切都会过去，一切过去了的都会变成亲切地还念。——普希金', pic: 'images/17.jpg'},
        {txt: '多少人曾爱慕你的年轻时的容颜，可知谁愿承受岁月无情的变迁', pic: 'images/18.jpg'},
        {txt: '不在任何东西面前失去自我，哪怕是教条，哪怕是别人的目光，哪怕是爱情。——《成为简·奥斯汀》', pic: 'images/19.jpg'},
        {txt: '你如果认识从前的我，也许你会原谅现在的我。——张爱玲', pic: 'images/20.jpg'},
        {txt: '简约不是少，而是没有多余。足够也不是多，而是刚好你在。', pic: 'images/21.jpg'},
        {txt: '若只是喜欢，何必夸张成爱。——林夕', pic: 'images/22.jpg'},
        {txt: '梦里出现的人，醒来时就该去见她，生活就是这么简单。——《新桥恋人》', pic: 'images/23.jpg'},
        {txt: '与众不同的你是幸运的，何必让自己变得和别人一样。', pic: 'images/24.jpg'},
        {txt: '阳光温热，岁月静好，你还不来，我怎肯老。', pic: 'images/25.jpg'},
        {txt: '一个人知道自己为什么而活，就能忍受任何生活。——尼采', pic: 'images/26.jpg'},
        {txt: '我们已经出发了太久，以至于我们忘了为什么要出发。——纪伯伦', pic: 'images/27.jpg'},
        {txt: '水来，我在水中等你；火来，我在灰烬中等你。——《你是我的独家记忆》', pic: 'images/28.jpg'},
        {txt: '天下就没有偶然，那不过是化了妆的，戴了面具的必然。——钱钟书', pic: 'images/29.jpg'},
    ];

    // 4.2 遍历
    for(var i=0; i<30; i++){
        // 4.3 获取父标签的文本
        var str = $("dom_pull").innerHTML;

        // 4.4 取出图片的地址及文字
        var txt = json[i].txt;
        var pic = json[i].pic;

        // 4.5 创建子标签
        var htmlStr = '<div class="box">' +
                          '<div class="pic">' +
                               '<img src="' + pic +'" alt="">' +
                               '<div class="cover"></div>' +
                            '</div>' +
                            '<p>' + txt +'</p>' +
                            '<div class="btn-box">' +
                                '<a href="" class="collect">采集</a>' +
                                '<a href="" class="like">' +
                                    '<span class="heart"></span>' +
                                '</a></div></div>';

        // 4.6 拼接
        str += htmlStr;
        $("dom_pull").innerHTML = str;

        // 4.7 绑定事件
        var wrapBox = $("dom_pull").getElementsByClassName("box");
        var wrapPic = $("dom_pull").getElementsByClassName("pic");
        for(var j=0; j<wrapBox.length; j++){
            // 采集与收藏图标的显示与隐藏
            wrapBox[j].onmouseover = function () {
                this.childNodes[2].style.display = "block";
            };

            wrapBox[j].onmouseout = function () {
                this.childNodes[2].style.display = "none";
            };

            // 图片蒙版显示与隐藏
            wrapPic[j].onmouseover = function () {
                this.childNodes[1].style.display = "block";
            };

            wrapPic[j].onmouseout = function () {
                this.childNodes[1].style.display = "none";
            };
        }
    }
}

function tab() {
    // 2.获取需要的标签
    var allLis = $("tab_header").getElementsByTagName("li");
    var doms = $("tab_content").getElementsByClassName("dom");
    var lastOne = 0;

    // 3.遍历监听
    for(var i=0; i<allLis.length; i++){
        var li = allLis[i];

        (function (index) {
            li.onmousedown = function () {
                // 3.1 清除样式
                allLis[lastOne].className = "";
                doms[lastOne].style.display = "none";

                // 3.2 设置选中
                this.className = "current";
                doms[index].style.display = "block";

                // 3.3 赋值
                lastOne = index;
            }
        })(i)

    }
}

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}
