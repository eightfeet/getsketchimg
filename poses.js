const fs = require('fs');

const mdid = "md310";
const poses_id = mdid;
const baseurl = `../poses/${mdid}`;
const poses_name = mdid;
const category = "1";
const gender = "2";
const sub = ["1"];

const build = (second) => {

    const fileDirectory = `./renameimages/${mdid}`;
    const createItem = (file) => ({
        poses_id,
        poses_name,
        sub,
        url: `${baseurl}/${file}`,
        category,
        gender
    })
    
    const files = fs.readdirSync(fileDirectory);
    let data = "";
    for (var index = 0; index < files.length; index++) {
        console.log('写入', files[index]);
        if (files[index] === '.DS_Store') {
            continue;
        }
        data+=JSON.stringify(createItem(files[index]));
    }

    fs.writeFileSync(`poses${mdid}.json`, data);
}


build();