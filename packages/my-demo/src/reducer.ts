import { combineReducers } from "redux";
import { staticReducers } from "common/dist/configureStore";
const req = require.context("./pages", true, /index.ts$/);
let reducers: { [name: string]: any } = {};

req.keys().forEach(path => {
  if (~path.indexOf("reducer/index.ts")) {
    const itemReducer = req(path).default;
    if (typeof itemReducer === "function") {
      let paths = path.split("/");
      let itemName = paths[paths.indexOf("reducer") - 1];
      if (itemName && itemName !== ".") {
        reducers[itemName] = itemReducer;
      }
    } else {
      console.error(
        `./pages${path.slice(1)}:默认导出不是function，无法添加到reducer里`
      );
    }
  }
});

export const rootReducer = combineReducers({
  ...staticReducers,
  ...reducers
});

export type State = ReturnType<typeof rootReducer>;
export default rootReducer;
