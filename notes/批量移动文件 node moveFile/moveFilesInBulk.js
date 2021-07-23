var fs = require('fs');
var path = require('path');
 
var rootPath = path.resolve('/Users/xiao/Desktop/1234');

var count = 0;

/* 批量移动文件 */

function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function(err,files) {
    if (err) {
      console.warn(err)
    } else {
      //遍历读取到的文件列表
      files.forEach(function(filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        // Path.extname(file).toLowerCase() === '.js';
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir,function(eror,stats) {
          if (eror) {
            console.log('获取文件stats失败');
          } else {
            var isFile = stats.isFile();//是文件
            var isDir = stats.isDirectory();//是文件夹
            if(isFile){
              console.log('filename',filename);
              console.log('filedir',filedir);
              let destPath = rootPath + '/' + filename;
              console.log('destPath',destPath);
              console.log(++count);
              // 通过重命名移动文件到根目录
              if(path.extname(filename)==='.js'){
                  debugger
              }
            //   fs.rename(filedir, destPath, function (err) {
            //       if (err) { console.log(err); }
            //   });
            }
            if (isDir) {
              fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      });
    }
  });
}

fileDisplay(rootPath);