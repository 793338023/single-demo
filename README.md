## 微前端

当前微前端技术栈统一，仓库只有一个。
适用场景:
项目大，工程多，而都是由一个技术团队负责。

由于不同场景要使用符合当前场景的架构，如 single-SPA，适用与不同团队，技术栈不一致的集成，但这样在统一性上与复用上可能就比较差，因为技术栈不一致，包之间很容易出现不兼容而无法共用。
但这个微前端技术栈就不存在这样的问题，因为技术栈一致，而且 components 与 common 是必须存在的，就是为了更好的复用性，减少不必要的开发。

packages 里的包可以互相之间调用，就像 npm 包一样，原理是使用 npm 本地安装包，本地安装包会生成软链，只要安装一次，以后包的变化都不需要重新安装。

## 工程的新建

由于没有实现 cli 拉取模板代码，所以每次新建直接拷贝上一个工程，然后 npm install，重新安装包。

## 初创

```
lerna init --independent
```

默认是 npm 而且每个子 package 都有自己的 node_modules。

若使用 yarn,可以使用 workspaces 模式，通过这样设置后，只有顶层有一个 node_modules，那么在统一每个子 package 都使用顶级的 node_modules，这样可以解决项目间包的版本一致等问题。

lerna 使用，可以自行查找，其实就是把一些指令放到顶级执行，通过 npm 也可以达到 lerna 效果，只是 lerna 比较有约束，而且简化了某些操作，使用它更减少不遵守约束的问题和便利。

### [commn](./packages/common/README.md)

### [components](./packages/components/README.md)

### [my-demo](./packages/my-demo/README.md)
