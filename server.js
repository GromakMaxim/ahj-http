const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
app.use(bodyParser());

router.get('/', (ctx, next) => {
    ctx.response.body = 'server response get';
    const query = ctx.request.querystring;
    console.log(query);
})

router.post('/', (ctx, next) => {
    ctx.response.body = 'server response post';
    const query = ctx.request.querystring;
    console.log(query);
});

app
    .use(router.routes())
    .use(router.allowedMethods());

http.createServer(app.callback()).listen(8888);
