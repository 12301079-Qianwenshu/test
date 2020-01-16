// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 用来处理post请求中，解析request body
const bodyParser = require('koa-bodyparser');

// 导入controller middleware:
const controller = require('./controller');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add middleware:
app.use(bodyParser());
app.use(controller());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');