const Koa = require("koa");
const Router = require("koa-router");
const bodyRarser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();

const fs = require("fs");
const path = require("path");
const os = require("os");

app.use(bodyRarser());

const SIGN_URL = "/portal/";
const ifaces = os.networkInterfaces();
const PORT = 3011;
let ipAddress = "0.0.0.0";

Object.keys(ifaces).forEach(ifname => {
  let alias = 0;

  ifaces[ifname].forEach(iface => {
    if ("IPv4" !== ifname.family || ifname.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      ipAddress = iface.address;
    } else {
      ipAddress = iface.address;
    }
    ++alias;
  });
});

// logger

app.use(async (ctx, next) => {
  await next();
  console.log(`${ctx.method} ${ctx.url}`);
});

router
  .all("/", (ctx, next) => {
    const url = `http://${ipAddress}:${PORT}/api/qryList`;
    ctx.body = `
    <h1>url error</h1>
    <p>url 正确姿势如:
        <a href="${url}" target="_blank">${url}</a>
    </p>
    <p>请重试url</p>
    `;
  })
  .all(`${SIGN_URL}(.*)`, async (ctx, next) => {
    await next();
    const apiNames = ctx.request.url.split("?")[0].split("/");
    const apiName = `${apiNames[apiNames.length - 1]}`;
    let body;

    // 文件类型,json没有业务逻辑,js有业务逻辑,优化读取js
    const exts = [".js", ".json"];

    // 通过遍历exts，获取对应的服务端处理逻辑文件是js 或json

    for (let i = 0; i < exts.length; i++) {
      const ext = exts[i];
      const _p = path.resolve(__dirname, "../data", apiName + ext);

      // 判断对应文件是否存在
      if (fs.existsSync(_p)) {
        body =
          ext === ".json"
            ? fs.readFileSync(_p, "utf-8")
            : await require(_p)(ctx);
        break;
      }
    }
    const sleep = () =>
      new Promise(res =>
        setTimeout(() => res(), 10 * Math.floor(Math.random() * 500))
      );
    await sleep();
    ctx.type = "application/json;charset=utf-8";

    if (body) {
      ctx.body = body;
    } else {
      ctx.status = 404;
    }
  });

app.use(router.routes()).use(router.allowedMethods());

const server = app.listen(PORT);

console.log(`server running on ${ipAddress}:${server.address().port}`);
