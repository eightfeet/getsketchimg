# 这里处理图片

1. npm run rename md70
   运行renmeImg脚本，重命名图片，将下载的图片放置到images下建立文件目录运行npm run rename 【文件夹名】，脚本将文件夹下面的图片文件重命名并拷贝到到renameimages目录下
2. npm run 2json md254
   转化为数据格式,注意手动定义相关参数

   ```javascript
    [
        'Clothes', 
        // 'Body', 
        'Male', 
        'Female', 
        // 'Header', 
        'HandsFeet', 
        // 'Half', 
        // 'Group', 
        // 'Still', 
        // 'Video', 
        // 'Structure'
    ]
   ```
3. 将json转化为项目数据，
   1. 将图片上传到对应的`{"from":"md3"}`中，root/small/下放置缩略图；root/下放置原图
   2. 将json数据放置在sketch/public/data，cd到sketch/public下运行`node nodebuild.js`即可将数据同步到项目中，
   3. sketch中运行 npm run demo 发布项目
