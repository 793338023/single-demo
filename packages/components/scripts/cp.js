/**
 * 复制文件
 */
const fs = require("fs-extra");
const path = require("path");
const needCopyFileNames = ["styles.scss", "styles.module.scss", "imgs"];

const fsP = {
  readdir(srcPath) {
    return new Promise((res, rej) => {
      fs.readdir(srcPath, (err, files) => {
        if (err) {
          rej(err);
        } else {
          res(files);
        }
      });
    });
  },
  lstat(p, srcPath) {
    return new Promise((res, rej) => {
      fs.lstat(srcPath, (err, stat) => {
        if (err) {
          rej(err);
        } else {
          res(stat);
        }
      });
    });
  }
};

async function main({ srcPath, distDirPath }) {
  try {
    const files = await fsP.readdir(srcPath);
    files.filter(async fPName => {
      try {
        const fp = path.join(srcPath, fPName);
        const FStat = await fsP.lstat(fp, srcPath);
        if (FStat.isDirectory()) {
          needCopyFileNames.forEach(file => {
            const srcFile = path.join(fp, file);
            const distFile = path.join(distDirPath, fPName, file);

            fs.access(srcFile, err => {
              if (!err) {
                fs.copy(srcFile, distFile, err => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("copy success...");
                  }
                });
              }
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

main({
  srcPath: path.join(__dirname, "../src/components"),
  distDirPath: path.join(__dirname, "../dist")
});
// main({
//   srcPath: path.join(__dirname, "../src/components/Payment/views"),
//   distDirPath: path.join(__dirname, "../dist/Payment/views")
// });
