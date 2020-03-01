module.exports = {
  createRespData(id, body, header = {}, others = {}) {
    const t = Date.now();
    return {
      ...{
        code: "1",
        message: "错误",
        ...header,
        ...others
      },
      body
    };
  }
};
