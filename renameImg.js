var fs = require("fs");
var getPixels = require("get-pixels");

var arg = (process.argv[2] && process.argv[2].split('-')) || 1;
var start = parseInt(arg[0], 10) || null;
var end = parseInt(arg[1], 10) || null;


var fileDirectory = "./images";
var newfileDirectory = "./renameimages";
if (fs.existsSync(fileDirectory)) {
  var files = fs.readdirSync(fileDirectory);
  for (var i = 0; i < files.length; i++) {
    var fileName = files[i];
    (function(ind, fname){
      getPixels(("images/"+fileName), function(err, pixels) {
        if (err) {
          console.log(err);
          console.log("Bad image path");
          console.log("images/"+fileName);
          return false;
        }
        var type = fileName.substr(-4, 4);
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

// getPixels("images/2014050701.jpg", function(err, pixels) {
//   if (err) {
//     console.log("Bad image path");
//     return;
//   }
//   console.log(pixels);
// });
