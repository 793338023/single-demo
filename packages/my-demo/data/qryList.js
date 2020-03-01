// faker mock数据包
//const faker = require("faker")

const { createRespData } = require("../scripts/serverHelper");

module.exports = ctx => {
  return new Promise(res => {
    res(
      createRespData("qryList", [
        {
          dictId: "100",
          dictName: "显示器",
          status: "1"
        },
        {
          dictId: "101",
          dictName: "酷酷酷",
          status: "1"
        },
        {
          dictId: "102",
          dictName: "都哟2",
          status: "0"
        },
        {
          dictId: "103",
          dictName: "系xxx",
          status: "0"
        },
        {
          dictId: "104",
          dictName: "饭否拍拍",
          status: "1"
        }
      ])
    );
  });
};
