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

## 新建工程

拷贝当前项目，需要修改 port，package.json 里 scripts 的 start 的 port,proxy 的 port,dbServer.js 文件的 port
而 scripts 的 start 的 port 和 proxy 的 port 不能一样

由于项目会本地启动两个端口提供开发代码，一个为项目服务器，一个是 mock 数据服务器，当前项目为 3010 与 3011

如果不同启动两个项目，那么就不出现端口占用的问题，当启动多个项目的本地服务器，那么就会出现占用，所以新建项目，如果可以那么就调整一个项目的使用端口。

当然，如果你是使用当前架构实现整个工程的微服务化，那么最后使用项目内部的子项目都打包出静态资源，然后在项目的最外层启动静态服务器，而开发的项目启动本地服务器，然后使用反向代理的形式把所有静态资源串联起来，那么就可以看到完整项目
而这方面有很多方案可以解决，只要看当前那个对你来说最好实现。

## homepage

html 里的静态资源在服务器上不是在根路径加载，那么就要配置 package.json 的 homepage，否则会获取不到 js 和 css 等资源
如:

```
// 网络上的环境地址
https://www.abcdemo.com/to/todolist/index.html

// homepage配置
homepage:"/to/todolist"

```

其实使用环境变量也是可以，而且也比较灵活，它们优先顺序是 PUBLIC_URL、homepage，当设置环境变量，那么 homepage 就无效。

## 自动部署打包策略

这个具体项目所在环境具体实现。

以下是 Jenkins 为例：
由于 Jenkins 在这方面很成熟，可以集成 jithub 或 gitlab、代码检查、打包等功能。

其实就是 npm 指令:

```
cd single-demo/pagekages
cd common
npm i
npm run build
cd ../components
npm i
npm run build
cd ../my-demo
npm i
npm run build
```

然后抽取打包出来的目录，如 dist 与 build,放到对应的目录里，这个目录结构可以规划。
如:

```
|——packages
│  ├─my-demo
│  ├─my-demo2
│  ├─my-demo3

如一个门户网站
|——packages
│  ├─登陆
│  ├─新闻
│  ├─视频

只要当前包的业务是独立的，耦合性没有那么强的，那么就可区分为一个包

```

当然我们也是单独打包，单独部署，包之间即可互相关联，但又互相解耦，在我们部署后想从一个域就获取到不同包的资源，可以是 nginx 反向代理
