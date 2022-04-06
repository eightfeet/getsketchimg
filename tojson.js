var fs = require('fs');
var data = []

var start = null;
var end = null;

var arg = (process.argv[2] && process.argv[2].split('-')) || 1;
var mdid = parseInt(arg[0].replace('md', ''), 10) || null;

var male = false;
var isBody = false;

var fileDirectory = `./renameimages/md${mdid}`;
console.log('文件目录', mdid);

var item = function (isy, img) {
    const createItem = {
        "imgUrl": `md${mdid}/${img}`,
        "mdId": `md${mdid}`,
        "from": "md5",
        "tags": [],
    }
    createItem.tags.push(!!isy ? 'Y' : 'X');

    createItem.tags = [
        ...createItem.tags,
        // 'Clothes',
        // 'Body', 
        // 'Male',
        // 'Female',
        'Cartoon', // 卡通
        'LineDrawing', // 线描
        // 'Header', // 肖像
        // 'HandsFeet', // 手、脚
        // 'Half', // 半身
        // 'Group', // 组合
        // 'Still', // 静物
        // 'Video', // 视频
        // 'Structure' // 结构
    ];
    return createItem
};

var start = null;
var end = null;

var files = fs.readdirSync(fileDirectory);

for (var index = 0; index < files.length; index++) {
    console.log('写入', files[index]);
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

// fs.writeFileSync(`./../sketch-2018/src/data/models${mdid}.json`, JSON.stringify(data));


console.log(`${male ? '男' : '女'}模特 models${mdid}.json is compiled`)
