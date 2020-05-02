import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import zh_CN from "antd/es/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import configureStore from "common/dist/configureStore";
import App from "./router/app";

// 公共样式
import "./common/styles";
import _default from "../../common/dist/services/qryInfo";

moment.locale("zh-cn");
const store = configureStore.create();

console.log("BUILD_TIME", JSON.stringify(process.env.BUILD_TIME));

const render = (Comp: any) => {
  return ReactDOM.render(
    <Provider store={store}>
      {/* renderEmpty 配置全局空内容 */}
      <ConfigProvider locale={zh_CN}>
        <Comp />
      </ConfigProvider>
    </Provider>,
    document.getElementById("root")
  );
};

// 入口文件
const RENDER_DOM_PATH = "./router/app";
render(App);

if (module.hot) {
  module.hot.accept(RENDER_DOM_PATH, () => {
    const nextApp = require(RENDER_DOM_PATH).default;
    setTimeout(() => render(nextApp));
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

(window as any).abc = () => {
  console.log("object");
};
