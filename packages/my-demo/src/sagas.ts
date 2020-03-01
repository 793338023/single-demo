import { all } from "redux-saga/effects";
const req = require.context("./pages", true, /index.ts$/);

let allSagas: any[] = [];
req.keys().forEach(path => {
  if (~path.indexOf("/sagas/index.ts")) {
    const itemSagas = req(path).default;
    if (Array.isArray(itemSagas)) {
      allSagas.push(...itemSagas);
    } else {
      console.error(
        `./pages${path.slice(1)}:默认导出不是数组，无法添加到sagas里`
      );
    }
  }
});

export default function* managaSagas() {
  yield all([...allSagas]);
}
