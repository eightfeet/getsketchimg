var fs = require("fs");
var getPixels = require("get-pixels");

var arg = (process.argv[2] && process.argv[2].split('-')) || 1;
// var start = parseInt(arg[0], 10) || null;
var start = 1;
var end = parseInt(arg[1], 10) || null;
var subpath = '/' + arg[0];

fs.mkdir('./renameimages'+subpath, function(err){
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
      (function(ind, fname){
        getPixels(("images" + subpath + '/' +fname), function(err, pixels) {
          if (err) {
            console.log(err);
            console.log("Bad image path");
            console.log("images" + subpath + '/' +fname);
            return false;
          }
          var type = fname.substr(-4, 4);
          var newName = (start + ind + 1) + '-' + (pixels.shape[0] > pixels.shape[1] ? 'x&' : 'y&') + pixels.shape[0] + '&' + pixels.shape[1];
          newName = newName + type;
          (function(origin, Name){
            var newFilePath = newfileDirectory + "/" + Name;
            var originPath = fileDirectory + "/" + origin;
            fs.rename(originPath, newFilePath, function(err) {
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
