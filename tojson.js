var fs = require('fs');
var data = []

// var start = 2451;
// var end = 2613;
// var mdid = 56;
// var male = false;

var start = 2316;
var end = 2450;
var mdid = 55;
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
