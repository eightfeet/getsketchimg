var fs = require('fs');
var data = []

// var start = 2451;
// var end = 2613;
// var mdid = 56;
// var male = false;

var arg = (process.argv[2] && process.argv[2].split('-')) || 1;
var start = parseInt(arg[0], 10) || null;
var end = parseInt(arg[1], 10) || null;
var mdid = parseInt(arg[2], 10) || null;

var male = true;

var item = function(mdid, id, male){
    return {
        "imgUrl": `${id}-y&980&1470.jpg`,
        "isX": false,
        "isY": true,
        "isClothes": true,
        "isBody": false,
        "isMale": !!male,
        "isFemale": !male,
        "isHeader": false,
        "isHandsFeet": false,
        "isHalf": false,
        "mdId": `md${mdid}`,
        "selected": false
    }
};


for (let index = start; index <= end; index++) {
    data.push(item(mdid, index, male));
}

fs.writeFileSync(`models${start}_${end}.json`, JSON.stringify(data));

console.log(`${male ? '男' : '女'}模特 models${start}_${end}.json is compiled`)
