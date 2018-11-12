var fs = require("fs");
var getPixels = require("get-pixels");

// var fileDirectory = "./images";
// var newfileDirectory = "./newimages";
// if (fs.existsSync(fileDirectory)) {
//   var files = fs.readdirSync(fileDirectory);
//   for (var i = 0; i < files.length; i++) {
//     var fileName = "name" + i;
//     var newFilePath = newfileDirectory + "/" + fileName;
//     fs.rename(filePath, newFilePath, function(err) {
//       if (err) throw err;
//       console.log(fileName + " ok~");
//     });
//   }
// } else {
//   console.log(fileDirectory + "  Not Found!");
// }

getPixels("images/2014050701.jpg", function(err, pixels) {
  if (err) {
    console.log("Bad image path");
    return;
  }
  console.log(pixels);
});
