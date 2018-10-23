var fs = require('fs');
var data = []

var item = function(mdid, id, male){
    return {
        "imgUrl": `${id}-y&980&1470.jpg`,
        "isX": false,
        "isY": true,
        "isClothes": true,
        "isBody": false,
        "isMale": !!male,
        "isFemale": !male,
        "isHeader": true,
        "isHandsFeet": false,
        "mdId": `md${mdid}`,
        "selected": false
    }
};


for (let index = 669; index < 777; index++) {
    if (index >= 751 && index <= 756) {
        data.push(item('43', index, true));
    } else {
        data.push(item('43', index));
    }
    
}

fs.writeFileSync('message.json', JSON.stringify(data));
