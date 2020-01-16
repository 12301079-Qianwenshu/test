# initial-fe-react

项目依赖于nodejs，请安装nodejs 8.0以上版本运行项目。

包管理器推荐使用 `yarn`

若使用`yarn`，则先执行`yarn install`安装依赖，然后执行`yarn dev`运行

若使用的包管理器为`npm`，则先执行`npm install`安装依赖，然后执行`npm run dev`运行项目

### 项目目录

- src （ 项目源码 ）
  - api （ 项目中接口地址配置 **注:项目中接口地址必须配置在此处，禁止在component中出现接口地址字符串常量** ）
  - components （ 公用组件 **项目中可共用的组件放在此处** ）
  - constants （ 全局常量定义 ）
  - containers （ 页面 ）
  - redux （ 使用redux时写在此处 ）
    + actions
    + reducers
  - routes （ 路由 ）
  - service （ **原则上所有的请求均放在service中，并向外暴漏function，再由component调用service所暴露的function完成请求，其中对请求数据的处理都在service中完成，component中不包含处理数据的逻辑** ）
  - static （ 静态文件 ）
  - util （ 工具类 ）
    + resource.js （ 对axios进行封装以及拦截器配置 ）
    + utils.js （ **函数库：项目中通用的函数放在此处，如：时间戳格式转换，深拷贝实现等等** ）
- node_modules （ 项目依赖文件夹 ）
- .babelrc （ babel转码相关配置 ）
- .gitignore （ git忽略配置 ）
- package.json （ 项目包及脚本 ）
- postcss.config.js （ postcss相关配置 ）
- webpack.base.conf.js （ webpack基础配置 ）
- webpack.dev.conf.js （ webpack开发环境配置 ）
- webpack.prod.conf.js （ webpack生产环境配置 ）

### alias

在`webpack.config.base.js`中，对常用项目目录进行了别名配置
```
  alias: {
      'resource': path.resolve("./src/util/resource.js"),
      'static': path.resolve("./src/static"),
      'utils': path.resolve("./src/util/utils.js"),
      'service': path.resolve("./src/service"),
      'components': path.resolve("./src/components"),
      'containers': path.resolve("./src/containers"),
      'constants': path.resolve("./src/constants"),
      'reduxs': path.resolve("./src/redux"),
      'api': path.resolve("./src/api/index.js")
    }
```
我们在项目中`import`上述文件或上述目录下的文件时可直接使用别名

如当前所在目录为`/src/containers/App/index.jsx`，在该文件中 `import` 网络请求类 `/src/util/resource.js` 时，未配置别名的写法为 `import resource from '../../util/resource'` 配置别名后的写法为 `import resource from 'resource'`
