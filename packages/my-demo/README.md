## 创建 create-react-app typescript

```
npx create-react-app my-demo --typescript
```

## isolatedModules

typescript 仅导入/导出类型会报错。
如

```
export { AxiosRespWithWebAPI as WEBAPI } from "common/dist/http";

Cannot re-export a type when the '--isolatedModules' flag is provided

```

解决:

```
import { AxiosRespWithWebAPI as WEBAPI } from "common/dist/http";
export type AxiosRespWithWebAPI<T> = WEBAPI<T>;
```

## sass-loader 报错

```
ValidationError: Invalid options object. Sass Loader has been initialised using an options object that does not match the API schema.

由于全局配置变量报的错，把data替换成prependData
...
{
loader: require.resolve("sass-loader"),
options: {
prependData:
    Object.keys(theme)
    .map(k => `$${k}:${theme[k]}`)
    .join(";") + ";"
}
}
...
```

## vscode 识别 webpack 中 alias 配置路径

使用 create-react-app 创建的项目 webpack 的 alias 无法被 vscode 识别。
解决:

```
首先webpack的alias为@
...
alias: {
  "@": paths.appSrc,
  ...
},
...

```

```
package.json文件要引入或找到jest的配置，在moduleNameMapper配置"^@/(.*)": "<rootDir>/src/$1"

jest配置如下:
"jest": {
    "roots": [
      "<rootDir>/src"
    ],
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts"
    ],
    "setupFiles": [
      "react-app-polyfill/jsdom"
    ],
    "setupFilesAfterEnv": [
      "<rootDir>/src/setupTests.ts"
    ],
    "testMatch": [
      "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    "testEnvironment": "jest-environment-jsdom-fourteen",
    "transform": {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
      "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
    ],
    "modulePaths": [],
    "moduleNameMapper": {
      "^@/(.*)": "<rootDir>/src/$1",
      "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    "moduleFileExtensions": [
      "web.js",
      "js",
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "json",
      "web.jsx",
      "jsx",
      "node"
    ],
    "watchPlugins": [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ]
  }

```

```
根目录中的tsconfig.json文件中配置path，baseUrl与paths

"baseUrl": ".",
"paths": {
    "@/*": ["src/*"]
}

以下为完整的tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}


```

这只是对 typescript 有效，如使用 js,不能从文件夹识别到文件夹里的 index.js
如 styles 里为 index.js:

```
import ABC form "common/styles/index"
```

## scss

使用 scss,命名格式:

```
名称+.module.scss

如
style.module.scss

```

否则不会生成 style.module.scss.d.ts

## redux 使用

在文件下创建 reducer 与 sagas 文件夹，里面必须有 index.ts，而它为输出文件，而根目录下的 reducer 与 sagas 文件会遍历获取到它们，塞入 redux 里。

## 请求的使用

普通请求:
参考 home 文件里的。
例子:

```
...
import { AxiosRespWithWebAPI } from "@/common/http";
import qryList, { Resp as QryListResp } from "@/common/services/qryList";
...

...
const qryListFn = async () => {
    const resp: AxiosRespWithWebAPI<QryListResp> = await qryList({});
    console.log(resp);
    const {
      data: { body }
    } = resp;
    setdata(body);
  };
...

```

参考 home-redux 文件里的 sagas。
redux 发送请求:

```
...
import qryList, { Resp as QryListResp } from "@/common/services/qryList";
import { AxiosRespWithWebAPI } from "@/common/http";
...

...
const req: AxiosRespWithWebAPI<QryListResp> = yield call(qryList, {
      ...action.payload
    });
...

```

每个 saga 文件对应一个 anction,所以命名以 anction 名称对应比较好。

## 目录结构

src 目录下结构:
common -- 公共方法、公共样式、所有请求
components -- 组件
pages -- 页面
--当前页面目录
----reducer
----sagas
router -- 路由
img -- 图片资源

根目录下只要关注 data 目录，这是存放 mock，mock 的名称与请求分割"/"的最后一个名称一致。
如:

```
system/v1/qryList

那么mock的js名称为qryList.js
```

## components 工程的 css 无法引用

情景:
当我们在当前项目引入 components 的组件时，components 的组件已经引入了 css 文件，但在引入当前项目就是不起效，只能再把样式文件在当前项目引入一遍。

解决方案:
这是由于我们在 webpack 中处理 css 的 loaders 里配置了 include 和 exclude，当不配置时默认都处理，无论是 node_modules 里的还是本项目的，还有配置时不是正则匹配的，使用绝对路径的，也会出现问题，如配置的当前 node_modules 的绝对路径，那么只有当前 node_modules 的包的 css 可以被处理，而包里的 node_modules 也是不会被处理的，所以出现样式无效的问题，比如在组件工程使用 antd 的组件，还引入了样式，那么不会起效，但不配置 include 和 exclude 就可以起效，所以不明确处理的规则，那么就不配置，处理全局 css 文件。

例子:

```
// components里引入antd组件与样式

import Input from "antd/es/input";
import "antd/es/input/style";
```

## scss 换成 less 模块化

由于 scss 使用必须要 node-sass，但 node-sass 安装时很容易无法安装，还有制作主题时，less 比 sass 更加便利，因为 less 可以直接在浏览器上运行。

1. 修改 package.json 里的 scripts

```
"ts:css": "tcm -s -c -p src/**/*.module.scss",
改为
"ts:css": "tcm -s -c -p src/**/*.module.less",

```

2. 在 webpack 配置加入 less 的 loaders,并把全局变量加入

```
{
  test: lessRegex,
  exclude: lessModuleRegex,
  use: getStyleLoaders().concat([
    {
      loader: require.resolve("less-loader"),
      options: {
        modifyVars: theme,
        javascriptEnabled: true
      }
    }
  ])
  // include: paths.appNodeModules
},
{
  test: lessModuleRegex,
  use: getStyleLoaders().concat([
    {
      loader: require.resolve("less-loader"),
      options: {
        modifyVars: theme,
        javascriptEnabled: true
      }
    }
  ])
  // include: paths.appNodeModules
},
```

这样我们就可以在项目里都使用 less 了。
