var fs = require('fs');
var data = []

var start = null;
var end = null;

var arg = (process.argv[2] && process.argv[2].split('-')) || 1;
var mdid = parseInt(arg[1], 10) || null;

var male = null;
var isBody = true;

var fileDirectory = './renameimages';

var item = function(isy, img){
    return {
        "imgUrl": img,
        "isX": !isy,
        "isY": !!isy,
        "isClothes": isBody !== true ? true : false,
        "isBody": isBody === true ? true : false,
        "isMale": false,
        "isFemale": false,
        "isHeader": false,
        "isHandsFeet": false,
        "isHalf": false,
        "isGroup": true,
        "mdId": `md${mdid}`,
        "selected": false
    }
};

var start = null;
var end = null;

var files = fs.readdirSync(fileDirectory);

for (var index = 0; index < files.length; index++) {
    var element = files[index].split('.')[0].split('-')[1].split('&')[0];
    if (index === 0) {
        start = files[index].split('-')[0];
    }
    if (index === files.length - 1) {
        end = files[index].split('-')[0];
    }
    data.push(item(element === 'y', files[index]));
}

fs.writeFileSync(`models${start}_${end}.json`, JSON.stringify(data));

console.log(`${male ? '男' : '女'}模特 models${start}_${end}.json is compiled`)
