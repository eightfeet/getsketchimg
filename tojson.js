var fs = require('fs');
var data = []

var start = null;
var end = null;

var arg = (process.argv[2] && process.argv[2].split('-')) || 1;
var mdid = parseInt(arg[0], 10) || null;
console.log('mmmmmmm', mdid, parseInt(arg[0], 10));
var male = false;
var isBody = true;

var fileDirectory = `./renameimages/md${mdid}`;

var item = function(isy, img){
    return {
        "imgUrl": `md${mdid}/${img}`,
        "isX": !isy,
        "isY": !!isy,
        "isClothes": isBody !== true ? true : false,
        "isBody": isBody === true ? true : false,
        "isMale": !!male,
        "isFemale": !male,
        "isHeader": false,
        "isHandsFeet": false,
        "isHalf": false,
        "isGroup": false,
        "mdId": `md${mdid}`,
        "selected": false
    }
};

var start = null;
var end = null;

var files = fs.readdirSync(fileDirectory);

for (var index = 0; index < files.length; index++) {
    console.log(555, files[index]);
    if (files[index] === '.DS_Store') {
        continue;
    }
    var element = files[index].split('.')[0].split('-')[1].split('&')[0];
    
    if (index === 0) {
        start = files[index].split('-')[0];
    }
    if (index === 1 && files[0] === '.DS_Store') {
        start = files[index].split('-')[0];
    }
    if (index === files.length - 1) {
        end = files[index].split('-')[0];
    }
    data.push(item(element === 'y', files[index]));
}

fs.writeFileSync(`models${mdid}.json`, JSON.stringify(data));

fs.writeFileSync(`./../sketch-2018/src/data/models${mdid}.json`, JSON.stringify(data));


console.log(`${male ? '男' : '女'}模特 models${mdid}.json is compiled`)
