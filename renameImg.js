var fs = require("fs");
var getPixels = require("get-pixels");

var arg = (process.argv[2] && process.argv[2].split('-')) || 1;
// var start = parseInt(arg[0], 10) || null;
var start = 1;
var end = parseInt(arg[1], 10) || null;
var subpath = '/' + arg[0];


const makeDir = (dirname) => new Promise((resolve, reject) => {
  fs.mkdir(dirname, function (err) {
    if (err) reject(err);
    resolve()
  })
})

const delDir = (path) => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      //判断是否是文件夹
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        //是文件的话说明是最后一层不需要递归 
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

const init = async () => {
  var fileDirectory = "./images" + subpath;
  var newfileDirectory = "./renameimages" + subpath;
  // 无目标路径时创建目标目录
  if (!fs.existsSync('./renameimages')) await makeDir('./renameimages');
  // 存在目标时删除目标目录
  if (fs.existsSync(newfileDirectory)) delDir(newfileDirectory);
  // 重新创建目标路径
  await makeDir(newfileDirectory)
  // 检查源路径
  if (!fs.existsSync(fileDirectory)) throw new Error(`图片源路径${fileDirectory}不存在`);
  var files = fs.readdirSync(fileDirectory);
  for (var i = 0; i < files.length; i++) {
    var fileName = files[i];
    (function (ind, fname) {
      const firepath = "images" + subpath + '/' + fname;
      if (fname.indexOf('.jpg') < 0 && fname.indexOf('.jpeg') < 0 && fname.indexOf('.png') < 0 && fname.indexOf('.gif')) {
        console.log('非图片类型文件', firepath); return
      };
      
      getPixels((firepath), function (err, pixels) {
        if (err) {
          console.log('获取图像像素失败', firepath);
          console.error(err);
          return false;
        }
        var fileSplit = fname.split('.');
        var type = '.' + fileSplit[fileSplit.length - 1];
        var newName = (start + ind + 1) + '-' + (pixels.shape[0] > pixels.shape[1] ? 'x&' : 'y&') + pixels.shape[0] + '&' + pixels.shape[1];
        newName = newName + type;
        (function (origin, Name) {
          var newFilePath = newfileDirectory + "/" + Name;
          var originPath = fileDirectory + "/" + origin;
          fs.copyFile(originPath, newFilePath, function (err) {
            if (err) {
              console.log(err);
            };
            console.log(Name + " ok~");
          });
        })(fname, newName);
      })

    })(i + 1, fileName);
  }

  console.log(`目录 ${fileDirectory} rename完成 -> ${newfileDirectory}`);

}


init()
return;

fs.mkdir('./renameimages' + subpath, function (err) {
  if (err) {
    console.log(err);
    throw '创建文件目录失败';
  }


  var fileDirectory = "./images" + subpath;
  var newfileDirectory = "./renameimages" + subpath;
  if (fs.existsSync(fileDirectory)) {
    var files = fs.readdirSync(fileDirectory);
    for (var i = 0; i < files.length; i++) {
      var fileName = files[i];
      (function (ind, fname) {
        getPixels(("images" + subpath + '/' + fname), function (err, pixels) {
          if (err) {
            console.log(err);
            console.log("Bad image path");
            console.log("images" + subpath + '/' + fname);
            return false;
          }
          var fileSplit = fname.split('.');
          var type = '.' + fileSplit[fileSplit.length - 1];
          var newName = (start + ind + 1) + '-' + (pixels.shape[0] > pixels.shape[1] ? 'x&' : 'y&') + pixels.shape[0] + '&' + pixels.shape[1];
          newName = newName + type;
          (function (origin, Name) {
            var newFilePath = newfileDirectory + "/" + Name;
            var originPath = fileDirectory + "/" + origin;
            fs.rename(originPath, newFilePath, function (err) {
              if (err) {
                console.log(err);
              };
              console.log(Name + " ok~");
            });
          })(fname, newName);
        })
      })(i + 1, fileName);


    }
  } else {
    console.log(fileDirectory + "  Not Found!");
  }

});
// getPixels("images2 + subpath + '/' 014050701.jpg", function(err, pixels) {
//   if (err) {
//     console.log("Bad image path");
//     return;
//   }
//   console.log(pixels);
// });
