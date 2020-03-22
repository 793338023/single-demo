## 公共组件包

编写各个工程之间的公共组件，当工程组件需要在别的工程被使用时可以抽取到这个包里，但 redux、styles 与请求都需要调整，因为在这里理想情况下存放的是 UI 组件，不应该包含 redux，而由于打包的问题无法使用 css 模块化，只能直接使用 css 名称，而请求需要存放到 common 包里，如果没有必要最好不要在组件里实现请求，保持一个无论在哪都能使用的 UI 组件。

## 组件目录

```
src
-- components
```

在 components 里编写组件，不支持 es6 导出 scss 模块化，既 scss 不能导出 styles 对象变量在 es6 导出里，因为打包就报错了，但我们可以使用 common.js 的导出标准，这个就可以在打包时绕过 es6 导出打包编译，但我们的项目要支持 scss 模块化导出，否则也是不能在项目中使用的。
如:

```
不支持
import styles from "styles.module.scss"

支持
import "styles.scss"

支持
const styles = require("styles.module.scss")

```

## redux

不支持在组件里使用 redux，会报找不到 store，而组件也没有必要在里面使用 redux,因为 redux 是为了传输数据使用的，组件可以在项目中使用后，让 redux 配合使用。

解决方案:
使用同一个 redux，react-redux，redux-saga 包，既在 common 里导出 redux，react-redux，redux-saga 的方法，然后其他工程在使用 redux 时在 common 包获取 redux 的 API，这是因为 Node_modules 包也有自己的 node_modules，而工程里使用的安装的包，而包的依赖不会先去工程下的 node_modules 里查找，而是先在自己底下寻找，所以会导致看似使用同一个依赖包，但其实不是，它们都是使用各自的依赖包，这样就导致 redux 里数据无法共用的问题，各自使用自己的 redux 依赖包，保存在 redux 里数据又怎么可能被另外一个 redux 包找到。
