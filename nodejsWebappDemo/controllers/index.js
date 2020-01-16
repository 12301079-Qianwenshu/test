var fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

var fn_signin = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        let data = {
            code:0,
            detail: {
                name: name,
                msg: '登录成功'
            }
        }
        ctx.response.body = data;
    } else {
        let data = {
            code:401,
            detail: {
                msg: '登录失败，请重新登录'
            }
        }
        ctx.response.body = data;
    }
};

var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin,
    'GET /hello/:name': fn_hello
};