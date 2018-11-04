// http://www.ms211.com/zhaopian/daishounv.htm
//依赖模块

var start = 167;
var end = 178;
var finder = '20140507';

var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');

var dir = './images';

//创建目录
mkdirp(dir, function (err) {
    if (err) {
        console.log(err);
    }
});

//下载方法
var download = function (uploaddate, index) {
    var baseUrl = `http://www.ms211.com/zhaopian2/zuozinv/${uploaddate}${index}.jpg`;
    console.log('开始下载', baseUrl)
    var write = fs.createWriteStream(dir + "/" + `${uploaddate}${index}.jpg`);
    request
        .head(baseUrl, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                request(baseUrl).pipe(write);
            } else {
                console.log('连接失败');
            }
        });
    write.on('finish', function(){
        console.log(`${index}.jpg`, '下载完成！');
    })
};

//发送请求
// var requestUrl = function(url, name){
//     request(url, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             var $ = cheerio.load(body);
//             $('.cnei img').each(function () {
//                 var src = $(this).attr('src');
//                 console.log('正在下载' + name + src);
//                 download(src, dir, name + src.substr(-4, 4));
//                 console.log('下载完成');
//             });
//         }
//     });
// }

// var baseUrl = 'http://www.ms211.com/zhaopian2/daishounv/20140402125.jpg';

// for (let index = 0; index < 158; index++) {
//     var ind = index + 1;
//     if (ind < 10) {
//         ind = '0' + ind
//     }
//     download('20140402', ind);
// }

var ind = start;
var loop = function() {
    if (ind < end) {
        setTimeout(function(){
            ind++;
            download(finder, ind < 10 ? `0${ind}` : ind);
            loop();
        }, 5000);
    }
}
loop();
// var textArr = text.split('');
// var lengthText = textArr.length;
// var ind = 0;

// var loop = function() {
//     if (ind < lengthText) {
//         setTimeout(function(){
//             ind++;
//             loop();
//         }, 1000);
//     }
//     const url = `http://www.zhihuishan.com/bishun-search-${encodeURIComponent(textArr[ind])}.html`;
//     requestUrl(url, textArr[ind]);
// }
// loop();
